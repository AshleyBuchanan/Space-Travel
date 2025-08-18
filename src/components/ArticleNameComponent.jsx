import '../css/ArticleNameComponent.css';

const ArticleNameComponent = ({children, isEntered}) => {
    return (
        <div className={`article-name-component ${isEntered ? 'hover' : ''}`}>
            {children}
        </div>
    );
};

export default ArticleNameComponent;