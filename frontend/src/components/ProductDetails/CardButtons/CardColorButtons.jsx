import PropTypes from "prop-types";
import { useState } from "react";

function CardColorButtons({ singleProduct }) {
  const [selectedColor, setSelectedColor] = useState(singleProduct.colors[0]);

  return (
    <>
      <p className="fw-bold fs-4">Color</p>
      <div className="color-div-inner d-flex gap-3 ">
        {singleProduct.colors.map((color, index) => (
          <button
            className={`btn rounded-circle ${
              selectedColor === color ? "selected" : ""
            }`}
            key={index}
            style={{
              backgroundColor: `#${color}`,
              width: "30px",
              height: "30px",
            }}
            onClick={() => setSelectedColor(color)}
          ></button>
        ))}
      </div>
    </>
  );
}

CardColorButtons.propTypes = {
  singleProduct: PropTypes.object,
};

export default CardColorButtons;
