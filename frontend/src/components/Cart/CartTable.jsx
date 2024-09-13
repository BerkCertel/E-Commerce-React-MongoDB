import { useContext } from "react";
import CartItem from "./CartItem";
import { BaseContext } from "../../context/BaseProvider";

function CartTable() {
  const { cartItems } = useContext(BaseContext);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col" className="text-center">
            Remove
          </th>
          <th scope="col" className="text-center"></th>
          <th scope="col" className="text-center">
            Product
          </th>
          <th scope="col" className="text-center">
            Price
          </th>
          <th scope="col" className="d-none d-sm-table-cell text-center">
            Quantity
          </th>
          <th scope="col" className="d-none d-sm-table-cell text-center">
            Subtotal
          </th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item._id} />
        ))}
      </tbody>
    </table>
  );
}

export default CartTable;
