import {RiErrorWarningLine} from "react-icons/ri";
import styled from "styled-components";

const Error = ({error, errorMsg}) => (
    <ErrorDiv>
        <div className="warning">
            <RiErrorWarningLine fontSize="2rem" color="white"/>
        </div>
        <div style={{textAlign: 'left', marginLeft: '4.6rem'}}>
            <p className="error-msg" style={{fontFamily: 'sans-serif'}}>{error}</p>
            <p className="error-msg" style={{fontSize: '14px'}}>{errorMsg}</p>
        </div>
    </ErrorDiv>
);

export default Error;

const ErrorDiv = styled.div`
  position: fixed;
  top: 12vh;
  right: 1rem;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: calc(12vw + 16rem);
  padding: 5px 0;
  z-index: 1;
  background: #ffffff;

  .warning {
    position: absolute;
    background: rgb(251, 191, 36);
    padding: 0 1rem;
    height: 100%;
    display: grid;
    place-items: center;
  }
  .error-msg {
    padding: .5rem 0;
  }
`