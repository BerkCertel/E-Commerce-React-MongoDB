import Login from "./Login";
import Register from "./Register";

function Auth() {
  return (
    <div className="container ">
      <div className="card mt-2">
        <div className="card-body ">
          <div className="row flex-wrap">
            <div className="col-lg-6 ">
              <Login />
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0 ">
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
