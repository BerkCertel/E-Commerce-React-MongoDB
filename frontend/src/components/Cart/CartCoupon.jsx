import { message } from "antd";
import { useContext, useEffect } from "react";
import { BaseContext } from "../../context/BaseProvider";

function CartCoupon() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    cartItems,
    setCartItems,
    couponCode,
    setCouponCode,
    appliedCoupon,
    setAppliedCoupon,
  } = useContext(BaseContext);

  useEffect(() => {
    localStorage.setItem("Coupon", JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  const applyCoupon = async () => {
    if (!couponCode || couponCode.trim().length === 0) {
      return message.warning("Empty Coupon code cannot be entered");
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.error(
          "The coupon code you entered is incorrect or not found."
        );
      }
      const data = await res.json();
      const discountPercent = data.discountPercent;

      setAppliedCoupon({ code: couponCode, discount: discountPercent });

      const updatedCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);

        return { ...item, price: updatePrice };
      });
      setCartItems(updatedCartItems);
      message.success(
        `Coupon code '${couponCode}' has been successfully applied! Enjoy your discount.`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeCoupon = () => {
    const originalCartItems = cartItems.map((item) => {
      const originalPrice =
        item.price / (1 - (appliedCoupon?.discount || 0) / 100);
      return { ...item, price: originalPrice };
    });

    setCartItems(originalCartItems);
    setAppliedCoupon(null);
    localStorage.removeItem("Coupon");
    message.info("Coupon code removed. Prices reverted to original.");
  };

  return (
    <div className="row ">
      <div className="col-6 ">
        <div className="d-flex gap-2">
          <div className="form-floating">
            <input
              type="text"
              className=""
              placeholder="Coupon"
              onChange={(e) => setCouponCode(e.target.value)}
              value={couponCode || ""}
              disabled={appliedCoupon !== null}
            />
          </div>
          <div>
            {appliedCoupon ? (
              <button
                className="btn btn-danger btn-sm"
                type="button"
                onClick={removeCoupon}
              >
                Remove Coupon
              </button>
            ) : (
              <button
                className="btn btn-dark btn-sm"
                type="button"
                onClick={applyCoupon}
              >
                Apply Coupon
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="col-6 d-flex justify-content-end">
        <button className="btn btn-danger btn-sm">Update Cart</button>
      </div>
    </div>
  );
}

export default CartCoupon;
