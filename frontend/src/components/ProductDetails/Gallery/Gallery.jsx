import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Gallery({ singleProduct }) {
  const [activeImg, setActiveImg] = useState(singleProduct.img[0]);

  // eslint-disable-next-line no-unused-vars
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const PrevBtn = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="custom-prev-btn"
        aria-label="Previous slide"
      >
        &lt;
      </button>
    );
  };

  PrevBtn.propTypes = {
    onClick: PropTypes.func,
  };

  const NextBtn = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="custom-next-btn"
        aria-label="Next slide"
      >
        &gt;
      </button>
    );
  };

  NextBtn.propTypes = {
    onClick: PropTypes.func,
  };

  const filteredImages = singleProduct.img.filter(
    (img, index, self) => img !== activeImg || self.indexOf(img) === index
  );

  useEffect(() => {
    if (!filteredImages.includes(activeImg)) {
      setActiveImg(filteredImages[0] || singleProduct.img[0]);
    }
  }, [filteredImages, activeImg, singleProduct.img]);

  return (
    <div className="gallery-section">
      <div>
        <img
          src={activeImg}
          className="img-fluid rounded-start rounded border border-black"
          alt="Selected"
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            minWidth: "100%",
            maxWidth: "100%",
          }}
        />
      </div>
      <div className="carousel slide mt-3 mb-3">
        {filteredImages.length > 0 ? (
          <div className="carousel-inner">
            <Carousel
              autoPlay
              autoPlaySpeed={800}
              infinite
              transitionDuration={1000}
              customTransition="transform 500ms ease-in-out"
              itemClass="d-flex justify-content-center align-items-center"
              responsive={responsive}
              prevButton={<PrevBtn />}
              nextButton={<NextBtn />}
            >
              {filteredImages.map((itemImg, index) => (
                <div
                  key={index}
                  className={`card rounded d-flex justify-content-center align-items-center cursor-pointer ${
                    activeImg === itemImg ? "border-black" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={itemImg}
                    className="card-img"
                    alt="Thumbnail"
                    onClick={() => setActiveImg(itemImg)}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        ) : null}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  singleProduct: PropTypes.shape({
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Gallery;
