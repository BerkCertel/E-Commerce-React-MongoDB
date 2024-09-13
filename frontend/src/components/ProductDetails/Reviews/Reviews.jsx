import { message } from "antd";
import PropTypes from "prop-types";
import ReviewsForm from "./ReviewsForm";
import ReviewsItem from "./ReviewsItem";
import { useEffect, useState } from "react";

function Reviews({ singleProduct, setSingleProduct }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);

  const thisReview = [];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Kullanıcıları getirme işlemi başarısız oldu.");
        }
      } catch (error) {
        console.error("Kullanıcıları getirirken hata oluştu:", error);
        message.error("Sunucu hatası. Lütfen tekrar deneyin.");
      }
    };

    fetchUsers();
  }, [apiUrl]);

  singleProduct.reviews.forEach((review) => {
    const matchingUsers = users?.filter((user) => user._id === review.user);

    matchingUsers.forEach((matchingUser) => {
      thisReview.push({ review: review, user: matchingUser });
    });
  });

  return (
    <div
      className="tab-pane fadeS p-3"
      id="nav-Reviews"
      role="tabpanel"
      aria-labelledby="nav-Reviews-tab"
    >
      {singleProduct.reviews.length > 0 ? (
        <>
          <h5 className="text-capitalize">
            {singleProduct.reviews.length} reviews for {singleProduct.name}
            With Elastic Hems
          </h5>
          <div className="reviews-cards-area">
            {thisReview.map((item, index) => (
              <ReviewsItem key={index} item={item} reviewItem={item} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className=" mb-5">No Comments Yet...</h3>
        </>
      )}

      <div className="reviews-form-main-div mt-3">
        <h5 className="text-start">Add Reviews</h5>
        <hr />
        <div className="reviews-form-area">
          <ReviewsForm
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
          />
        </div>
      </div>
    </div>
  );
}

Reviews.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};

export default Reviews;
