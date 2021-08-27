import styled from "styled-components";

const Services = ({ Icon, children }) => (
  <Service>
    <div className="content">
      <i>
        <Icon />
      </i>
      <p>{children}</p>
    </div>
  </Service>
);

export default Services;

const Service = styled.div`
  width: 200px;
  padding: 30px 0;

  .content {
    text-align: center;

    i {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
      padding: 6px 0;
    }
  }
`;
