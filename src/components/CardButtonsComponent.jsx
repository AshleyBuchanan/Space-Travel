import '../css/CardButtonsComponent.css';

const CardButtonsComponent = ({children, padding, isHovered, forceRow, prevHovered, nextHovered}) => {
    return (
        <div className={`card-buttons-component 
            ${padding ? 'padded' : ''}
            ${isHovered ? 'hovered': ''}
            ${forceRow ? 'use-row' : ''}
            ${prevHovered ? 'prev-hovered' : ''}
            ${nextHovered ? 'next-hovered' : ''}`}
        >
            {children}
        </div>
    );
};

export default CardButtonsComponent;