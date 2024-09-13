import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import BaseProvider from "./context/BaseProvider";
import { Layout } from "./Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import "./styles/css/main.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <BaseProvider>
      <Layout>
        <App />
      </Layout>
    </BaseProvider>
  </BrowserRouter>
);
