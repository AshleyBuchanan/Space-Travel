import theAPI from '../services/SpaceTravelApi';
import { Suspense, useEffect, useState } from 'react';
import { useLoaderData, useNavigation, Await } from "react-router-dom";

//css
import '../css/SpecialIndicators.css';  //.loading
import '../css/Pages.css';

//components
import SectionComponent from '../components/SectionComponent';
import FormComponent from '../components/FormComponent';
import ContainerComponent from '../components/ContainerComponent';
import BlockComponent from '../components/BlockComponent';
import CardButtonsComponent from '../components/CardButtonsComponent';
import BackButtonComponent from '../components/BackButtonComponent';
import ButtonComponent from '../components/ButtonComponent';

const PlanetDetailsPage = () => {
    const data = useLoaderData() ?? {planets: Promise.resolve(null)};
    const navigation = useNavigation();
    const navigating = navigation.state === 'loading';

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        currentPopulation: '',
        pictureUrl: '',
    });

    const handleChange = (e) => {
        console.log(e.target.id)
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    //this will be an external implementation later on.
    // const handleSubmit = async (e, planet) => {
    //     e.preventDefault();
    // 
    //     try {
    //         console.log(formData.id);
    //         //api delete
    //         await theAPI.destroySpacecraftById({ id: formData.id });
    //         await theAPI.buildSpacecraft({
    //             name : formData.designation, 
    //             currentPopulation: formData.currentPopulation, 
    //             description: formData.description, 
    //             pictureUrl: formData.pictureUrl
    //         });        
    //     } catch (err) {
    //         throw new Error(err);
    //     };
    // };

    return (
        <SectionComponent>
            {navigating && <div className="loading">loading...</div>}

            <Suspense fallback={<div className="loading">loading...</div>}>
                <Await
                    resolve={data.planet}
                    errorElement={<div className="error">Failed to load Planet.</div>}
                >
                 
                    {(planet) => {
                        //hydrate
                        useEffect(() => {
                            if (planet) {
                                setFormData({
                                    id: planet.id ?? '',
                                    name: planet.name ?? '',
                                    currentPopulation: planet.currentPopulation != null ? String(planet.currentPopulation) : '',
                                    pictureUrl: planet.pictureUrl ?? '',
                                });
                            } else {
                                setFormData({ id: '', designation: '', population: '', pictureUrl: '' });
                            }
                        }, [planet]);

                        return (
                            <FormComponent onSubmit={(e) => handleSubmit(e, planet)}>
                                <ContainerComponent>

                                    <BlockComponent>
                                        {formData.pictureUrl ? (
                                            <img
                                                className="block-component-image"
                                                src={`${formData.pictureUrl}`}
                                                alt=""
                                            />
                                        ) : (
                                            <div className="block-component-image"></div>
                                        )}
                                    </BlockComponent>

                                    <BlockComponent>
                                        <input
                                            type="text"
                                            id="pictureUrl"
                                            placeholder="Picture URL"
                                            value={formData.pictureUrl}
                                            onChange={handleChange}
                                        />
                                    </BlockComponent>

                                    <BlockComponent>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Designation"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoFocus
                                            
                                        />
                                    </BlockComponent>

                                    <BlockComponent>
                                        <input
                                            type="text"
                                            id="currentPopulation"
                                            placeholder="Population"
                                            value={formData.currentPopulation}
                                            onChange={handleChange}
                                        />
                                    </BlockComponent>

                                    <BlockComponent large={true}>
                                        <textarea
                                            id="description"
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </BlockComponent>

                                    <CardButtonsComponent isHovered={true} forceRow={true}>
                                        <BackButtonComponent 
                                            label="Back" 
                                        />
                                        {/* this will be an external implementation later on*/}
                                        {/* <ButtonComponent 
                                            type="build" 
                                            label="Update"
                                            handleClick={handleSubmit}
                                        /> */}
                                    </CardButtonsComponent>

                                </ContainerComponent>
                            </FormComponent>
                        );
                    }}
                </Await>
            </Suspense>
        </SectionComponent>
    );
};

// loader
const planetDetailsLoader = async ({ params }) => {
    const id = Number(params?.id);

    const planetsPromise = theAPI.getPlanets().then((response) => {
        if (response.ok === false) {
            throw new Error('Could not retrieve the planet.');
        }
        
        const result = (response.data ?? []).find(p => p.id === id) ?? null;
        return result;
    });

    return { planet: planetsPromise };
}


export default PlanetDetailsPage;
export { planetDetailsLoader };
