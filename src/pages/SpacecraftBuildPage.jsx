import theAPI from '../services/SpaceTravelApi';
import { useEffect, useState } from 'react';

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

const SpacecraftBuildPage = () => {
    const [unfinished, setUnfinished] = useState(false);
    const [formData, setFormData] = useState(
        {
            designation: '',
            capacity: '',
            description: '',
            pictureUrl: '',
        }
    );

    //i disliked that this page did not load
    //so i added a fake loading time for consistency.
    //i thought i might be able to preload everything, but
    //it would've added yet another layer of complexity 
    //for minimal reward.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);

        return () => clearTimeout(timer);
    }, [] );

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.designation && formData.capacity && formData.description && formData.pictureUrl)
            {
                try {
                    await theAPI.buildSpacecraft({
                        name : formData.designation, 
                        capacity: formData.capacity, 
                        description: formData.description, 
                        pictureUrl: formData.pictureUrl
                    });
                } catch (err) {
                    throw new Error(err)
                } finally {
                    setFormData({
                        designation: '',
                        description: '',
                        capacity: '',
                        pictureUrl: '',
                    });
                    setUnfinished(false);
                }
            } else {
                setUnfinished(true);
            }
    };

    return (
        <SectionComponent>

            {loading && <div className="loading">loading...</div>}

            {!loading &&
                <FormComponent onSubmit={handleSubmit}>
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
                                className={`${unfinished && formData.pictureUrl==='' ? 'unfinished' : ''}`}
                                onChange={handleChange} 
                            />  
                        </BlockComponent>

                        <BlockComponent>
                            <input 
                                type="text" 
                                id="designation"
                                placeholder="Designation" 
                                value={formData.designation} 
                                className={`${unfinished && formData.designation==='' ? 'unfinished' : ''}`}
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
                                className={`${unfinished && formData.capacity==='' ? 'unfinished' : ''}`}
                                onChange={handleChange} 
                            />
                        </BlockComponent>

                        <BlockComponent large={true}>
                            <textarea 
                                type="textarea"
                                id="description"
                                placeholder="Description"
                                value={formData.description}
                                className={`${unfinished && formData.description==='' ? 'unfinished' : ''}`}
                                onChange={handleChange} 
                            />
                        </BlockComponent>
                        
                        <CardButtonsComponent isHovered={true} forceRow={true}>
                            <BackButtonComponent
                                label="Back" 
                            />
                            <ButtonComponent 
                                type="build" 
                                label="Build"
                                handleClick={handleSubmit}
                            />
                        </CardButtonsComponent>

                    </ContainerComponent>
                </FormComponent>
            }
        </SectionComponent>
    );
};

export default SpacecraftBuildPage;
