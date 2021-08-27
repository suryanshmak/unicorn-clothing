import styled from "styled-components";

export default function Spinner() {
  return (
    <SpinnerContainer>
      <div className="loader" />
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;

  .loader {
    border: 3px solid #f3f3f3;
    border-top-color: #4b4b4b;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
