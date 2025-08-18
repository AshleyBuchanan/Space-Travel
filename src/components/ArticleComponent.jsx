import '../css/ArticleComponent.css';

const ArticleComponent = ({children, isHovered, prevHovered, nextHovered, onHoverEnter, onHoverLeave}) => {
    return (
        <article 
            className={`article
                ${isHovered ? 'hovered': ''}
                ${prevHovered ? 'prev-hovered' : ''}
                ${nextHovered ? 'next-hovered' : ''}`}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
        >
            {children}
        </article>
    );
};

export default ArticleComponent;