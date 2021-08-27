import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCartItems } from "../selectors";

const NavCartItem = () => {
  const cartItems = useSelector((state) => selectCartItems(state));
  return (
    <CartItemContainer>
      {cartItems.length ? (
        cartItems.map((item, idx) => (
          <div key={idx} className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="item-desc">
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <span>Your cart is empty.</span>
      )}
    </CartItemContainer>
  );
};

export default NavCartItem;

const CartItemContainer = styled.div`
  overflow: scroll;
  height: 300px;
  margin-bottom: 10px;

  .cart-item {
    display: flex;
    margin-bottom: 10px;

    img {
      height: 130px;
      width: 110px;
      object-fit: cover;
    }

    .item-desc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 20px;
    }
  }
`;
