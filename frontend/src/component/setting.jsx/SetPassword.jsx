import { useState } from "react";
import axios from "axios";

const SetPassword = ({ onClose }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [password, setNewPassword] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...password, [name]: value });
    if (name === "new_password") checkPasswordCriteria(value);
  };

  function checkPasswordCriteria(password) {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  }

  const updatePassword = async () => {
    if (password.new_password !== password.confirm_password) {
      setAlertMessage("Passwords do not match");
      return;
    }
    if (
      !passwordCriteria.length ||
      !passwordCriteria.uppercase ||
      !passwordCriteria.number
    ) {
      setAlertMessage("Password does not meet criteria");
      return;
    }
    try {
      const payload = { password: password.password, new_password: password.new_password };
      const response = await axios.patch(
        `http://localhost:8080/users`,
        { ...payload },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        alert("Password updated successfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setAlertMessage(error.response.data.error);
      } else {
        setAlertMessage("An error occurred");
      }
    }
  };

  return (
    <div className="w-[460px] p-8 rounded-xl bg-white text-neutral-800 flex flex-col font-medium">
      <div className="font-semibold">
        Change password
        <p className="text-sm text-neutral-500">
          Use a password at least 8 characters long with both at least 1
          uppercase letters and numbers.
        </p>
      </div>
      {alertMessage && (
        <div className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 mt-2 rounded text-center">
          🙅‍♂️ {alertMessage}
        </div>
      )}
      <div className="my-3 text-sm">Enter your current password</div>
      <input
        type="password"
        placeholder="Current password"
        name="password"
        value={password.password}
        onChange={handleChange}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1 "
      />
      <div className="my-3 text-sm">Enter a new password</div>
      <input
        type="password"
        placeholder="New password"
        name="new_password"
        value={password.new_password}
        onChange={handleChange}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1 "
      />
      <div className="my-3 text-sm">Confirm your new password</div>
      <input
        type="password"
        placeholder="Confirm password"
        name="confirm_password"
        value={password.confirm_password}
        onChange={handleChange}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1 "
      />
      <button
        className="setbtn mt-[14px] bg-blue-400 hover:bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-slate-600"
        onClick={updatePassword}
      >
        Save
      </button>
    </div>
  );
};

export default SetPassword;
