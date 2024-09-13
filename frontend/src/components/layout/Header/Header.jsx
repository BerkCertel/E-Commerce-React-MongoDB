import PropTypes from "prop-types";
import Navbar from "./Navbar/Navbar";
import TopBar from "./TopBar/TopBar";

function Header({ setIsSearchShow }) {
  return (
    <header className="">
      <section className="top-bar-main">
        <TopBar setIsSearchShow={setIsSearchShow} />
      </section>
      <section className="navbar-main"></section>
      <Navbar />
    </header>
  );
}

Header.propTypes = {
  setIsSearchShow: PropTypes.func.isRequired,
};

export default Header;
