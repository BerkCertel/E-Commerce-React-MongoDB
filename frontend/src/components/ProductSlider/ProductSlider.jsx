// import PropTypes from "prop-types";
import ProductSliderItem from "./ProductSliderItem";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { message } from "antd";

function ProductSlider() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Fetching categories failed.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Server error. Please try again.");
      }
    };

    fetchProducts();
  }, [apiUrl]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="product-slider mt-2">
      <header className="text-center">
        <h3 className="fw-bold text-uppercase">New Products</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </header>
      <div className="container">
        <Carousel
          autoPlay
          autoPlaySpeed={2000}
          infinite
          transitionDuration={1000}
          customTransition="transform 500ms ease-in-out"
          itemClass="d-flex justify-content-center align-items-center"
          responsive={responsive}
        >
          {products.map((product) => (
            <ProductSliderItem productItem={product} key={product._id} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ProductSlider;
