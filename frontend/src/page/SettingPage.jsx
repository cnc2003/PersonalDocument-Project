import { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import "./Setting.css";
import SetEmail from "../component/setting.jsx/SetEmail";
import SetUsername from "../component/setting.jsx/SetUsername";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("");
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
    loadUserInfo()
  }

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
                    {/* {userInfo.username || "No username"} */}
                    Change your preffered username here.
                  </span>
                </div>
                {/* <button className="setbtn" onClick={() => setActiveTab("")}>
                  Change name
                </button> */}
              </div>
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
                {activeTab === "username" && (
                  <SetUsername username={userInfo.username} onClose={handleCloseMenu} />
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
