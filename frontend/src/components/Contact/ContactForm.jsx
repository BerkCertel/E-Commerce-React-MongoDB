

function ContactForm() {
    return (

        <form>
            <div className="mb-3">
                <div className="row">
                    <div className="col-6">
                        <label className="form-label fw-bold">Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-6">
                        <label className="form-label fw-bold">Last Name</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Subject</label>
                <p className="form-text">Title of the topic you want us to help with.</p>
                <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Your Message</label>
                <p className="form-text">Please give a brief summary of the topic you would like us to help with.</p>
                <textarea className="form-control" rows="4"></textarea>
            </div>

            <div className="text-center">
                <div className="form-group form-check d-flex justify-content-center">
                    <input type="checkbox" className="form-check-input me-2" />
                    <label className="form-check-label fw-bold">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary mt-2 text-light">Send Message</button>
            </div>
        </form>




    )
}

export default ContactForm