import axios from "axios";
import { useState } from "react";

const ConfirmDelete = ({ onClose }) => {
  const email = localStorage.getItem("email");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      alert("Your account has been deleted.");
      navigate("/"); // Refresh the page to show the updated image
    } catch (error) {
      setAlertMessage(error.response.data.error);
    }
  };
  return (
    <div className="w-[460px] p-8 rounded-xl bg-white text-neutral-800 flex flex-col font-medium justify-center text-center">
      <img
        src="/public/big_alert.svg"
        alt=""
        className="size-14 mx-auto mb-4"
      />
      <div className="text-red-600">
        Delete <span className="font-bold">{email}</span> account
      </div>
      <p className="text-sm text-neutral-600 text-center">
        This action cannot be undone. This will permanently delete your entire
        account. All document will be deleted.
      </p>
      {alertMessage && (
        <div className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 mt-2 rounded text-center">
          🙅‍♂️ {alertMessage}
        </div>
      )}
      <div className="my-3 text-start">Enter your password.</div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        maxLength={50}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-red-400 pl-1 py-1 "
      />
      <button
        className="setbtn mt-[14px] bg-red-400 hover:bg-red-500 text-white disabled:bg-red-200 disabled:cursor-not-allowed"
        disabled={!password.length}
        onClick={handleDeleteUser}
      >
        I want to delet my account
      </button>
    </div>
  );
};
export default ConfirmDelete;
