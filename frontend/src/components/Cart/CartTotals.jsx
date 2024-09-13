import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { BaseContext } from "../../context/BaseProvider";
import { message, Spin } from "antd";

function CartTotals() {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems } = useContext(BaseContext);
  const [loading, setLoading] = useState(false);

  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item.price * item.quantity;
    return itemTotal;
  });

  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cargoFee = 15;

  const CartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handlePayment = async () => {
    setLoading(true);

    if (!user) {
      return message.info("You must log in to make payment.");
    }

    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(stripePublicKey);

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Payment transaction failed.");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="cart-totals col-md-4 col-12 d-flex justify-content-end mt-3 mt-md-0"
      style={{ maxHeight: "400px" }}
    >
      <div className="card h-100 ">
        <div className="card-body d-flex flex-column justify-content-center">
          <h5 className="card-title text-center fs-2">Cart totals</h5>
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
                className="form-check-label mx-2"
                style={{ fontSize: "12px" }}
              >
                Fast Cargo: $15.00
              </label>
            </div>
            <a href="#" className="fw-bold text-danger mt-2">
              Change Address
            </a>
          </div>
          <hr />
          <div className="row text-center">
            <div className="col-6 fw-bold">Total</div>
            <div className="col-6">${CartTotals}</div>
          </div>
          <Spin spinning={loading}>
            <button
              className="btn btn-danger w-100 mt-3 text-light"
              onClick={handlePayment}
            >
              Proceed to checkout
            </button>
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default CartTotals;
