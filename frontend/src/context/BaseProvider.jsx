import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const BaseContext = createContext();

const BaseProvider = ({ children }) => {
  //slider
  const [currentSlide, setCurrentSlide] = useState(0);

  //!CartItems

  //cartItems
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  //cartItems LocalStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //AddToCart
  const addToCart = (cartItem) => {
    // setCartItems([...cartItems,product]) ilk yol
    setCartItems((prevCart) => [
      ...prevCart,
      {
        ...cartItem,
        quantity: cartItem.quantity ? cartItem.quantity : 1,
      },
    ]);
  };
  // RemoveToCart
  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
      return cartItem._id !== itemId;
    });
    setCartItems(filteredCartItems);
  };

  //!FavItems
  //FavItem
  const [favItems, setFavItems] = useState(
    localStorage.getItem("favItems")
      ? JSON.parse(localStorage.getItem("favItems"))
      : []
  );

  //AddToFav
  const AddToFav = (favItem) => {
    setFavItems((prevFav) => [
      ...prevFav,
      {
        ...favItem,
        quantity: favItem.quantity ? favItem.quantity : 1,
      },
    ]);
  };

  //favItems LocalStorage
  useEffect(() => {
    localStorage.setItem("favItems", JSON.stringify(favItems));
  }, [favItems]);

  const removeFromFav = (favId) => {
    const filteredFavItems = favItems.filter((favItem) => {
      return favItem._id !== favId;
    });
    setFavItems(filteredFavItems);
  };

  //Coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(
    localStorage.getItem("Coupon")
      ? JSON.parse(localStorage.getItem("Coupon"))
      : null
  );

  return (
    <BaseContext.Provider
      value={{
        currentSlide,
        setCurrentSlide,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        favItems,
        AddToFav,
        removeFromFav,
        couponCode,
        setCouponCode,
        appliedCoupon,
        setAppliedCoupon,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

BaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseProvider;
