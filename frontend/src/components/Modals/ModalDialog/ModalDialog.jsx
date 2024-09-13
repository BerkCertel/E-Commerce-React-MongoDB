import PropTypes from "prop-types";

function ModalDialog({ isDialogShow, setIsDialogShow }) {

    const handleCloseDialog = (event) => {
        const checked = event.target.checked
        localStorage.setItem("dialog", JSON.stringify(!checked))
    }

    return (
        <div className={`dialog-div ${isDialogShow ? "modal-show" : "modal-hidden"} `}>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsDialogShow(false)}></button>
                        </div>
                        <div className="modal-body row">
                            <div className="modal-img col-lg-6 d-flex justify-content-center align-items-center">
                                <img src="/img/modal-dialog.jpg" className="img-fluid" alt="Modal Image" />
                            </div>
                            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                <p className="fw-bold fs-2">NEWSLETTER</p>
                                <p className="text-muted">Sign up to our newsletter and get exclusive deals you won’t find anywhere else straight to your inbox!</p>
                                <input
                                    type="email"
                                    className="w-100 mt-3 p-2"
                                    placeholder="Enter Your Email Address Here"
                                    id="email-input"
                                    name="email"
                                    autoComplete="email"
                                />
                                <button className="btn btn-primary text-center text-light w-100 mt-3">SUBSCRIBE</button>
                                <div className="form-check mt-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="dialog-check"
                                        name="dialog-check"
                                        onChange={handleCloseDialog}
                                    />
                                    <label className="form-check-label" htmlFor="dialog-check">
                                        Don’t show this popup again
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ModalDialog.propTypes = {
    isDialogShow: PropTypes.bool,
    setIsDialogShow: PropTypes.func
}

export default ModalDialog;
