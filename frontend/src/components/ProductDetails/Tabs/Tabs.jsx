import PropTypes from "prop-types";
import Reviews from "../Reviews/Reviews";

function Tabs({ singleProduct, setSingleProduct }) {
  return (
    <>
      <nav>
        <div
          className="nav nav-tabs d-flex flex-wrap justify-content-start"
          id="nav-tab"
          role="tablist"
        >
          <button
            className="nav-link active"
            id="nav-description-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-description"
            type="button"
            role="tab"
            aria-controls="nav-description"
            aria-selected="true"
            style={{ fontSize: "12px" }}
          >
            Description
          </button>

          <button
            className="nav-link"
            id="nav-Additional-information-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-Additional-information"
            type="button"
            role="tab"
            aria-controls="nav-Additional-information"
            aria-selected="true"
            style={{ fontSize: "12px" }}
          >
            Additional information
          </button>

          <button
            className="nav-link"
            id="nav-Reviews-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-Reviews"
            type="button"
            role="tab"
            aria-controls="nav-Reviews"
            aria-selected="true"
            style={{ fontSize: "12px" }}
          >
            Reviews
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active p-3"
          id="nav-description"
          role="tabpanel"
          aria-labelledby="nav-description-tab"
        >
          <p
            className="card-text product-desct-inner"
            dangerouslySetInnerHTML={{ __html: singleProduct.description }}
          ></p>
        </div>
        <div
          className="tab-pane fade  p-3"
          id="nav-Additional-information"
          role="tabpanel"
          aria-labelledby="nav-Additional-information-tab"
        >
          <h2>Additional information</h2>
          <table className="table table-bordered">
            <tbody className="">
              <tr className="border">
                <th scope="row">Color</th>
                <td style={{ fontSize: "13px" }}>
                  Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                  White
                </td>
              </tr>
              <tr className="border ">
                <th scope="row">Size</th>
                <td style={{ fontSize: "13px" }}>
                  {singleProduct.sizes.map((item, index) => (
                    <span className=" text-uppercase" key={index}>
                      {item}
                      {index < singleProduct.sizes.length - 1 && ", "}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="tab-pane fade   p-3"
          id="nav-Reviews"
          role="tabpanel"
          aria-labelledby="nav-Reviews-tab"
        >
          <Reviews
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
          />
        </div>
      </div>
    </>
  );
}

Tabs.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};

export default Tabs;
