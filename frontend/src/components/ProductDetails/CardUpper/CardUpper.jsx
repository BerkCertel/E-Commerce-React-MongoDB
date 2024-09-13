import PropTypes from "prop-types";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function CardUpper({ singleProduct }) {
  const originalPrice = singleProduct.price.current;
  const discountPercent = singleProduct.price.discount;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercent) / 100;

  return (
    <div className="card-upper-side">
      <div className="card-title-div d-flex  justify-content-between align-items-center">
        <h5 className="card-title text-center fw-bold fs-2">
          {singleProduct.name}
        </h5>
        <div className="text-start">
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStar className="text-warning" />
          <FaStarHalfAlt className="text-warning" />
          <p className="fw-bold">2 Rewives</p>
        </div>
      </div>
      <div className="price-div d-flex gap-2 fs-3">
        <p className=" text-decoration-line-through text-muted fs-5">
          ${originalPrice.toFixed(2)}
        </p>
        <p className="fw-bold text-danger">${discountedPrice.toFixed(2)}</p>
      </div>
      <p
        className="card-text product-desct-inner"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></p>
    </div>
  );
}

CardUpper.propTypes = {
  singleProduct: PropTypes.object,
};

export default CardUpper;
