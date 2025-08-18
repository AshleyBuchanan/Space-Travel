import '../css/CardInformationComponent.css';

const CardInformationComponent = ({children}) => {
    return (
        <div className="card-information-component">
            {children}
        </div>
    );
};

export default CardInformationComponent;