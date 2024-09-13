
function NotFoundPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(62vh )' }}>
      <div className="text-center">
        <p className="display-1 fw-bold text-dark">404</p>
        <p className="h2 text-muted">Not Found</p>
        <a href="/" className="btn btn-primary mt-3 text-light">Go to Home</a>
      </div>
    </div>
  );
}

export default NotFoundPage;
