import FavoritesItem from "./FavoritesItem";
import { BaseContext } from "../../context/BaseProvider";
import { useContext } from "react";

function FavoritesTable() {
  const { favItems } = useContext(BaseContext);

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="text-center ts">
              Remove
            </th>
            <th scope="col"></th>
            <th scope="col" className="text-center ts">
              Product
            </th>
            <th scope="col" className="text-center ts">
              Price
            </th>
            <th scope="col" className="d-none d-sm-table-cell text-center ts">
              Quantity
            </th>
            <th scope="col" className="d-none d-sm-table-cell text-center ts">
              Subtotal
            </th>
            <th scope="col" className="text-center  ts">
              Add Cart
            </th>
          </tr>
        </thead>
        <tbody>
          {favItems.map((item) => (
            <FavoritesItem favItem={item} key={item._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritesTable;
