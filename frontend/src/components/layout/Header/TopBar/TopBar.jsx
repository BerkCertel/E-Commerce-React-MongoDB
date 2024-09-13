import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseContext } from "../../../../context/BaseProvider";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

function TopBar({ setIsSearchShow }) {
  const { cartItems, favItems } = useContext(BaseContext);

  const navigate = useNavigate();

  const [iconHovered, setIconHoreved] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="top-bar">
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center justify-content-sm-start">
            <a
              href="/"
              className="navbar-brand fs-4 fw-bold text-primary  border-bottom border-primary "
              onClick={() => navigate("/")}
            >
              E-Commerce
            </a>
          </div>
          <div className="col-lg-8 col-md-6 col-12">
            <div className=" d-flex justify-content-center justify-content-sm-end gap-3">
              {user ? (
                user.role === "admin" ? (
                  <button
                    className="btn btn-primary text-light position-relative"
                    onClick={() => (window.location.href = "/admin")}
                  >
                    <MdAdminPanelSettings className="fs-4" />
                    <span className="ms-1 d-none d-sm-inline-block">Admin</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary text-light position-relative"
                    onClick={() => (window.location.href = "/")}
                  >
                    <FaUser />
                    <span className="ms-1 d-none d-sm-inline-block">
                      Account
                    </span>
                  </button>
                )
              ) : (
                <button
                  className="btn btn-primary text-light position-relative"
                  onClick={() => (window.location.href = "/auth")}
                >
                  <FaUser />
                  <span className="ms-1 d-none d-sm-inline-block">Login</span>
                </button>
              )}

              <button
                className={`btn btn-primary  position-relative ${
                  iconHovered == "heart" ? "text-danger" : "text-light"
                }`}
                onMouseEnter={() => setIconHoreved("heart")}
                onMouseLeave={() => setIconHoreved("")}
                onClick={() => (window.location.href = "/favorites")}
              >
                <FaHeart />
                <span className={"ms-1 d-none d-sm-inline-block"}>
                  Favorites
                </span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {favItems.length}
                </span>
              </button>

              <button
                className={`btn btn-primary  position-relative ${
                  iconHovered == "cart" ? "text-warning" : "text-light"
                }`}
                onMouseEnter={() => setIconHoreved("cart")}
                onMouseLeave={() => setIconHoreved("")}
                onClick={() => (window.location.href = "/cart")}
              >
                <FaShoppingCart />
                <span className={"ms-1 d-none d-sm-inline-block"}>Cart</span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              </button>

              <button
                className={`btn btn-primary position-relative ${
                  iconHovered == "search" ? "text-info" : "text-light"
                }`}
                onMouseEnter={() => setIconHoreved("search")}
                onMouseLeave={() => setIconHoreved("")}
                onClick={() => setIsSearchShow(true)}
              >
                <IoSearch className="fs-5" />
                <span className="ms-1 d-none d-sm-inline-block">Search</span>
                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    2
                                </span> */}
              </button>

              {user && (
                <button
                  className="btn btn-primary text-light position-relative"
                  onMouseEnter={() => setIconHoreved("exit")}
                  onMouseLeave={() => setIconHoreved("")}
                  onClick={() => {
                    if (
                      window.confirm("Çıkış yapmak istediğinize emin misiniz?")
                    ) {
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }
                  }}
                >
                  <FaArrowRightToBracket
                    className={`${iconHovered == "exit" ? "text-warning" : ""}`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

TopBar.propTypes = {
  setIsSearchShow: PropTypes.func.isRequired,
};

export default TopBar;
