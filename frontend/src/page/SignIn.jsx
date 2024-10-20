import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { JwtDecode } from "../util/util";
import FloatingEmojis from "../component/FloatingEmojis";

export default function SignIn() {
  const [credential, setCredential] = useState({
    user: "",
    password: "",
  });
  const [alert, setAlert] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          ...credential,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.clear();
      localStorage.setItem("token", response.data.token);
      const data = await JwtDecode(response.data.token);
      for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
      }
      // Handle successful login
    } catch (error) {
      setAlert(error.response.data.error);
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCredential((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="fixed inset-0 grid place-content-center z-10">
        <div className="bg-white shadow-md rounded-2xl p-6 w-96">
          <h1 className="text-2xl font-bold text-center mb-4">Sign in</h1>
          {alert && <div className="alert text-red-500 mb-4">{alert}</div>}
          <form onSubmit={handleLogin} className="flex flex-col">
            <div className="mb-4">
              <label className="block text-gray-700 text-left font-semibold">
                Username or Email
              </label>
              <input
                type="text"
                name="user"
                placeholder="Username or Email"
                value={credential.user}
                onChange={handleChange}
                className="input border rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-left font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credential.password}
                onChange={handleChange}
                className="input border rounded-lg p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="btn bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Are you first time?</span>
            <Link to="/signup" className="text-blue-500 hover:underline ml-2">
              Sign Up!
            </Link>
          </div>
        </div>
      </div>
      <FloatingEmojis />
    </>
  );
}