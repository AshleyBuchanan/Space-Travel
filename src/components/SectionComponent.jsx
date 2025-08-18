import '../css/SectionComponent.css';

const SectionComponent = ({children}) => {
    return (
        <section className="section-component">
            {children}
        </section>
    );
};

export default SectionComponent;