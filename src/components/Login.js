import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import { AiOutlineGoogle } from "react-icons/ai";
import { auth, addDocument } from "../firebase/util";
import Error from "./Error";
import SignUp from "./SignUp";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Login({ history }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [error, setError] = useState("");
  const isSigned = useSelector((state) => state.auth.isSigned);
  const handleFormSubmit = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        addDocument(user);
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleLoginClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    auth
      .signInWithPopup(provider)
      .then((userCredential) => {
        const user = userCredential.user;
        addDocument(user);
        history.push("/");
      })
      .catch((error) => setError(error.message));
  };
  if (isSigned) {
    return <Redirect to="/" />;
  }
  return (
    <LoginForm>
      {(errors.email || errors.password) && (
        <Error error="Log in Error" errorMsg="Missing Fields" />
      )}
      {error && <Error error="Log in Error" errorMsg={error} />}
      <div className="login-container">
        <form
          autoComplete="off"
          className="sign-in"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <FormInput
            watch={watch}
            register={register}
            type="email"
            name="email"
            label="Email"
          />
          <FormInput
            watch={watch}
            register={register}
            type="password"
            name="password"
            label="Password"
          />
          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>
        <div className="or">
          <div className="br" />
          <div style={{ flex: "1" }}>OR</div>
          <div className="br" />
        </div>
        <button onClick={handleLoginClick} className="glogin">
          <AiOutlineGoogle style={{ marginRight: ".2rem" }} />
          Log in with Google
        </button>
        <p style={{ marginTop: "20px" }}>
          Don't have an account ?
          <button onClick={() => setSignUpPopup(true)} className="signup-btn">
            Sign up
          </button>
        </p>
      </div>
      {signUpPopup && (
        <SignUp setSignUpPopup={setSignUpPopup} history={history} />
      )}
    </LoginForm>
  );
}

export default Login;

const LoginForm = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  height: 100vh;

  .login-container {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: calc(10vw + 16rem);
  }

  .sign-in {
    display: flex;
    flex-direction: column;
  }

  .or {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    color: #5f5f5f;

    .br {
      background: #bababa;
      height: 1px;
      flex: 1;
    }
  }

  .login-btn,
  .glogin {
    font-size: 18px;
    background: rgb(67, 56, 202);
    color: #f1f1f1;
    flex: 1;
    padding: 0.5rem 0;
    border-radius: 4px;

    :hover {
      background: rgb(79, 70, 229);
    }
  }

  .glogin {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signup-btn {
    font-size: 16px;
    color: rgb(67, 56, 202);
    text-decoration: underline;
    padding-left: 5px;
  }
`;
