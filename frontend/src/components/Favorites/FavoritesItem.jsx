import { BaseContext } from "../../context/BaseProvider";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

function FavoritesItem({ favItem }) {
  const { cartItems, removeFromFav, addToCart } = useContext(BaseContext);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === favItem._id
  );

  const [iconCss, setIconCss] = useState("");

  return (
    <tr>
      <td className=" align-content-center text-center">
        <button
          className={`btn btn-dark btn-sm ${
            iconCss === "red" ? "text-danger" : "text-light"
          } `}
          onMouseEnter={() => setIconCss("red")}
          onMouseLeave={() => setIconCss("")}
          onClick={() => removeFromFav(favItem._id)}
        >
          <MdDeleteForever />
        </button>
      </td>
      <th scope="row">
        <img
          src={favItem.img[0]}
          alt="product"
          style={{ maxHeight: "80px" }}
          className="img-fluid align-content-center"
        />
      </th>
      <td className="product-name  text-center align-content-center">
        {favItem.name}
      </td>
      <td className="text-danger new-price text-center align-content-center">
        {favItem.price.toFixed(2)}$
      </td>
      <td className="quantity d-none d-sm-table-cell text-center align-content-center">
        {favItem.quantity}
      </td>
      <td className="total-price d-none d-sm-table-cell align-content-center text-center">
        {(favItem.price * favItem.quantity).toFixed(2)}$
      </td>
      <td className="addtoCartFav align-content-center text-center">
        <button
          className={`btn btn-dark  btn-sm text-center 
                ${iconCss === "warning" ? "text-warning" : "text-light"}`}
          onMouseEnter={() => setIconCss("warning")}
          onMouseLeave={() => setIconCss("")}
          onClick={() => addToCart(favItem)}
          disabled={filteredCart}
        >
          <FaCartPlus />
        </button>
      </td>
    </tr>
  );
}

FavoritesItem.propTypes = {
  favItem: PropTypes.object,
  removeFromFav: PropTypes.func,
};

export default FavoritesItem;
