import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (checked == false) {
      message.error("Please check the box to save your information.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("user", JSON.stringify(data));
        message.success("Login Successful.");

        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        message.error("Login failed.");
      }
      console.log(response);
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3 className="card-title fs-1 bg-primary p-2 text-light rounded">
        LOGIN
      </h3>
      <div className="mb-3">
        <label className="form-label fs-3">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={handleInputChange}
          required
          autoComplete="off"
        />
        <div id="emailHelp" className="form-text">
          Please do not share your email address with anyone.
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label fs-3">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={handleInputChange}
          required
          autoComplete="off"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={() => setChecked(!checked)}
        />
        <label className="form-check-label fw-bold">Check me out.</label>
      </div>
      <button type="submit" className="btn btn-primary text-light">
        Login
      </button>
    </form>
  );
}

export default Login;
