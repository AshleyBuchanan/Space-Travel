import '../css/CardComponent.css';

const CardComponent = ({children, onDragOver, onDrop, padding, isHovered, prevHovered, nextHovered}) => {
    return (
        <div 
            className={`card-component 
                ${padding ? 'padded' : ''} 
                ${isHovered ? 'hovered': ''}
                ${prevHovered ? 'prev-hovered' : ''}
                ${nextHovered ? 'next-hovered' : ''}`}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {children}
        </div>
    );
};

export default CardComponent;