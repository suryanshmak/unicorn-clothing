import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../selectors";
import { clearProduct, setQuantity } from "../actions";
import StripeButton from "../components/StripeButton";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => selectCartItems(state));
  const subtotal = useSelector((state) => selectCartTotal(state));
  const dispatch = useDispatch();
  if (!cartItems.length) {
    return (
      <CheckoutContainer>
        <span
          style={{ placeSelf: "center", background: "white", padding: "10px" }}
        >
          Your cart is empty.
        </span>
      </CheckoutContainer>
    );
  }
  return (
    <CheckoutContainer>
      <div className="cart-container">
        <div className="cart-item-container">
          {cartItems.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <div className="image-container">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className="about-item">
                <span style={{ fontSize: "19px" }}>{item.name}</span>
                <span style={{ padding: "5px 0" }}>${item.price}</span>
                <div>
                  <select
                    className="quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(setQuantity(item, e.target.value))
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
              <button
                className="remove"
                onClick={() => dispatch(clearProduct(item))}
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>
        <div className="subtotal-container">
          <div className="subtotal">
            <div className="cart-totals">
              <span>
                Subtotal: <p>${subtotal}</p>
              </span>
              <span>
                Shipping (Standard - Free): <p>$0</p>
              </span>
              <hr />
              <span>
                Order Total: <p>${subtotal}</p>
              </span>
            </div>
            <StripeButton price={subtotal} />
          </div>
        </div>
      </div>
    </CheckoutContainer>
  );
};

export default CheckoutPage;

const CheckoutContainer = styled.div`
  min-height: 100vh;
  background: #f4f4f4;
  display: grid;

  .cart-container {
    display: flex;
    margin: 100px auto;
    width: 80%;
  }

  .cart-item-container {
    display: flex;
    flex-direction: column;
    width: 55%;
    padding: 0 28px;
  }

  .cart-item {
    position: relative;
    padding: 15px;
    margin-bottom: 20px;
    background: white;
    display: flex;

    .image-container {
      height: 120px;
      width: 110px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .about-item {
      display: flex;
      flex-direction: column;
      padding: 0 15px;
    }

    .quantity {
      font-family: "Open Sans", sans-serif;
      outline: none;
      padding: 2px;
      border: 1px solid #d2d2d2;
    }

    .remove {
      position: absolute;
      width: 40px;
      height: 40px;
      align-self: center;
      right: 40px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #f4f4f4;
    }
  }
  .subtotal-container {
    width: 40%;
    padding: 0 28px;
  }
  .subtotal {
    background: white;
    width: 100%;
    padding: 20px;
    height: 200px;

    .cart-totals {
      display: flex;
      flex-direction: column;

      span,
      hr {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    .cart-container {
      display: block;
    }
    .cart-item-container {
      width: 100%;
    }
    .subtotal-container {
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    .cart-container {
      width: 94%;
    }
    .cart-item-container,
    .subtotal-container {
      padding: 0;
    }
  }
`;
