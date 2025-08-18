import '../css/ContainerComponent.css';

const DetailsContainerComponent = ({children}) => {
    return (
        <div className="details-container">
            {children}
        </div>
    );
};

export default DetailsContainerComponent;
