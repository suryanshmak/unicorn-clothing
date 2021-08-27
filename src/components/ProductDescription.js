import styled from "styled-components";
import { RiStarSFill, RiStarLine } from "react-icons/ri";
import { addProduct } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFetching, selectProductFromCollections } from "../selectors";
import Spinner from "./Spinner";

const ProductDescription = ({
  category,
  match: {
    params: { id },
  },
}) => {
  const product = useSelector((state) =>
    selectProductFromCollections(category, id)(state)
  );
  const isFetching = useSelector((state) => !selectIsFetching(state));
  const dispatch = useDispatch();
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <Container>
      <img src={product.imageUrl} alt={product.name} />
      <div className="description">
        <p className="p-name">{product.name}</p>
        <RiStarSFill fontSize="18px" color="#F5A331" />
        <RiStarSFill fontSize="18px" color="#F5A331" />
        <RiStarSFill fontSize="18px" color="#F5A331" />
        <RiStarSFill fontSize="18px" color="#F5A331" />
        <RiStarLine fontSize="16px" color="#F5A331" />
        <p className="price">Price: ${product.price}</p>
        <button
          className="add-to-cart"
          onClick={() => dispatch(addProduct(product))}
        >
          Add to Cart
        </button>
        <div className="product-description">
          <span className="about">Description</span>
          <ul style={{ listStyleType: "circle" }}>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Adipisci, laudantium.
            </li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default ProductDescription;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 100px 20px 0 20px;

  img {
    height: calc(30vw + 50px);
    width: calc(25vw + 40px);
    object-fit: cover;
  }

  .p-name {
    font-size: 26px;
    font-weight: 500;
  }

  .add-to-cart {
    margin: 20px 0;
    background-color: #292929;
    border: 1px solid #545454;
    color: white;
    font-size: 16px;
    border-radius: 25px;
    padding: 10px 30px;
    transition: all 0.2s ease;
    :hover {
      background: white;
      color: black;
    }
  }

  .about {
    font-weight: 500;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    display: block;
    img {
      width: 100%;
      height: 80vh;
    }
    .product-description {
      text-align: left;
    }

    .price {
      text-align: right;
    }

    .add-to-cart {
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    @media (max-width: 1024px) {
      .description {
        margin-left: 30px;
      }
    }
  }
`;
