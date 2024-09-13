

function Navbar() {
    return (

        <nav className=" navbar navbar-dark bg-primary navbar-expand-lg ">

            <div className=" container ">

                <button className="navbar-toggler border " type="button" data-bs-toggle="collapse" data-bs-target="#navbar_main">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className=" collapse navbar-collapse " id="navbar_main">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item dropdown">
                            <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">HOME</a>
                            <ul className="dropdown-menu">
                                <li><a href="#" className="dropdown-item">Kategori 1</a></li>
                                <li><a href="#" className="dropdown-item">Kategori 2</a></li>
                                <li><a href="#" className="dropdown-item">Kategori 3</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">SHOP</a>
                            <ul className="dropdown-menu">
                                <li><a href="#" className="dropdown-item">Kategori 1</a></li>
                                <li><a href="#" className="dropdown-item">Kategori 2</a></li>
                                <li><a href="#" className="dropdown-item">Kategori 3</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">BLOGS</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">CONTACT</a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>



    )
}

export default Navbar