import { useContext } from "react";
import { BaseContext } from "../../context/BaseProvider";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";

function Cart() {
  const { cartItems } = useContext(BaseContext);

  return (
    <section className="cart-main-div">
      <div className="container p-3">
        {cartItems.length > 0 ? (
          <div className="row">
            <div className="col-md-8 col-12">
              <div className="progress-bar">
                <CartProgress />
              </div>

              <div className="table-responsive card-table-div">
                <CartTable />
              </div>

              <div className="card-coupon-div">
                <CartCoupon />
              </div>
            </div>

            <CartTotals />
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <h2>There are no items in the cart...</h2>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
