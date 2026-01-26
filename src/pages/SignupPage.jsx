import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { signupNewUser } = UserAuth();
  const navigate = useNavigate();

  function handleSignup(e) {
    console.log("Signup clicked");
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    setSuccessful(true);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-black">
      <div
        className="p-5 border border-primary text-white rounded min-h-50 min-w-25"
        style={{ backgroundColor: "gray" }}
      >
        <form
          className="d-flex flex-column h-100 justify-content-around"
          onSubmit={(e) => handleSignup(e)}
        >
          <div className="d-flex flex-column">
            <label htmlFor="email" className="mb-2">
              Email:
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="password" className="mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Sign Up
          </button>
        </form>
        {successful ? (
          <div>
            {" "}
            Signup was successful. Please check your email to confirm the
            account credentials
          </div>
        ) : (
          <div className="mt-3">
            Already have an account?
            <a href="/login" className="text-primary">
              Login here
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
