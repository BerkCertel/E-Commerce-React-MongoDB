import { PropTypes } from "prop-types";

function CategoryItem({ category }) {
  return (
    <div
      className="col-4 col-sm-6 col-md-4 col-lg-3 mb-4"
      style={{ maxWidth: "200px", maxHeight: "173px" }}
    >
      <a
        href=""
        className="card shadow bg-light category-card text-center p-2 d-flex flex-column align-items-center"
      >
        <img
          src={category.img}
          className="card-img-top border-bottom rounded img-fluid "
          alt={category.name}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
        <div className="card-body">
          <p className="card-title fw-bold mb-0  text-uppercase">
            {category.name}
          </p>
        </div>
      </a>
    </div>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategoryItem;
