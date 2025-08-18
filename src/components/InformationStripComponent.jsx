import '../css/InformationStripComponent.css';

const InformationStripComponent = ({children, adjustment}) => {
    return (
        <div className={`information-strip ${adjustment ? 'adjusted' : ''}`}>
            {children}
        </div>
    );
};

export default InformationStripComponent;