import { RiCloseFill } from "react-icons/ri";

import { useBasketContext } from "../../contexts/BasketProvider";
import Backdrop from "../Backdrop";
import BasketItem from "../BasketItem";
import calculateSubtotal from "../../utils/calculateSubtotal";

import "./BasketPopdown.css";

const BasketPopdown = () => {
  const { showCart, setShowCart } = useBasketContext();

  const handleBasketVisibility = () => {
    return setShowCart(false);
  };

  const displayCart = () => {
    if (showCart) {
      console.log(showCart);
      return "open";
    } else {
      return "";
    }
  };

  const products = JSON.parse(localStorage.getItem("cart"));

  const renderBasket = () => {
    if (products.length) {
      const cards = products.map((product) => (
        <BasketItem product={product} key={`${product.id}-${product.size}`} />
      ));

      return (
        <>
          {cards}
          <div className="sub-total">
            Subtotal: £{calculateSubtotal(products)}
          </div>
          <div className="delivery-text text-center">
            ** FREE DELIVERY ON ALL ORDERS **
          </div>
          <div className="button-div text-center d-flex gap-2 p-3">
            <a
              className="checkout-button w-50"
              href="/basket"
              onClick={handleBasketVisibility}
            >
              VIEW BASKET
            </a>
            <a
              className="checkout-button w-50"
              href="/checkout"
              onClick={handleBasketVisibility}
            >
              CHECKOUT
            </a>
          </div>
        </>
      );
    } else {
      return (
        <div className="empty-basket text-center">
          You haven't added anything to your basket yet!
        </div>
      );
    }
  };

  return (
    <>
      {showCart && <Backdrop />}
      <div className={`popdown-container ${displayCart()}`}>
        <div className="popdown-header">
          <div className="popdown-title">
            My Basket | {products.length}{" "}
            {products.length > 1 && <span>Items</span>}
            {products.length === 1 && <span>Item</span>}
          </div>
          <div className="icon" onClick={handleBasketVisibility}>
            <RiCloseFill />
          </div>
        </div>
        <div className="popdown-container-inner">{renderBasket()}</div>
      </div>
    </>
  );
};

export default BasketPopdown;
