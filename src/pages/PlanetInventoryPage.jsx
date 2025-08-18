import theAPI from '../services/SpaceTravelApi';
import { Suspense, useState } from 'react';
import { useLoaderData, useNavigation, Link, Await , useRevalidator} from "react-router-dom";

//css
import '../css/Pages.css';
import '../css/SpecialIndicators.css';  //.loading .indicator-destroying

//components
import SectionComponent from '../components/SectionComponent';
import ArticleComponent from '../components/ArticleComponent';
import ArticleNameComponent from '../components/ArticleNameComponent';
import CardComponent from '../components/CardComponent';
import CardImageComponent from '../components/CardImageComponent';
import CardInformationComponent from '../components/CardInformationComponent';
import SpacecraftListComponent from '../components/SpacecraftListComponent';
import SpacecraftIconComponent from '../components/SpacecraftIconComponent';
import InformationStripComponent from '../components/InformationStripComponent';
import CardButtonsComponent from '../components/CardButtonsComponent';
import ContainerComponent from '../components/ContainerComponent';
import BackButtonComponent from '../components/BackButtonComponent';

let didDrag = false;

const PlanetInventoryPage = () => {
    const data = useLoaderData();
    const navigation = useNavigation();
    const navigating = navigation.state === 'loading';
    const [hoveredShip, setHoveredShip] = useState([]);
    const revalidator = useRevalidator();
    const [hoveredIndex, setHoveredIndex] = useState(2);
    const [sourceTransfer, setSourceTransfer] = useState(null);
    const [destinationTransfer, setDestinationTransfer] = useState(null);

    const handleDragStart = (e, id, index) => {
        didDrag = true;
        e.dataTransfer.setData('text/plain', String(id));
        e.dataTransfer.effectAllowed = 'move';
        setSourceTransfer(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnd = () => {
        didDrag = false;
    };

    const handleDrop = async (e, targetPlanetId, index) => {
        e.preventDefault();
        setDestinationTransfer(index);
        const shipId = e.dataTransfer.getData('text/plain');

        if (!shipId) return;

        try {
            await theAPI.sendSpacecraftToPlanet({ spacecraftId: shipId, targetPlanetId: Number(targetPlanetId) });
            revalidator.revalidate();
        } catch (err) {
            console.error('Failed to move ship:', err);
        } finally {
            didDrag = false;
            setSourceTransfer(null);
            setDestinationTransfer(null);
            setHoveredIndex(index);
        }
    };

    const handleClick = e => {
        if(didDrag){
            e.preventDefault();
            didDrag = false;
        };
    };

    return (
        <SectionComponent>
            {navigating && <div className="loading">loading...</div>}

            <Suspense fallback={<div className="loading">loading...</div>}>
           
            <div className="note">Drag and drop a spacecraft to the destination of your choice.</div>
                <ContainerComponent isHovered={true}>
                    <CardButtonsComponent isHovered={true} forceRow={true}>
                        <BackButtonComponent 
                            label="Back" 
                        />
                    </CardButtonsComponent>
                </ContainerComponent>               

                {/* first resolve planets. */}
                <Await resolve={data.planets} errorElement={<div className="error">Failed to load Planets.</div>}>
                    {(planets) => (

                        //then resolve crafts.
                        <Await resolve={data.crafts} errorElement={<div className="error">Failed to load Spacecraft.</div>}>
                            {(crafts) => (
                                <>
                                    {Array.isArray(planets) && planets.map((planet, index) => {
                                        const shipsHere = (crafts || []).filter(c => Number(c.currentLocation) === Number(planet.id)); 

                                        return (
                                            <ArticleComponent 
                                                key={`planet-${planet?.id ?? index}`}
                                                index={index}
                                                isHovered={hoveredIndex === index}
                                                prevHovered={hoveredIndex === index - 1}
                                                nextHovered={hoveredIndex === index + 1}
                                                onHoverEnter={() => setHoveredIndex(index)}
                                                //onHoverLeave={() => setHoveredIndex(null)}
                                            >
                                                
                                                <ArticleNameComponent>
                                                    <span className="article-label-component">Designation : </span>{planet.name}
                                                    <span className="indicator-transporting">
                                                        {`${sourceTransfer === index || destinationTransfer === index ? '  Transport in Process' : ''}`}</span>
                                                </ArticleNameComponent>

                                                <CardComponent 
                                                    onDragOver={handleDragOver}
                                                    onDrop={e => handleDrop(e, planet.id, index)}
                                                    index={index}
                                                    isHovered={hoveredIndex === index}
                                                    prevHovered={hoveredIndex === index - 1}
                                                    nextHovered={hoveredIndex === index + 1}
                                                >
                                                    <CardImageComponent
                                                        src={planet.pictureUrl}
                                                        alt={planet.name}
                                                        large={true}
                                                        index={index}
                                                        isHovered={hoveredIndex === index}
                                                        prevHovered={hoveredIndex === index - 1}
                                                        nextHovered={hoveredIndex === index + 1}
                                                    />
                                                    
                                                    <CardInformationComponent>

                                                        <SpacecraftListComponent
                                                            index={index}
                                                            isHovered={hoveredIndex === index}
                                                            prevHovered={hoveredIndex === index - 1}
                                                            nextHovered={hoveredIndex === index + 1}
                                                        >
                                                            {shipsHere.map(ship => (
                                                                <SpacecraftIconComponent 
                                                                    key={ship.id} 
                                                                    // draggable
                                                                    onDragStart={(e) => handleDragStart(e, ship.id, index)}
                                                                    onDragEnd={(e) => handleDragEnd(e, ship.id)}
                                                                    onMouseLeave={()=>setHoveredShip([])} 
                                                                    onMouseEnter={()=>setHoveredShip([ship.name, planet.id])}
                                                                    onClick={handleClick}
                                                                    url={ship.pictureUrl}
                                                                    alt={ship.name}
                                                                    id={ship.id}
                                                                />                                                                
                                                            ))}
                                                        </SpacecraftListComponent>

                                                        <InformationStripComponent>
                                                            <div>
                                                                <span className="article-label-component">Population : </span>{Number(planet.currentPopulation || 0).toLocaleString()}
                                                            </div>
                                                            <div>
                                                                {hoveredShip[1]===planet.id ? (<span className="spacecraft-hovered-name">{hoveredShip[0]}</span>) : ('')}
                                                            </div>
                                                        </InformationStripComponent>
                                                    </CardInformationComponent>

                                                    <CardButtonsComponent 
                                                        padding={true}
                                                        index={index}
                                                        isHovered={hoveredIndex === index}
                                                        prevHovered={hoveredIndex === index - 1}
                                                        nextHovered={hoveredIndex === index + 1}
                                                    >
                                                        <Link 
                                                            className="sub-button"
                                                            to={`details/${planet.id}`} 
                                                        >Details
                                                        </Link>
                                                        <div className="sub-button hidden"></div>
                                                    </CardButtonsComponent>
                                                </CardComponent>
                                            </ArticleComponent>
                                        );
                                    })}
                                </>
                            )}
                        </Await>
                    )}
                </Await>
            </Suspense>
        </SectionComponent>
    );
};

// loaders
const planetsLoader = () => {
    //this loader method allows the component to render 
    //before the data is retrieved. this took me forever.
    //freaking integers vs strings.

    const planetsPromise = theAPI.getPlanets().then((response) => {
        if (response.ok === false) {
            throw new Error('Could not retrieve the planets.');
        }

        const planets = Array.isArray(response.data) ? response.data.map(p => ({
            ...p,
            id: Number(p.id),
            currentPopulation: Number(p.currentPopulation || 0)
        })) : [];

        return planets;
    });

    const craftsPromise = theAPI.getSpacecrafts().then((response) => {
        if (response.ok === false) {
            throw new Error('Could not retrieve the spacecraft.');
        }

        const crafts = Array.isArray(response.data) ? response.data.map(c => ({
            ...c,
            id: c.id,
            currentLocation: Number(c.currentLocation)
        })) : [];

        return crafts;
    });

    //the loader will return an object with promises.
    return { planets: planetsPromise, crafts: craftsPromise };
};

export default PlanetInventoryPage;
export {planetsLoader};