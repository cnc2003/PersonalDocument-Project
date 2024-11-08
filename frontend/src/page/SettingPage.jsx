import { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import "./Setting.css";
import SetEmail from "../component/setting.jsx/SetEmail";
import SetPassword from "../component/setting.jsx/SetPassword";
import axios from "axios";
import ConfirmDelete from "../component/setting.jsx/ConfirmDelete";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [alertMessage, setAlertMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  const loadUserInfo = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
    }));
  };

  function handleCloseMenu() {
    setActiveTab("");
    loadUserInfo();
  }

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUserInfo({ ...userInfo, username: username });
  };

  const updateUsername = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/users`,
        { username: userInfo.username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setUsername(response.data.username);
      setUserInfo({ ...userInfo, username: "" });
      alert("Username updated successfully");
    } catch (error) {
      // setAlertMessage(error.response.data.error);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <div className="sticky">
      <span className="bg-[#FAFAFA] w-screen h-screen fixed -z-10"></span>
      <div className="flex flex-row">
        <aside className="sticky">
          <NavBar />
        </aside>
        <section className="h-screen w-full overflow-y-scroll pb-8 overflow-hidden">
          <div className="flex flex-col md:mx-[8rem] mx-[3rem] flex-nowrap">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold pt-[10rem]">Settings</h1>
              <p className="text-neutral-500 italic">
                Manage your account settings.
              </p>
            </div>

            <div className="pt-4 flex flex-col">
              <div className="border-b-[1px] pb-3 mb-4 font-bold text-lg">
                My profile
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="font-semibold">Username</span>
                  <span className="text-sm text-gray-500">
                    {username || "No username"}
                    {/* Change your preffered username here. */}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="username"
                    defaultValue={username}
                    maxLength={50}
                    onChange={handleUsernameChange}
                    className="w-full rounded-md border border-neutral-400 focus:outline-2 focus:outline-blue-400 pl-1 py-1"
                  />
                  <button
                    className="setbtn bg-green-300 hover:bg-green-400 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                    disabled={!userInfo.username.length}
                    onClick={updateUsername}
                  >
                    save
                  </button>
                </div>
              </div>
              {alertMessage && (
                <div className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 mb-2 rounded text-center ml-auto">
                  🙅‍♂️ {alertMessage}
                </div>
              )}
              <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="font-semibold">Email</span>
                  <span className="text-sm text-gray-500">
                    {userInfo.email || "No email"}
                  </span>
                </div>
                <button
                  className="setbtn"
                  onClick={() => setActiveTab("email")}
                >
                  Change email
                </button>
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="font-semibold">Password</span>
                  <span className="text-sm text-gray-500">
                    Change your password security here.
                  </span>
                </div>
                <button
                  className="setbtn"
                  onClick={() => setActiveTab("password")}
                >
                  Change password
                </button>
              </div>
            </div>

            <div className="pt-4 flex flex-col">
              <div className="border-b-[1px] pb-3 mb-4 font-bold text-lg">
                Sensitive settings
              </div>

              <div className="flex flex-row items-center justify-between mb-4 text-red-600">
                <div className="flex flex-col">
                  <span className="font-semibold">Delete Account</span>
                  <span className="text-sm ">
                    Delete your account permanently.
                  </span>
                </div>
                <button
                  className="setbtn bg-red-300 hover:bg-red-400"
                  onClick={() => setActiveTab("delete_account")}
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </section>

        {activeTab && (
          <section className="">
            <div className="fixed inset-0 grid place-content-center ">
              <span
                className="w-screen h-screen bg-neutral-600 bg-opacity-60 fixed"
                onClick={() => setActiveTab("")}
              />
              <div className="z-10">
                {activeTab === "email" && (
                  <SetEmail email={userInfo.email} onClose={handleCloseMenu} />
                )}
                {activeTab === "password" && (
                  <SetPassword onClose={handleCloseMenu} />
                )}
                {activeTab === "delete_account" && (
                  <ConfirmDelete onClose={handleCloseMenu} />
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
