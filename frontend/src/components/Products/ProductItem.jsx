import PropTypes from "prop-types";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaShoppingBasket, FaHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoEye } from "react-icons/io5";

function ProductItem({ productItem }) {
    const [isImgHovered, setIsImgHovered] = useState(false);

    return (
        <div className="col-sm-6 col-lg-3 mt-sm-3">
            <div className="card text-center shadow">
                <div
                    className="img-wrapper"
                    onMouseEnter={() => setIsImgHovered(true)}
                    onMouseLeave={() => setIsImgHovered(false)}
                >
                    <img
                        src={productItem.img.singleImage}
                        alt=""
                        className={`card-img-top ${isImgHovered ? "img-display" : "img-show"}`}
                    />
                    <img
                        src={productItem.img.thumbs[1]}
                        className={`card-img-top ${isImgHovered ? "img-show" : "img-display"}`}
                        alt=""
                    />
                </div>
                <div className="card-img-overlay">
                    <div className="text-end">
                        <div>
                            <span className="badge bg-danger fs-6">%22</span>
                        </div>
                        <div className="d-flex flex-column">
                            <button className={`w-25 btn bg-transparent ${isImgHovered ? "img-show" : "img-display"}`}>
                                <span className="badge bg-black">
                                    <FaShoppingBasket />
                                </span>
                            </button>
                            <button className={`w-25 btn bg-transparent ${isImgHovered ? "img-show" : "img-display"}`}>
                                <span className="badge bg-black">
                                    <FaHeart />
                                </span>
                            </button>
                            <button className={`w-25 btn bg-transparent ${isImgHovered ? "img-show" : "img-display"}`}>
                                <span className="badge bg-black">
                                    <IoEye />
                                </span>
                            </button>
                            <button className={`w-25 btn bg-transparent ${isImgHovered ? "img-show" : "img-display"}`}>
                                <span className="badge bg-black">
                                    <IoMdShare />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title fs-6 overflow-hidden fw-bold text-uppercase">
                        {productItem.name}
                    </h5>
                    <div>
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStar className="text-warning" />
                        <FaStarHalfAlt className="text-warning" />
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <p className="text-muted text-decoration-line-through">200$</p>
                        <p className="card-text text-danger fw-bold fs-4">300$</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductItem.propTypes = {
    productItem: PropTypes.object.isRequired,
};

export default ProductItem;
