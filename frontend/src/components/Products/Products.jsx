import { useState } from "react";
import productsData from "../../data.json";
import ProductItem from "./ProductItem";

function Products() {
    const [products] = useState(productsData);

    return (
        <section className="products">
            <div className="container">
                <header className="text-center">
                    <h2 className="fw-bold">Featured Products</h2>
                    <p>Summer Collection New Modern Design</p>
                </header>
                <div className="row">
                    {products.map((product) => (
                        <ProductItem productItem={product} key={product.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products;
