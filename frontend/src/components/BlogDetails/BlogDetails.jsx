import Reviews from "../ProductDetails/Reviews/Reviews"


function BlogDetails() {
    return (
        <section className="blog-details-div">
            <div className="container">
                <div className="row mt-4 d-flex flex-column justify-content-center align-items-center">

                    <div className="col-8">
                        <img src="/img/blogs/blog4.jpg" className=" w-100 h-100 rounded shadow" alt="" />
                    </div>

                    <div className="blog-details-text-div col-4 w-100 h-100 mt-2">
                        <div className="blog-details-span-div mb-3 mt-3 d-flex justify-content-center aling-item-center gap-2 w-100">
                            <a href="" className="text-danger fw-bold">COLLECTION</a>
                            <span className="divider bg-primary"></span>
                            <a href="" className="text-dark" style={{ fontSize: "15px" }}>April 25, 2022</a>
                            <span className="divider bg-primary"></span>
                            <a href="" className="text-dark fw-bold">products,coats</a>
                        </div>

                        <div className="blogs-details-text border-top">
                            <h2 className="fw-bold text-capitalize mt-2">The Best Products That Shape Fashion</h2>
                            <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error sed animi cumque atque, quidem ratione sunt exercitationem optio tenetur earum fuga at fugit. Ratione quos quod asperiores quas exercitationem iusto reprehenderit ad atque fugit velit doloremque ex aperiam dolore suscipit quia, tenetur aliquam sapiente! Voluptatibus provident asperiores expedita non tempora itaque facilis dolor, porro dolores sed nulla dignissimos perferendis debitis delectus ipsa libero deserunt numquam tempore quae repudiandae consectetur est in iste! Quia expedita delectus eius assumenda obcaecati, natus non esse? Dicta eaque, ratione doloribus est enim quibusdam officia hic facilis eos quod quae suscipit, cum eius cumque asperiores adipisci. Neque, eos! Modi ipsa, quas ad, sequi totam fugiat necessitatibus expedita voluptatem velit incidunt officia error ipsam nemo numquam facilis at debitis provident ipsum! Tempora maiores ut, nemo vitae quis alias deserunt placeat quam cum, est accusamus quaerat quo, consequatur laborum veniam corporis et itaque! Architecto omnis corporis repudiandae enim.</p>

                            <p className=" border-start border-5 border-primary p-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam, cum et. Magni nesciunt sequi fuga beatae porro incidunt illo voluptatibus?</p>

                            <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error sed animi cumque atque, quidem ratione sunt exercitationem optio tenetur earum fuga at fugit. Ratione quos quod asperiores quas exercitationem iusto reprehenderit ad atque fugit velit doloremque ex aperiam dolore suscipit quia, tenetur aliquam sapiente! Voluptatibus provident asperiores expedita non tempora itaque facilis dolor, porro dolores sed nulla dignissimos perferendis debitis delectus ipsa libero deserunt numquam tempore quae repudiandae consectetur est in iste! Quia expedita delectus eius assumenda obcaecati, natus non esse? Dicta eaque, ratione doloribus est enim quibusdam officia hic facilis eos quod quae suscipit, cum eius cumque asperiores adipisci. Neque, eos! Modi ipsa, quas ad, sequi totam fugiat necessitatibus expedita voluptatem velit incidunt officia error ipsam nemo numquam facilis at debitis provident ipsum! Tempora maiores ut, nemo vitae quis alias deserunt placeat quam cum, est accusamus quaerat quo, consequatur laborum veniam corporis et itaque! Architecto omnis corporis repudiandae enim.</p>

                        </div>
                    </div>
                </div>
                <Reviews />
            </div>
        </section>
    )
}

export default BlogDetails