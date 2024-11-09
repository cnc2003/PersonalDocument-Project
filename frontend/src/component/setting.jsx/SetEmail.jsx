import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const SetEmail = ({ email, onClose }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [newEmail, setNewEmail] = useState({
    new_email: "",
    password: "",
  });
  
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setNewEmail({ ...newEmail, new_email: email });
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setNewEmail({ ...newEmail, password: password });
  };

  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  });

  const loadNewData = (data) => {
    for (const key in data) {
      localStorage.setItem(`${key}`, data[key]);
    }
  };

  const saveEmail = async () => {
    if (newEmail.new_email === "") {
      setInputError({ ...inputError, email: true });
    }
    if (newEmail.password === "") {
      setInputError({ ...inputError, password: true });
    }
    if (newEmail.new_email !== "" && newEmail.password !== "") {
      try {
        const response = await axios.patch(
          `${BASE_URL}/users`,
          { ...newEmail },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        if (response && response.data) {
          loadNewData(response.data);
        }
        alert("Email updated successfully");
        onClose();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.error) {
          setAlertMessage(error.response.data.error);
        } else {
          setAlertMessage("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <div className="w-[460px] p-8 rounded-xl bg-white text-neutral-800 flex flex-col font-medium">
      <div>
        Your current email is <span className="font-bold">{email}</span>
      </div>
      {alertMessage && (
        <div className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 mt-2 rounded text-center">
          🙅‍♂️ {alertMessage}{" "}
        </div>
      )}
      <div className="my-3">Enter new email </div>
      <input
        type="email"
        placeholder="New email"
        value={newEmail.new_email}
        maxLength={50}
        onChange={handleEmailChange}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1 "
      />
      <div className="my-3">Enter your password </div>
      <input
        type="password"
        placeholder="Password"
        value={newEmail.password}
        maxLength={50}
        onChange={handlePassword}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1 "
      />
      <button
        className="setbtn mt-[14px] bg-blue-400 hover:bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-slate-200"
        onClick={saveEmail}
        disabled={newEmail.new_email === "" || newEmail.password === ""}
      >
        Save
      </button>
      
      
    </div>
  );
};

export default SetEmail;
