import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //needs in cents
  const publishableKey =
    "pk_test_51JZtm5GoDFOXZGUz6LZtK1Q0TdcRXH3wbFWMbMl4Q74Vtfh7DiaE3Ly4h9CcRbzl2hcduOhMbsipBiEQcIKaKNbb00OqID1sm5";

  const onToken = (token) => {
    console.log(token);
    // we usually pass this to backend to charge but for now alerting success
    alert("Payment Succesful!");
  };

  // inside stipe checkout, there are countless properties you can set
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken} //onSuccess
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
