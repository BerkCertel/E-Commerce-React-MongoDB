import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { BaseContext } from "../context/BaseProvider";

function Success() {
  const { setCartItems, setCouponCode, setAppliedCoupon } =
    useContext(BaseContext);

  useEffect(() => {
    setCartItems([]);
    setCouponCode("");
    setAppliedCoupon(null);
    localStorage.removeItem("Coupon");
  }, [setCartItems, setCouponCode, setAppliedCoupon]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Payment was made successfully!"
          subTitle="Your order is completed."
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Go Home Page</Button>
            </Link>,
            <Button key="buy">My orders</Button>,
          ]}
        />
      </div>
    </div>
  );
}

export default Success;
