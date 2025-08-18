const ButtonComponent = ({type, label, handleClick}) => {
    return (
        <div
            className={`sub-button ${type}`}
            onClick={handleClick}>{label}
        </div>
    )
}

export default ButtonComponent;
