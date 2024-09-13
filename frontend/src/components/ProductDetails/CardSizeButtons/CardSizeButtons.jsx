import PropTypes from "prop-types";
import { useState } from "react";

function CardSizeButtons({ singleProduct }) {
  const [selectedSize, setSelectedSize] = useState(singleProduct.sizes[0]);

  return (
    <>
      <p className="mt-3 fw-bold fs-4">Size</p>
      <div className="mt-3 d-flex gap-3 justify-content-center align-items-center ">
        {singleProduct.sizes.map((size, index) => (
          <button
            className={`btn btn-outline-primary w-25  ${
              selectedSize === size ? "text-black bg-primary" : ""
            } `}
            key={index}
            onClick={() => setSelectedSize(size)}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}

CardSizeButtons.propTypes = {
  singleProduct: PropTypes.object,
};

export default CardSizeButtons;
