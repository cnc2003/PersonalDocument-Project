import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";

function App() {
  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          user: "alice@example.com",
          password: "password123",
        },
        {
          withCredentials: true, // Include credentials (cookies, etc.)
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  login();
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello Document miner!!!</h1>
      <Link to={`signin`} className="btn">
        {" "}
        singin{" "}
      </Link>
    </>
  );
}

export default App;
