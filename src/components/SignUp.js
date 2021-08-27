import ReactDOM from "react-dom";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import Error from "./Error";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { auth, addDocument } from "../firebase/util";

const SignUp = ({ setSignUpPopup, history }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const popupRef = useRef();

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (popupRef.current && popupRef.current.contains(e.target)) {
        return;
      }
      setSignUpPopup(false);
    };
    document.body.addEventListener("click", handleBodyClick);
    return () => document.body.removeEventListener("click", handleBodyClick);
  }, []);

  const handleFormSubmit = ({ signUpEmail, signUpPassword, fullName }) => {
    auth
      .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({ displayName: fullName }).then(() => {
          addDocument(user);
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return ReactDOM.createPortal(
    <Container>
      {(errors.signUpEmail || errors.signUpPassword) && (
        <Error error="Sign up Error" errorMsg="Missing fields" />
      )}
      {error && <Error error="Sign up Error" errorMsg={error} />}
      <div className="popup" ref={popupRef}>
        <p style={{ fontSize: "1.5rem", textAlign: "left" }}>Sign Up</p>
        <p style={{ paddingBottom: "10px", textAlign: "left" }}>
          It's quick and easy.
        </p>
        <button onClick={() => setSignUpPopup(false)} className="close">
          <AiOutlineClose />
        </button>
        <hr style={{ marginBottom: "20px" }} />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormInput
            register={register}
            watch={watch}
            label="Full name"
            name="fullName"
            type="text"
          />
          <FormInput
            register={register}
            watch={watch}
            label="Email"
            name="signUpEmail"
            type="email"
          />
          <FormInput
            register={register}
            watch={watch}
            label="Password"
            name="signUpPassword"
            type="password"
          />
          <button className="signup" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </Container>,
    document.querySelector("#sign-up")
  );
};

export default SignUp;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
  .popup {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border-radius: 5px;
    position: relative;
    display: flex;
    text-align: center;
    background: white;
    flex-direction: column;
    width: calc(10vw + 16rem);
    .close {
      position: absolute;
      top: 15px;
      right: 1rem;
      font-size: 1.4rem;
    }
    .signup {
      font-size: 16px;
      background: rgb(67, 56, 202);
      color: #f1f1f1;
      padding: 0.5rem 1rem;
      border-radius: 4px;

      :hover {
        background: rgb(79, 70, 229);
      }
    }
  }
`;
