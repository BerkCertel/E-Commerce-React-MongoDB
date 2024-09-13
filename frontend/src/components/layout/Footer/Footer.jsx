import Socials from "./Socials/Socials";
import Subscribe from "./Subscribe/Subscribe";
import { FaTruck } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";
import { BsArrowClockwise } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";

function Footer() {
  return (
    <footer className="w-100 ">
      <div className="footer-policy-list bg-light border-top ">
        <div className="container ">
          <ul className="policy-list mt-2 d-flex justify-content-between align-items-center px-2 py-2 flex-wrap gap-3 ">
            <li className="policy-item">
              <FaTruck className="policy-icon" />
              <div className="policy-texts">
                <strong>Free Delivery</strong>
                <span>From $49.99</span>
              </div>
            </li>
            <li className="policy-item">
              <FaHeadset className="policy-icon" />
              <div className="policy-texts">
                <strong>SUPPORT 24/7</strong>
                <span>Online 24 hours</span>
              </div>
            </li>
            <li className="policy-item">
              <BsArrowClockwise className="policy-icon" />
              <div className="policy-texts">
                <strong>30 DAYS RETURN</strong>
                <span>Simply return it within 30 days</span>
              </div>
            </li>
            <li className="policy-item">
              <IoCardOutline className="policy-icon" />
              <div className="policy-texts">
                <strong>PAYMENT METHOD</strong>
                <span>Secure Payment</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-main bg-primary ">
        <div className="container">
          <div className="row  gy-3">
            <div className="col-md-4">
              <Subscribe />
            </div>
            <div className="col-md-8 ">
              <Socials />
            </div>

            <div className="col-md-12">
              <p className="text-center text-light">
                @2024 All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
