import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa6";

function ReviewsItem({ reviewItem }) {
  const { review, user } = reviewItem;
  console.log(reviewItem);
  const { text, createdAt, rating } = review;

  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedDate = new Date(createdAt).toLocaleDateString(
    "en-EN",
    options
  );

  return (
    <div className="card mt-3">
      <div className="row g-0">
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <img
            src={user.avatar}
            className="img-fluid rounded-5 p-1 w-100 h-100"
            alt="..."
            style={{
              objectFit: "contain",
              maxHeight: "100px",
              maxWidth: "100px",
            }}
          />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <p className="card-stars" style={{ fontSize: "12px" }}>
              {Array.from({ length: rating }, (_, index) => {
                return <FaStar key={index} className="text-warning" />;
              })}
            </p>
            <div
              className="card-text d-flex gap-2"
              style={{ fontSize: "12px" }}
            >
              <p className="status-p fw-bold text-capitalize">
                {user.username}
              </p>
              <p className="reviews-date text-muted">{formattedDate}</p>
            </div>
            <div className="reviews-area-inner">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReviewsItem.propTypes = {
  reviewItem: PropTypes.object,
};

export default ReviewsItem;
