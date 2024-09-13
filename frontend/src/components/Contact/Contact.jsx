import ContactAdress from "./ContactAdress";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

function Contact() {
    return (
        <section>
            <div className="container mt-2 p-4">
                <div className="row flex-wrap ">
                    <div className="col-lg-6 d-flex flex-column ">

                        <ContactMap />

                        <div className="card flex-grow-1">
                            <div className="card-body d-flex flex-column text-center">

                                <ContactAdress />

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mt-3 mt-lg-0">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="card-title">
                                    <span className="text-danger">Contact With Us</span>
                                    <p className="fs-2 fw-bold">Get In Touch</p>
                                    <p>In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia, in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium lobortis metus. Vivamus consectetur consequat justo.</p>
                                </div>

                                <ContactForm />


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Contact;
