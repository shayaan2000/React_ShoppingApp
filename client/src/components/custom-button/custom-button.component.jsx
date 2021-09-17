import "./custom-button.styles.scss";

//Before styled components for reference
import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`custom-button ${isGoogleSignIn ? "google-sign-in" : ""} ${
      inverted ? "inverted" : ""
    }`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;

//styled component
// import { CustomButtonContainer } from "./cutom-button.styles";

// const CustomButton = ({ children, ...props }) => (
//   <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
// );

// export default CustomButton;
