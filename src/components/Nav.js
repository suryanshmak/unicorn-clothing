import { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase/util";
import { useSelector } from "react-redux";
import { selectItemQuantity } from "../selectors";
import { ReactComponent as ShoppingBag } from "../assets/shopping-bag.svg";
import { ReactComponent as User } from "../assets/user.svg";
import NavCartItem from "./NavCartItem";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const profileRef = useRef();
  const isSigned = useSelector((state) => state.auth.isSigned);
  const quantity = useSelector((state) => selectItemQuantity(state));
  let history = useHistory();
  useEffect(() => {
    const handleBodyClick = (e) => {
      if (profileRef.current && profileRef.current.contains(e.target)) {
        return;
      }
      setProfileDropdown(false);
    };
    document.addEventListener("click", handleBodyClick);
    return () => document.removeEventListener("click", handleBodyClick);
  }, []);

  const products = (
    <nav>
      <Link to="/shop/hats">Hats</Link>
      <Link to="/shop/watches">Watches</Link>
      <Link to="/shop/jackets">Jackets</Link>
      <Link to="/shop/sneakers">Sneakers</Link>
      <Link to="/shop/mens">Men</Link>
      <Link to="/shop/womens">Women</Link>
    </nav>
  );

  const handleClick = (prevState) => !prevState;
  const hideSideBar = () => setIsOpen(false);
  const handleCheckoutClick = () => history.push("/checkout");

  return (
    <NavBar>
      <div className={`menu-container ${isOpen ? "active" : ""}`}>
        <header>
          <button onClick={() => setIsOpen(handleClick)} className="burger">
            <span className="bar bar1" />
            <span className="bar bar2" />
            <span className="bar bar3" />
          </button>
          <Link to="/" onClick={hideSideBar} className="home">
            UNI
          </Link>
          <div className="products">{products}</div>
          <div className="profile-container">
            <button
              ref={profileRef}
              onClick={() => setProfileDropdown(handleClick)}
              className="profile"
            >
              <User />
            </button>
            <div className={`dropdown ${profileDropdown ? "active" : ""}`}>
              {!isSigned && <Link to="/login">Log In</Link>}
              {isSigned && (
                <button onClick={() => auth.signOut()}>Sign out</button>
              )}
              {isSigned && <Link to="/">Account Settings</Link>}
              <button>Dark Theme</button>
            </div>
          </div>
          <div className="cart-container">
            <button onClick={handleCheckoutClick} className="cart">
              <ShoppingBag />
            </button>
            <span className="cart-quantity">{quantity}</span>
            <div className="dropdown cart-dd">
              <NavCartItem />
              <button className="checkout" onClick={handleCheckoutClick}>
                Checkout
              </button>
            </div>
          </div>
        </header>
        <div className="side-bar">
          <div className="products-bar" onClick={hideSideBar}>
            {products}
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default Nav;

const NavBar = styled.div`
  position: relative;
  header {
    position: fixed;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.99);
    padding: 1rem 2rem;
    width: 100%;
    z-index: 20;

    .products {
      margin: auto;

      a {
        padding: 0 1rem;
        font-size: 18px;
        transition: all 0.3s ease;

        :hover {
          color: #5fca79;
        }
      }
    }
  }

  .cart-container,
  .profile-container {
    position: relative;
    margin: 0 5px;
  }

  .cart-container {
    :hover {
      .cart-dd {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .cart-quantity {
    position: absolute;
    top: -4px;
    right: -2px;
    width: 15px;
    background: black;
    text-align: center;
    color: white;
    font-size: 11px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    right: -5px;
    top: 30px;
    border-radius: 0.25rem;
    overflow: hidden;
    width: 220px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 4px rgba(0, 0, 0, 0.05);
    display: none;
    background: white;

    a,
    button {
      padding: 8px 14px;
      font-size: 15px;
      text-align: left;

      :hover {
        background: #e7e7e7;
      }
    }
  }

  .cart-dd {
    overflow: scroll;
    padding: 10px;
    width: 300px;

    .checkout {
      border: 1px solid black;
      text-align: center;
      transition: 0.4s ease all;

      :hover {
        background: black;
        color: white;
      }
    }
  }

  .dropdown.active {
    display: flex;
    flex-direction: column;
  }

  .side-bar,
  .burger {
    display: none;
  }

  @media (max-width: 1090px) {
    .home {
      margin: auto;
    }
    .products {
      display: none;
    }

    .side-bar {
      position: fixed;
      top: 0;
      right: 110%;
      height: 100vh;
      z-index: 10;
      width: 100%;
      padding: 4rem 0;
      background: white;
      display: block;

      nav {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin-left: 4rem;

        a {
          padding: 1rem 0;
          font-size: 1.3rem;
        }
      }
    }

    .burger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 1rem;
      z-index: 1;

      .bar {
        height: 1px;
        width: 1.4rem;
        background: #222222;
      }

      .bar1,
      .bar3 {
        transition: all 0.5s ease;
      }
    }

    .menu-container.active {
      .side-bar {
        right: 0;
      }

      .burger {
        justify-content: normal;
        margin-top: 0.7rem;

        .bar1 {
          transform: rotate(45deg) translate(0.1rem);
        }

        .bar2 {
          display: none;
        }

        .bar3 {
          transform: rotate(-45deg);
        }
      }
    }
  }

  @media (max-width: 425px) {
    .cart-container:hover {
      .cart-dd {
        display: none;
      }
    }
  }
`;
