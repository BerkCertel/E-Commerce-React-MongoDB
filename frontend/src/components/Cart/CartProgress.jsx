function CartProgress() {
  return (
    <div className=" border p-3 mb-4">
      <p className="text-start" style={{ fontSize: "12px" }}>
        Add <span className="text-danger fw-bold">$161.00</span> to cart and get
        free shipping!
      </p>
      <div
        className="progress"
        role="progressbar"
        aria-label="Danger example"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className=" bg-danger" style={{ width: "45%" }}></div>
      </div>
    </div>
  );
}

export default CartProgress;
