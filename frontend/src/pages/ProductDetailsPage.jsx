import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import NotFountPage from "../pages/NotFoundPage";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id: productId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setSingleProduct(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);

  return singleProduct ? (
    <ProductDetails
      singleProduct={singleProduct}
      setSingleProduct={setSingleProduct}
    />
  ) : (
    <NotFountPage />
  );
}

export default ProductDetailsPage;
