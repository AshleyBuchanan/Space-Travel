import '../css/CardImageComponent.css';

const CardImageComponent = ({src, alt, large, isHovered, prevHovered, nextHovered}) => {
    return (
        <div 
        className={`card-image-component
            ${isHovered ? 'hovered': ''}
            ${prevHovered ? 'prev-hovered' : ''}
            ${nextHovered ? 'next-hovered' : ''}`}
        >
            {src ? (
                <img className={`card-image-component-img ${large ? 'large' : ''}`} src={src} alt={alt}/>
            ) : (
                <div className={`card-image-component-img ${large ? 'large' : ''}`}></div>
            )}
        </div>

    );
};

export default CardImageComponent;