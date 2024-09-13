import { BaseContext } from "../../context/BaseProvider";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaShoppingBasket,
  FaHeart,
} from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoEye } from "react-icons/io5";

function ProductSliderItem({ productItem }) {
  const { cartItems, addToCart, favItems, AddToFav } = useContext(BaseContext);

  // discount percent calculate
  const originalPrice = productItem.price.current;
  const discountPercent = productItem.price.discount;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercent) / 100;

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
  );

  const filteredFav = favItems.find(
    (favItem) => favItem._id === productItem._id
  );

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card d-flex justify-content-center align-items-center"
      style={{ width: "250px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={productItem.img[0]}
        className={`card-img ${isHovered ? "invisible d-none" : ""} `}
        alt="..."
      />
      <img
        src={productItem.img[1]}
        className={`card-img ${isHovered ? "" : "invisible d-none"} `}
        alt=""
      />

      <div className="card-img-overlay p-0 d-flex flex-column justify-content-between">
        <p className="badge bg-danger position-absolute top-0 end-0 m-2">
          -{productItem.price.discount}%
        </p>
        <div className={`${isHovered ? "" : "invisible d-none"}`}>
          <div className="d-flex flex-column align-items-start m-2">
            <button
              className="btn btn-dark btn-sm mb-2 "
              onClick={() =>
                addToCart({
                  ...productItem,
                  price: discountedPrice,
                })
              }
              disabled={filteredCart}
            >
              <FaShoppingBasket />
            </button>
            <button
              className="btn btn-dark btn-sm mb-2"
              onClick={() =>
                AddToFav({
                  ...productItem,
                  price: discountedPrice,
                })
              }
              disabled={filteredFav}
            >
              <FaHeart />
            </button>
            <button className="btn btn-dark btn-sm mb-2">
              <IoMdShare />
            </button>

            <Link
              to={`product/${productItem._id}`}
              className="btn btn-dark btn-sm"
            >
              <IoEye />
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body text-center">
        <h6 className="card-title fw-bold text-uppercase">
          {productItem.name}
        </h6>
        <div>
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStarHalfAlt className="text-warning" />
        </div>
        <div className="card-text d-flex align-items-center justify-content-center gap-2">
          <p className="old-price text-danger text-decoration-line-through m-0">
            {originalPrice.toFixed(2)}
          </p>
          <p className="new-price fw-bold fs-6 m-0">
            {discountedPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

ProductSliderItem.propTypes = {
  productItem: PropTypes.object,
};

export default ProductSliderItem;
