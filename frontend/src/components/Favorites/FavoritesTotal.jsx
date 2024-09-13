import { useContext, useState } from "react";
import { BaseContext } from "../../context/BaseProvider";

function FavoritesTotal() {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);

  const { favItems } = useContext(BaseContext);

  const favItemsTotals = favItems.map((item) => {
    const itemTotal = item.price * item.quantity;
    return itemTotal;
  });

  const subTotals = favItemsTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cargoFee = 15;

  const CartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  return (
    <div
      className="col-md-4 col-12 d-flex justify-content-end justify-content-center mt-3 mt-md-0"
      style={{ maxHeight: "400px" }}
    >
      <div className="card h-100 w-75">
        <div className="card-body d-flex flex-column justify-content-center">
          <h5 className="card-title text-center fs-2">Favorites totals</h5>
          <hr />
          <div className="row text-center">
            <div className="col fw-bold">Subtotal</div>
            <div className="col">${subTotals.toFixed(2)}</div>
          </div>
          <hr />
          <div className="row text-center">
            <div className="col fw-bold">Shipping</div>
            <div className="col d-flex align-items-center justify-content-center">
              <input
                type="checkbox"
                className="form-check-input ms-1"
                checked={fastCargoChecked}
                onChange={() => setFastCargoChecked(!fastCargoChecked)}
              />
              <label
                className="form-check-label"
                htmlFor="exampleCheck1"
              ></label>
              <span style={{ fontSize: "12px" }}>Fast Cargo $15.00</span>
            </div>
          </div>
          <hr />
          <div className="row text-center">
            <div className="col-6 fw-bold">Total</div>
            <div className="col-6">${CartTotals}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesTotal;
