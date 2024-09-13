import BlogItem from "./BlogItem";

function Blog() {
    return (
        <section className="blog mt-3 ">
            <div className="container ">
                <header className="text-center ">
                    <h3 className="fw-bold text-uppercase">OuR Blogs</h3>
                    <p>Summer Collection New Modern Design</p>
                </header>
                <div className="row">

                    <BlogItem />
                    <BlogItem />
                    <BlogItem />

                </div>
            </div>
        </section>
    );
}

export default Blog;
