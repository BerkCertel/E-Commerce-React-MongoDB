import { BaseContext } from "../../context/BaseProvider";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

function CartItem({ cartItem }) {
  const { removeFromCart } = useContext(BaseContext);

  const [deleteIcon, setDeleteIcon] = useState("");

  return (
    <tr>
      <td className=" align-content-center text-center">
        <button
          className={`btn btn-sm btn-dark  ${
            deleteIcon === "red" ? "text-danger" : "text-light"
          } `}
          onMouseEnter={() => setDeleteIcon("red")}
          onMouseLeave={() => setDeleteIcon("")}
          onClick={() => removeFromCart(cartItem._id)}
        >
          <MdDeleteForever />
        </button>
      </td>
      <th scope="row">
        <img
          src={cartItem.img[0]}
          className="text-center"
          alt=""
          style={{ maxHeight: "80px" }}
        />
      </th>
      <td className="product-name align-content-center text-center">
        {cartItem.name}
      </td>
      <td className="text-danger new-price align-content-center text-center">
        {cartItem.price.toFixed(2)}$
      </td>
      <td className="quantity d-none d-sm-table-cell align-content-center text-center">
        {cartItem.quantity}
      </td>
      <td className="total-price d-none d-sm-table-cell align-content-center text-center">
        {(cartItem.price * cartItem.quantity).toFixed(2)}$
      </td>
      <td className="align-content-center text-center"></td>
    </tr>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object,
  removeFromCart: PropTypes.func,
};

export default CartItem;
