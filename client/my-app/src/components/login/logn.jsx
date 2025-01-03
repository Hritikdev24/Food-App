import { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { Contextstore } from "../../context/contextStore";
import { toast } from "react-toastify";

export function Login({ action, display }) {
  const [isState, setState] = useState("sign up");
  const { url, setToken } = useContext(Contextstore);
  const [data, setData] = useState({ email: "", password: "", name: "" });
  const [agree, setAgree] = useState(false);

  // Update form data
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form data
  const resetForm = () => {
    setData({ email: "", password: "", name: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      return toast.error("Please accept the Terms & Conditions");
    }

    if (!data.email || !data.password || (isState === "sign up" && !data.name)) {
      return toast.error("All fields are compulsory");
    }

    const endpoint = isState === "sign up" ? "/user/register" : "/user/login";
    try {
      const res = await axios.post(`${url}${endpoint}`, data, {
        headers: { "content-type": "application/json" },
      });

      if (res.status === 200) {
        toast.success(`${isState} successful`);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        action(false);
     
        resetForm();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login">
      <form className={`form ${display}`}>
        <h1 className="d-flex justify-content-between form-title">
          {isState}
          <i className="bi bi-x-lg" onClick={() => action(false)}></i>
        </h1>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <div>
            <input
              type="email"
              autoFocus
              className="form-control rounded-0 p-2 fs-4"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={data.email}
            />
          </div>
        </div>

        {/* Name Field (only for Sign Up) */}
        {isState === "sign up" && (
          <div>
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <div>
              <input
                type="text"
                className="form-control rounded-0 p-2 fs-4"
                placeholder="Name"
                name="name"
                required
                onChange={handleChange}
                value={data.name}
              />
            </div>
          </div>
        )}

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <div>
            <input
              type="password"
              className="form-control rounded-0 p-2 fs-4"
              placeholder="Password"
              name="password"
              id="password"
              required
              value={data.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="input-group mt-4 form-btn">
          <button
            className="btn btn-primary rounded-0"
            onClick={handleSubmit}
          >
            {isState === "sign up" ? "Create Account" : "Login"}
          </button>
          <button
            className="btn btn-warning rounded-0"
            type="reset"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>

        {/* Terms and Conditions */}
        <div className="p-2 form-switch">
          <input
            type="checkbox"
            className="form-check-input ms-1 fs-3"
            checked={agree}
            onChange={() => setAgree(prev=> !prev)}
          />
          <p className="fs-4 mt-3 ms-1 text-light">
            By signing up, you agree to our Terms and Conditions and Privacy Policy.
          </p>
        </div>

        {/* Switch Between Login and Sign Up */}
        <div className="fs-4 ms-1 fw-bold">
          {isState === "sign up" ? (
            <p>
              Already have an account?{" "}
              <span className="text-info" onClick={() => setState("login")}>
                Click here
              </span>
            </p>
          ) : (
            <p>
              New user?{" "}
              <span className="text-info" onClick={() => setState("sign up")}>
                Sign up here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
