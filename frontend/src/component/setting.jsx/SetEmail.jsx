import { useEffect, useState } from "react";

const SetEmail = (props) => {
  const { email } = props;
  const [newEmail, setNewEmail] = useState({
    newEmail: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setNewEmail({ ...newEmail, newEmail: email });
  };

  const handlePassword = async (e) => {
    const password = e.target.value;  
    setNewEmail({ ...newEmail, password: password });
  };

  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  });

  const saveEmail = async () => {
    if (newEmail.newEmail === "") {
      setInputError({ ...inputError, email: true });
    }
    if (newEmail.password === "") {
      setInputError({ ...inputError, password: true });
    }
    console.log(inputError);
  };

  useEffect(() => {console.table(newEmail)}, [newEmail]);
  return (
    <div className="w-[460px] p-8 rounded-xl bg-white text-neutral-800 flex flex-col font-medium">
      <div>
        Your current email is <span className="font-bold">{email}</span>
      </div>
      <div className="my-3">Enter new email</div>
      <input
        type="email"
        placeholder="New email"
        value={newEmail.password}
        onChange={handlePassword}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1 "
      />
      <div className="my-3">Enter your password.</div>
      <input
        type="password"
        placeholder="Password"
        value={newEmail.newEmail}
        onChange={handleEmailChange}
        className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1 "
      />
      <button
        className="setbtn mt-[14px] bg-blue-400 hover:bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-slate-600"
        onClick={saveEmail}
      >
        Save
      </button>
    </div>
  );
};
export default SetEmail;
