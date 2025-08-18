import { Link } from "react-router-dom";
import '../css/SpacecraftIconComponent.css';

const SpacecraftIconComponent = ({onDragStart, onDragEnd, onMouseLeave, onMouseEnter, onClick, url, alt, id}) => {
    
    return (
        <div 
            className="spacecraft-icon-component"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onMouseLeave={onMouseLeave} 
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            url={url}
            alt={alt}
            id={id}
        >
            <Link to={`/spacecraft/details/${id}`}>
                <img className="spacecraft-icon-img-component" src={url} alt={alt}/>
            </Link>
        </div>
    );
};

export default SpacecraftIconComponent;