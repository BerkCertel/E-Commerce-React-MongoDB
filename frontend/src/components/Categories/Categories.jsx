import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { message } from "antd";

function Categories() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Fetching categories failed.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Server error. Please try again.");
      }
    };

    fetchCategory();
  }, [apiUrl]);

  return (
    <section className="categories mt-4">
      <div className="container">
        <header className="text-center">
          <h3 className="fw-bold text-uppercase">All Categories</h3>
          <p>Summer Collection New Modern Design</p>
        </header>
        <div className="row g-3 d-flex justify-content-center flex-wrap p-md-3">
          {categories.map((category) => {
            return <CategoryItem key={category._id} category={category} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
