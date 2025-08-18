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

const SpacecraftDetailsPage = () => {
    const data = useLoaderData() ?? {craft: Promise.resolve(null)};
    const navigation = useNavigation();
    const navigating = navigation.state === 'loading';

    // unified form state for both existing + new craft
    const [formData, setFormData] = useState({
        designation: '',
        capacity: '',
        description: '',
        pictureUrl: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e, craft) => {
        e.preventDefault();

        try {
            //will update here
        } catch (err) {
            throw new Error(err);
        };
    };

    return (
        <SectionComponent>

            {navigating && <div className="loading">loading...</div>}

            <Suspense fallback={<div className="loading">loading...</div>}>
                
                <Await
                    resolve={data.craft}
                    errorElement={<div className="error">Failed to load Spacecraft.</div>}
                >
                 
                    {(craft) => {
                        //hydrate
                        useEffect(() => {
                            if (craft) {
                                setFormData({
                                    designation: craft.name ?? '',
                                    capacity: craft.capacity != null ? String(craft.capacity) : '',
                                    description: craft.description ?? '',
                                    pictureUrl: craft.pictureUrl ?? '',
                                });
                            } else {
                                setFormData({ designation: '', capacity: '', description: '', pictureUrl: '' });
                            }
                        }, [craft]);

                        return (
                            <FormComponent onSubmit={(e) => handleSubmit(e, craft)}>
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
                                            id="designation"
                                            placeholder="Designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            autoFocus
                                        />
                                    </BlockComponent>

                                    <BlockComponent>
                                        <input
                                            type="text"
                                            id="capacity"
                                            placeholder="Capacity"
                                            value={formData.capacity}
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
                                        <ButtonComponent 
                                            type="build" 
                                            label="Update"
                                            // handleClick //will be finished later
                                        />
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
const spacecraftDetailsLoader = ({ params }) => {
    const id = params && params.id;

    const craftPromise = theAPI.getSpacecraftById({ id }).then((response) => {
        if (response.ok === false) {
            throw new Error('Could not retrieve the spacecraft.');
        }
        return response.data;
    });

    return { craft: craftPromise };
};

export default SpacecraftDetailsPage;
export { spacecraftDetailsLoader };
