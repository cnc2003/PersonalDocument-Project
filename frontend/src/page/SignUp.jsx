import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import FloatingEmojis from "../component/FloatingEmojis";
import { JwtDecode } from "../util/util";
export default function SignUp() {
  const [credential, setCredential] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const [inputCriteria, setInputCriteria] = useState({
    user: false,
    email: false,
  });

  function checkInputCriteria() {
    console.log(credential)
    
    setInputCriteria({
      user: credential.user.length > 0,
      email: credential.email.length > 0,
    });
  }

  function checkPasswordCriteria(password) {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  }

  async function handleSignUp(event) {
    event.preventDefault();
    if (credential.password !== credential.confirmPassword) {
      setAlert("😖 Passwords do not match");
      setTimeout(() => {
        setAlert("");
      }, 5000);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        {
          name: credential.user,
          username: credential.user,
          email: credential.email,
          password: credential.password,
        },
        {
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
      const username = localStorage.getItem("username");
      return navigate(`/${username}/document`);
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
    if (name === "user" || name === "email") {
      checkInputCriteria(value);
      console.log(inputCriteria);
    }
    if (name === "password") {
      checkPasswordCriteria(value);
    }
  }
  // useEffect(() => {console.log(inputCriteria, passwordCriteria);
  // }, [inputCriteria, passwordCriteria]);
  return (
    <>
    <FloatingEmojis />
    <div className="fixed inset-0 grid place-content-center z-10">
      <div className="bg-white shadow-md rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        {alert && <div className="alert text-red-500 mb-4">{alert}</div>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-semibold">
              Username
            </label>
            <input
              type="text"
              name="user"
              placeholder="Username"
              value={credential.user}
              onChange={handleChange}
              className="input border rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              value={credential.email}
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
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={credential.confirmPassword}
              onChange={handleChange}
              className="input border rounded-lg p-2 w-full"
            />
          </div>
          <div className="password-checklist text-left bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-semibold mb-2">Password must contain:</p>
            <ul className="list-disc list-inside">
              <li
                className={
                  passwordCriteria.length ? "text-green-500" : "text-red-500"
                }
              >
                At least 8 characters
              </li>
              <li
                className={
                  passwordCriteria.uppercase ? "text-green-500" : "text-red-500"
                }
              >
                At least one uppercase letter
              </li>
              <li
                className={
                  passwordCriteria.number ? "text-green-500" : "text-red-500"
                }
              >
                At least one number
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="btn bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-300 disabled:bg-gray-300"
            disabled={
              inputCriteria.user &&
              inputCriteria.email &&
              passwordCriteria.length &&
              passwordCriteria.uppercase &&
              passwordCriteria.number 
                ? false
                : true
            }
          >
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account?</span>
          <Link to="/signin" className="text-blue-500 hover:underline ml-2">
            Sign In!
          </Link>
        </div>
      </div>
    </div>
    
    </>
  );
}
