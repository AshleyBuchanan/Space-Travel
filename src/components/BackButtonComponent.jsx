import { useNavigate, useLocation } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

const BackButton = ({label}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1); 
    } else {
      navigate("/"); 
    }
  };

  return (
    <ButtonComponent 
        handleClick={handleBack}
        label={label}
    />
  );
};

export default BackButton;
