function BlogItem() {
  return (
    <div className="col-12 col-md-4 mb-3">
      <div className="card shadow">
        <img src="/img/blogs/blog4.jpg" className="card-img-top" alt="" />
        <div className="card-body text-center">
          <h6 className="card-subtitle mb-2 text-muted ">
            25 Feb, 2024 -0 Comments
          </h6>
          <h5 className="card-title fw-bold text-uppercase ">Blog Title</h5>
          <p className="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, a?
          </p>
          <a href="#" className="btn btn-primary text-light">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
