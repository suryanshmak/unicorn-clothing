import StripeCheckout from "react-stripe-checkout";
import icon from "../assets/icon.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StripeButton = ({ price }) => {
  const isSigned = useSelector((state) => state.auth.isSigned);

  const handleToken = (token) => {
    console.log(token);
    alert("Payment successful!");
  };
  if (!isSigned) {
    return <LoginLink to="/login">Sign up or Log in to order</LoginLink>;
  }
  return (
    <StripeCheckout
      label="Pay Now"
      name="Uniclothing"
      billingAddress
      shippingAddress
      image={icon}
      description={`Proceed to pay $${price}`}
      amount={price * 100}
      panelLabel="Pay Now"
      token={handleToken}
      stripeKey="pk_test_51JPqR3SEuFnfEaMSOLhcPJMvwyd9NcDVDXsAPzuStlx7I4vQMRS29r9GGEyJsmkkLgLXpgL0uSdO5TfSEczCgr3g001QHIDxAb"
    />
  );
};

export default StripeButton;

const LoginLink = styled(Link)`
  text-decoration: underline;
`;
