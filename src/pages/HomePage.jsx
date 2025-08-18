import posts from '../assets/posts.json';
import { useState, useEffect } from 'react';

//css
import '../css/SpecialIndicators.css';  //.loading
import '../css/Pages.css';

//components
import SectionComponent from '../components/SectionComponent';
import ContainerComponent from '../components/ContainerComponent';
import ArticleComponent from '../components/ArticleComponent';
import ArticleNameComponent from '../components/ArticleNameComponent';
import CardComponent from '../components/CardComponent';
import CardButtonsComponent from '../components/CardButtonsComponent';
import BackButtonComponent from '../components/BackButtonComponent';

const HomePage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(0);

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

    return (
        <>
            <SectionComponent>

                {loading && <div className="loading">loading...</div>}

                {!loading && 
                    <ContainerComponent>
                        <CardButtonsComponent isHovered={true} forceRow={true}>
                            <BackButtonComponent 
                                label="Back" 
                            />
                        </CardButtonsComponent>
                    </ContainerComponent>
                }
                {!loading && posts.stories.map((story, index) => (
                    <ArticleComponent 
                        key={index}
                        index={index}
                        isHovered={hoveredIndex === index}
                        prevHovered={hoveredIndex === index - 1}
                        nextHovered={hoveredIndex === index + 1}
                        onHoverEnter={() => setHoveredIndex(index)}
                        //onHoverLeave={() => setHoveredIndex(null)}
                        >
                            <ArticleNameComponent>{story.headline}</ArticleNameComponent>

                            <CardComponent 
                                padding={true}
                                index={index}
                                isHovered={hoveredIndex === index}
                                prevHovered={hoveredIndex === index - 1}
                                nextHovered={hoveredIndex === index + 1}
                            >
                                {story.details}
                            </CardComponent>

                    </ArticleComponent>
                ))}
                {/* <FormComponent> */}

                {/* </FormComponent> */}
            </SectionComponent>
        </>
    );
};

export default HomePage;