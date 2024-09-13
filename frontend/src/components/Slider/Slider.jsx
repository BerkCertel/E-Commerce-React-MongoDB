import { useContext } from "react";
import { BaseContext } from "../../context/BaseProvider";

function Slider() {
    const { currentSlide, setCurrentSlide } = useContext(BaseContext);

    return (
        <section className='pt-3 slider'>
            <div className="container">
                <main className="card">
                    <div className="row p-lg-2 p-1">
                        <aside className="d-none d-lg-block col-lg-3">
                            <nav className="nav nav-pills flex-column flex-nowrap overflow-auto slider__nav">
                                <a href="#" className="nav-link">Elektronik</a>
                                <a href="#" className="nav-link">Moda</a>
                                <a href="#" className="nav-link">Kozmetik</a>
                                <a href="#" className="nav-link">Spor</a>
                                <a href="#" className="nav-link">Oyuncak</a>
                                <a href="#" className="nav-link">Ev Eşyaları</a>
                                <a href="#" className="nav-link">Bahçe</a>
                            </nav>
                        </aside>
                        <div className="col-lg-9">
                            <div id="slider" className='carousel slide' data-bs-ride="carousel" data-bs-interval="5000">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#slider" data-bs-slide-to="0" className={`bg-primary ${currentSlide === 0 ? "active" : ""}`} onClick={() => setCurrentSlide(0)}></button>
                                    <button type="button" data-bs-target="#slider" data-bs-slide-to="1" className={`bg-primary ${currentSlide === 1 ? "active" : ""}`} onClick={() => setCurrentSlide(1)} ></button>
                                    <button type="button" data-bs-target="#slider" data-bs-slide-to="2" className={`bg-primary ${currentSlide === 2 ? "active" : ""}`} onClick={() => setCurrentSlide(2)} ></button>
                                </div>
                                <div className="carousel-inner rounded">
                                    <div className="carousel-item active">
                                        <img src="/img/slider/slider1.jpg" alt="" className='d-block w-100' />
                                        <div className="card-img-overlay d-flex flex-column justify-content-start p-5">
                                            <h5 className="card-title fw-bold fs-6">SUMMER 2022</h5>
                                            <p className="card-text fs-1 fw-bold">Save up to 70%</p>
                                            <a href="#" className="btn btn-primary text-light mt-5 w-50">Explore Now</a>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/slider/slider2.jpg" alt="" className='d-block w-100' />
                                        <div className="card-img-overlay d-flex flex-column justify-content-start align-items-end p-5">
                                            <h5 className="card-title fw-bold fs-3 text-end">Discover our exclusive summer collection</h5>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/slider/slider3.jpg" alt="" className='d-block w-100 img-fluid' />
                                        <div className="card-img-overlay d-flex flex-column justify-content-center align-items-start p-5">
                                            <h5 className="card-title fw-bold fs-6 text-end">Unleash your summer spirit</h5>
                                            <p className="card-text fs-4 fw-bold mb-5">Experience the best of summer fashion</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type='button' data-bs-target="#slider" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon bg-primary"></span>
                                </button>
                                <button className="carousel-control-next" type='button' data-bs-target="#slider" data-bs-slide="next">
                                    <span className="carousel-control-next-icon bg-primary"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Slider;
