import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // const { password, ...rest } = data;

        localStorage.setItem("user", JSON.stringify(data));

        message.success("Registration Successful.");

        navigate("/");
      } else {
        message.error("Registration failedz.");
      }
      console.log(response);
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <form onSubmit={handleRegister} autoComplete="off">
      <h3 className="card-title fs-1 bg-primary p-2 text-light rounded">
        REGISTER
      </h3>
      <div className=" row  mt-3">
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={handleInputChange}
              required
              name="username"
            />
            <label>Name</label>
          </div>
        </div>
        {/* <div className="col">
          <div className="form-floating mb-3">
            <input type="text" className="form-control" placeholder="name" />
            <label>Last Name</label>
          </div>
        </div> */}
      </div>
      <div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={handleInputChange}
            required
            name="email"
          />
          <label>Email address</label>
        </div>
        {/* <div id="emailHelp" className="form-text mb-3">
          Please do not share your email address with anyone
        </div> */}
      </div>
      <div className="mb-3 row  ">
        <div className="col">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              autoComplete="off"
              onChange={handleInputChange}
              required
              name="password"
            />
            <label>Password</label>
          </div>
        </div>
      </div>

      {/* <div className="form-floating mt-2 mb-3">
        <textarea
          className="form-control"
          id="floatingTextarea2"
          style={{ height: "100px" }}
        ></textarea>
        <label>Adress</label>
      </div> */}
      <button type="submit" className="btn btn-primary text-light">
        Register
      </button>
    </form>
  );
}

export default Register;
