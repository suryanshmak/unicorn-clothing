import Services from "../components/Services";
import Carousel from "../components/Carousel";
import { FiTruck } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineSync } from "react-icons/ai";
import { ImHeadphones } from "react-icons/im";
import styled from "styled-components";
import Recommended from "../components/Recommended";

const HomePage = () => (
  <Home>
    <Carousel />
    <h1 style={{ fontSize: "calc(1vw + 20px)", padding: "2rem 2rem 0 2rem" }}>
      Recommended
    </h1>
    <Recommended />
    <div className="services">
      <Services Icon={MdLockOutline}>SECURE PAYMENTS</Services>
      <Services Icon={FiTruck}>FAST DELIVERY</Services>
      <Services Icon={AiOutlineSync}>EASY RETURNS</Services>
      <Services Icon={ImHeadphones}>CUSTOMER SERVICE</Services>
    </div>
  </Home>
);

export default HomePage;

const Home = styled.div`
  .services {
    display: flex;
    min-height: 10vh;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
`;
