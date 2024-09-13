import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import ModalDialog from "../components/Modals/ModalDialog/ModalDialog";
import SearchDialog from "../components/Modals/SearchDialog/SearchDialog";

function MainLayout({ children }) {
  const [isSearchShow, setIsSearchShow] = useState(false);

  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 3000);
  });

  return (
    <div className="main-layout">
      <ModalDialog
        isDialogShow={isDialogShow}
        setIsDialogShow={setIsDialogShow}
      />
      <SearchDialog
        isSearchShow={isSearchShow}
        setIsSearchShow={setIsSearchShow}
      />
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
