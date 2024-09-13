import PropTypes from "prop-types";
import { useState } from "react";
import { message } from "antd";
import { FaStar } from "react-icons/fa";

function ReviewsForm({ singleProduct, setSingleProduct }) {
  const [hoveredStar, setHoveredStar] = useState();
  const [rating, setRating] = useState(0);
  const [checked, setChecked] = useState(false);
  const [review, setReview] = useState("");

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user === null) {
      return message.warning("You must log in to comment.");
    }

    if (checked === false) {
      return message.error("Please check the box to save your information.");
    }

    if (rating === 0) {
      return message.error("To comment, please provide a review score.");
    }

    const formData = {
      reviews: [
        ...singleProduct.reviews,
        {
          text: review,
          rating: rating,
          user: user.id || user._id,
        },
      ],
    };

    try {
      const res = await fetch(`${apiUrl}/api/products/${singleProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        message.error("Your comment could not be created.");
        return;
      }

      const data = await res.json();
      setSingleProduct(data);
      setReview("");
      setRating(0);
      setChecked(false);
      message.success("Review submitted successfully!");
    } catch (error) {
      console.log(error);
      message.error("Your comment could not be created.");
    }
  };

  return (
    <>
      <p>
        Your email address will not be published. Required fields are marked
        <span className="text-danger">*</span>
      </p>
      <p className="fw-bold">
        Your rating<span className="text-danger">*</span>
      </p>
      <div className="review-form-stars cursor-pointer d-flex gap-2 justify-content-start align-items-center">
        <div
          className={`${hoveredStar == 1 || rating == 1 ? "text-warning" : ""}`}
          onClick={() => setRating(1)}
          onMouseEnter={() => setHoveredStar(1)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <FaStar />
        </div>
        <div
          className={`${hoveredStar == 2 || rating == 2 ? "text-warning" : ""}`}
          onClick={() => setRating(2)}
          onMouseEnter={() => setHoveredStar(2)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <FaStar />
          <FaStar />
        </div>
        <div
          className={`${hoveredStar == 3 || rating == 3 ? "text-warning" : ""}`}
          onClick={() => setRating(3)}
          onMouseEnter={() => setHoveredStar(3)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div
          className={`${hoveredStar == 4 || rating == 4 ? "text-warning" : ""}`}
          onClick={() => setRating(4)}
          onMouseEnter={() => setHoveredStar(4)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div
          className={`${hoveredStar == 5 || rating == 5 ? "text-warning" : ""}`}
          onClick={() => setRating(5)}
          onMouseEnter={() => setHoveredStar(5)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
      <div>
        <p className="fw-bold mt-2">
          Your Reviews<span className="text-danger">*</span>
        </p>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "150px" }}
            onChange={(e) => setReview(e.target.value)}
            required
            value={review}
          ></textarea>
          <form onSubmit={handleSubmit}>
            <div>
              <div id="emailHelp" className="form-text">
                We`ll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={() => setChecked(!checked)}
                checked={checked}
              />
              <label className="form-check-label fs-6">
                Save my name, email, and website in this browser for the next
                time I comment.<span className="text-danger">*</span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary text-light">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

ReviewsForm.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};

export default ReviewsForm;
