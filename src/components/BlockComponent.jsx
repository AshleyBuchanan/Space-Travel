import '../css/BlockComponent.css';

const BlockComponent = ({children, large}) => {
    return (
        <div className={`block-component ${large ? 'large' : ''}`}>
            {children}
        </div>
    );
};

export default BlockComponent;
