import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

// higer order component

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      // if done loading, return the component, otherwise it will return the spinner
      <WrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
