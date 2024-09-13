import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { CiShare2, CiHeart } from "react-icons/ci";
import { IoIosGlobe } from "react-icons/io";
import { BaseContext } from "../../../context/BaseProvider";

function CardBottomSide({ singleProduct }) {
  const { addToCart, cartItems } = useContext(BaseContext);

  const quantityRef = useRef();

  const originalPrice = singleProduct.price.current;
  const discountPercent = singleProduct.price.discount;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercent) / 100;

  const filteredCard = cartItems.find(
    (cartItem) => cartItem._id === singleProduct._id
  );

  return (
    <>
      <div className="add-cart-div d-flex mt-3 text-center gap-2">
        <input
          type="number"
          className="p-2"
          style={{ maxWidth: "6rem" }}
          defaultValue={1}
          min={1}
          ref={quantityRef}
        />
        <button
          className="btn btn-primary w-100 text-light"
          disabled={filteredCard}
          onClick={() =>
            addToCart({
              ...singleProduct,
              price: discountedPrice,
              quantity: parseInt(quantityRef.current.value),
            })
          }
        >
          Add To Cart
        </button>
      </div>

      <div className="muted-text-div d-flex mt-2 justify-content-start align-items-center gap-2 border-top">
        <a href="" className="text-muted ">
          <IoIosGlobe className="fs-4" />{" "}
          <span style={{ fontSize: "10px" }}>Size Guide</span>
        </a>
        <a href="" className="text-muted">
          <CiHeart className="fs-4" />{" "}
          <span style={{ fontSize: "10px" }}> Add to Wislist</span>
        </a>
        <a href="" className="text-muted">
          <CiShare2 className="fs-4" />{" "}
          <span style={{ fontSize: "10px" }}>Share this Product</span>
        </a>
      </div>

      <div className="card-end-div mt-4" style={{ fontSize: "11px" }}>
        <div className="d-flex justify-content-start align-items-center gap-1">
          <p className=" text-uppercase fw-bold">sku:</p>
          <p>BE45VGRT</p>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-1">
          <p className=" text-uppercase fw-bold">Categories:</p>
          <p>Pants , Women</p>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-1">
          <p className=" text-uppercase fw-bold">Tags:</p>
          <p>black,white</p>
        </div>
      </div>
    </>
  );
}

CardBottomSide.propTypes = {
  singleProduct: PropTypes.object,
};

export default CardBottomSide;
