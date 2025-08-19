import theAPI from '../services/SpaceTravelApi';
import { Suspense, useState } from 'react';
import { useLoaderData, useNavigation, Link, Await, useRevalidator } from "react-router-dom";

//css
import '../css/SpecialIndicators.css';
import '../css/Pages.css';

//components
import SectionComponent from '../components/SectionComponent';
import ContainerComponent from '../components/ContainerComponent';
import ArticleComponent from '../components/ArticleComponent';
import ArticleNameComponent from '../components/ArticleNameComponent';
import CardComponent from '../components/CardComponent';
import CardImageComponent from '../components/CardImageComponent';
import CardInformationComponent from '../components/CardInformationComponent';
import CardButtonsComponent from '../components/CardButtonsComponent';
import InformationStripComponent from '../components/InformationStripComponent';
import BackButtonComponent from '../components/BackButtonComponent';

const SpacecraftInventoryPage = () => {
    const data = useLoaderData();
    const navigation = useNavigation();
    const revalidator = useRevalidator();
    const navigating = navigation.state === 'loading';
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [destroyedId, setDestroyedId] = useState(null);

    const handleDestroy = async (id) => {
        setDestroyedId(id);
        try {
            await theAPI.destroySpacecraftById({ id });
            // Ask React Router to refetch the loader so the list stays fresh
            revalidator.revalidate();
        } catch (err) {
            // In a real app you might show a toast or set error state
            console.error('Failed to destroy spacecraft', err);
        }
    };

    return (
        <SectionComponent>

            {/* shows during route transitions from other pages. */}
            {navigating && <div className="loading">loading...</div>}

            {/* renders immediately, then shows fallback until crafts is resolved. */}
            <Suspense fallback={<div className="loading">loading...</div>}>
                
                <ContainerComponent isHovered={true}>
                    <CardButtonsComponent isHovered={true} forceRow={true}>
                        <BackButtonComponent 
                            label="Back" 
                        />
                        <Link 
                            to="/spacecraft/build"    
                            className="sub-button build" 
                        >Build
                        </Link>
                    </CardButtonsComponent>
                </ContainerComponent>               

                <Await
                    resolve={data.crafts}
                    errorElement={<div className="error">Failed to load Spacecraft.</div>}
                >
                    {(crafts) => (
                        <>
                            {Array.isArray(crafts) && crafts.map((craft, index) => (
                                    
                                <ArticleComponent 
                                    key={craft.id || index}
                                    index={index}
                                    isHovered={hoveredIndex === index}
                                    prevHovered={hoveredIndex === index - 1}
                                    nextHovered={hoveredIndex === index + 1}
                                    onHoverEnter={() => setHoveredIndex(index)}
                                    //onHoverLeave={() => setHoveredIndex(null)}
                                >

                                    <ArticleNameComponent>
                                        <span className="article-label-component">Designation : </span>{craft.name}
                                        <span className="indicator-destroying">{`${destroyedId === craft.id ? '  Destroying' : ''}`}</span>
                                    </ArticleNameComponent>
                                        
                                    <CardComponent 
                                        padding={true}
                                        index={index}
                                        isHovered={hoveredIndex === index}
                                        prevHovered={hoveredIndex === index - 1}
                                        nextHovered={hoveredIndex === index + 1}
                                    >

                                        <CardImageComponent
                                            src={craft.pictureUrl}
                                            alt={craft.name}
                                            index={index}
                                            isHovered={hoveredIndex === index}
                                            prevHovered={hoveredIndex === index - 1}
                                            nextHovered={hoveredIndex === index + 1}
                                        />

                                        <CardInformationComponent>
                                            <InformationStripComponent adjustment={true}>
                                                <div>
                                                    <span className="article-label-component">Capacity : </span>{Number(craft.capacity || 0).toLocaleString()}
                                                </div>
                                                <div>
                                                    {(craft.description || '').slice(0, 42) + '...'}
                                                </div>
                                            </InformationStripComponent>
                                        </CardInformationComponent>
                                            
                                        <CardButtonsComponent
                                            index={index}
                                            isHovered={hoveredIndex === index}
                                            prevHovered={hoveredIndex === index - 1}
                                            nextHovered={hoveredIndex === index + 1}
                                        >
                                            <Link 
                                                className="sub-button"
                                                to={`details/${craft.id}`} 
                                            >Details
                                            </Link>
                                            <div 
                                                className="sub-button destroy"
                                                onClick={() => handleDestroy(craft.id)}
                                            >Destroy</div>
                                        </CardButtonsComponent>
                                    </CardComponent>
                                </ArticleComponent>
                            ))}
                        </>
                    )}
                </Await>
            </Suspense>
        </SectionComponent>
    );
};

// loader
const spacecraftLoader = () => {
    //this allows the component to render before the data is retrieved.
    const craftsPromise = theAPI.getSpacecrafts().then((response) => {
        if (response.ok === false) {
            throw new Error('Could not retrieve the spacecraft.');
        }
        return response.data;
    });
    //the loader will return an object with promises.
    return { crafts: craftsPromise };
};

export default SpacecraftInventoryPage;
export {spacecraftLoader};