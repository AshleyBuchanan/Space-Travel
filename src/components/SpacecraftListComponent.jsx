import '../css/SpacecraftListComponent.css';

const SpacecraftListComponent = ({children, isHovered, prevHovered, nextHovered}) => {
    return (
        <div 
            className={`spacecraft-list-component
                ${isHovered ? 'hovered': ''}
                ${prevHovered ? 'prev-hovered' : ''}
                ${nextHovered ? 'next-hovered' : ''}`}
            >
            {children}
        </div>
    );
};

export default SpacecraftListComponent;