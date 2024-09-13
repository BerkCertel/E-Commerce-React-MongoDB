import PropTypes from "prop-types";
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Gallery from "./Gallery/Gallery";
import CardUpper from "./CardUpper/CardUpper";
import CardColorButtons from "./CardButtons/CardColorButtons";
import CardBottomSide from "./CardBottom/CardBottomSide";
import CardSizeButtons from "./CardSizeButtons/CardSizeButtons";
import Tabs from "./Tabs/Tabs";

function ProductDetails({ singleProduct, setSingleProduct }) {
  return (
    <section className="product-details">
      <div className="container">
        <div className="breadcrumb-section mt-3">
          <BreadCrumb />
        </div>
        <div className="card-section">
          <div className="card mb-3">
            <div className="row mt-2 mx-1">
              <div className="col-lg-4">
                <Gallery singleProduct={singleProduct} />
              </div>

              <div className="col-lg-8">
                <div className="card-body">
                  <CardUpper singleProduct={singleProduct} />
                  <div className="color-div">
                    <CardColorButtons singleProduct={singleProduct} />
                  </div>

                  <div className="size-div ">
                    <CardSizeButtons singleProduct={singleProduct} />
                  </div>
                  <div className="bottom-side-div">
                    <CardBottomSide singleProduct={singleProduct} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs card p-3">
          <Tabs
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
          />
        </div>
      </div>
    </section>
  );
}

ProductDetails.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};

export default ProductDetails;
