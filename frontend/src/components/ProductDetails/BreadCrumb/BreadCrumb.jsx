import { useState } from "react"


function BreadCrumb() {

    const [isHomeHovered, setIsHomeHovered] = useState(false);
    const [isVrHovered, setIsVrHovered] = useState(false);
    const [isPrHovered, setIsPantsHovered] = useState(false);


    return (
        <nav
            aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" ><a href="#" className={`capitalize-each-word ${isHomeHovered ? "text-decoration-underline" : ""}`}
                    onMouseEnter={() => setIsHomeHovered(true)}
                    onMouseLeave={() => setIsHomeHovered(false)}>home</a></li>

                <li className="breadcrumb-item " ><a href="#" className={`capitalize-each-word ${isVrHovered ? "text-decoration-underline" : ""}`}
                    onMouseEnter={() => setIsVrHovered(true)}
                    onMouseLeave={() => setIsVrHovered(false)}>man</a></li>

                <li className="breadcrumb-item" ><a href="#" className={`capitalize-each-word ${isPrHovered ? "text-decoration-underline" : ""}`}
                    onMouseEnter={() => setIsPantsHovered(true)}
                    onMouseLeave={() => setIsPantsHovered(false)}>panths</a></li>

                <li className="breadcrumb-item text-capitalize" aria-current="page">Basic Colored Sweatpants With elastic Hems</li>
            </ol>
        </nav>
    )
}

export default BreadCrumb