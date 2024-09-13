import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { message, Spin } from "antd";

function SearchDialog({ isSearchShow, setIsSearchShow }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    setLoading(true);
    e.preventDefault();
    const searchInput = e.target.elements[0]; // İlk form elemanına eriş
    const productName = searchInput.value; // input elementinin değerini al

    if (productName.trim().length === 0) {
      message.warning("Please enter a valid product name.");
      return;
    }

    try {
      const res = await fetch(
        `${apiUrl}/api/products/search/${productName.trim()}`
      );

      if (!res.ok) {
        message.error("Product import error");
        return;
      }
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`search-dialog ${
        isSearchShow ? "modal-show" : "modal-hidden"
      }`}
    >
      <div
        className="modal-backdrop fade show"
        onClick={() => setIsSearchShow(false)}
      >
        {" "}
      </div>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-4 text-dark text-uppercase"
                id="searchModalLabel"
              >
                Search for products
              </h1>
              <button
                type="button"
                className="btn-close bg-primary"
                aria-label="Close"
                onClick={() => setIsSearchShow(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-dark fw-bold fs-5">
                Start typing to see products you are looking for.
              </p>
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    name="Search"
                  />
                  <button className="btn btn-primary text-light">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <Spin spinning={loading}>
              <div className="modal-footer p-3">
                {!searchResults && (
                  <div className="w-100 text-center">
                    <p className="m-0">Search for products</p>
                  </div>
                )}

                {searchResults?.length === 0 && (
                  <div className="w-100 text-center">
                    <p className="m-0">
                      The product you were looking for was not found.
                    </p>
                  </div>
                )}
                <div className="row g-3">
                  {searchResults?.length > 0 &&
                    searchResults?.map((resultItem) => {
                      return (
                        <div
                          key={resultItem._id}
                          className="col-lg-4 col-md-4 col-6 "
                        >
                          <Link
                            to={`product/${resultItem._id}`}
                            className="text-decoration-none"
                          >
                            <div className="card mb-3">
                              <div className="row g-0">
                                <div className="col-12 col-md-4">
                                  <img
                                    src={resultItem.img[0]}
                                    className="img-fluid rounded-start"
                                    alt="Product Image"
                                  />
                                </div>
                                <div className="col-12 col-md-8">
                                  <div className="card-body">
                                    <h5 className="card-title text-center">
                                      {resultItem.name}
                                    </h5>
                                    <p className="card-text">SKU: PB0016</p>
                                    <p className="fw-bold text-danger">
                                      ${resultItem.price.current.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchDialog.propTypes = {
  setIsSearchShow: PropTypes.func.isRequired,
  isSearchShow: PropTypes.bool.isRequired,
};

export default SearchDialog;
