import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { selectConvertedCarousel } from "../selectors";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import styled from "styled-components";

export default function Carousel() {
    const [currentImg, setCurrentImg] = useState(0);
    const carousel = useSelector((state) => selectConvertedCarousel(state));
    useEffect(() => {
        const intervalId = setInterval(nextSlide, 4000);
        return () => clearInterval(intervalId);
    }, []);

    const prevSlide = () => {
        setCurrentImg((prevState) => (prevState === 0 ? 2 : (prevState - 1) % 3));
    };
    const nextSlide = () => {
        setCurrentImg((prevState) => (prevState + 1) % 3);
    };
    if (!carousel) {
        return <Spinner />;
    }
    return (
        <Slider>
            <BsChevronCompactLeft onClick={prevSlide} size="3rem" className="prev" />
            <BsChevronCompactRight onClick={nextSlide} size="3rem" className="next" />
            {carousel.map((el, index) => (
                <React.Fragment key={index}>
                    {index === currentImg && (
                        <>
                            <div
                                className="carousel-img"
                                style={{ backgroundImage: `url(${el.imageUrl})` }}
                            >
                                <p>{el.name}</p>
                                <Link to={`/shop/${el.routeName}`} className="shop-now">
                                    SHOP NOW
                                </Link>
                            </div>
                        </>
                    )}
                </React.Fragment>
            ))}
        </Slider>
    );
}

const Slider = styled.section`
  position: relative;
  min-height: 80vh;
  width: 100%;

  .prev,
  .next {
    position: absolute;
    color: white;
    cursor: pointer;
    top: 50%;
    z-index: 1;
  }

  .next {
    right: 10px;
  }

  .prev {
    left: 10px;
  }

  .carousel-img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: grid;
    place-items: center;

    p {
      color: white;
      font-size: calc(1vw + 24px);
    }

    .shop-now {
      z-index: 1;
      padding: 0.7rem 1.2rem;
      color: #292929;
      background: white;
      border-radius: 28px;
      font-size: calc(0.7vw + 0.5rem);
      transition: background 0.2s ease;

      :hover {
        background: none;
        color: white;
        background: #292929;
      }
    }
  }
`;
