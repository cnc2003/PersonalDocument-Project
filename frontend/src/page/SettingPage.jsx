import { useState } from "react";
import NavBar from "../component/NavBar";
import axios from "axios";
import { DnaIcon, UserIcon } from "lucide-react";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImage] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    const passwordPolicy =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
    if (!passwordPolicy.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleProfileImageChange = (e) => {
    const url = e.target.value;
    setProfileImage(url);
    validateImageUrl(url);
  };

  const validateImageUrl = (url) => {
    const imageUrlPattern = /\.(jpeg|jpg|gif|png)(\?.*)?$/i;
    if (!imageUrlPattern.test(url)) {
      setIsValidUrl(false);
      return;
    }

    const img = new Image();
    img.onload = () => setIsValidUrl(true);
    img.onerror = () => setIsValidUrl(false);
    img.src = url;
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/users`,
        {
          username,
          email,
          password: password ? password : undefined,
          profileImageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      alert("Settings updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    }
  };

  console.log(activeTab);
  

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
                Let's customize your settings.
              </p>

              <div className="inline-flex rounded-md w-fit" role="group">
                <button
                  type="button"
                  className={`inline-flex gap-1 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border rounded-lg hover:bg-amber-600 hover:text-white focus:z-10  ${
                    activeTab == "general" ? "bg-amber-300 text-orange-700" : "bg-gray-300"
                  }`}
                  onClick={() => handleTabChange("general")}
                >
                  <DnaIcon />
                  General
                </button>
                <button
                  type="button"
                  className={`inline-flex gap-1 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border rounded-e-lg hover:bg-amber-600 hover:text-white focus:z-10   ${
                    activeTab == "account" ? "bg-amber-300 text-orange-700" : "bg-gray-300"
                  }`}
                  onClick={() => handleTabChange("account")}
                >
                  <UserIcon />
                  Account
                </button>
              </div>
              {activeTab === "general" && (
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 font-semibold">
                      Profile Image URL
                    </label>
                    <input
                      type="text"
                      value={profileImageUrl}
                      onChange={handleProfileImageChange}
                      className={`bg-neutral-300 px-4 py-2 rounded-md text-neutral-600 font-semibold ${
                        isValidUrl ? "" : "border-red-500"
                      }`}
                    />
                    {!isValidUrl && (
                      <span className="text-red-500">Invalid image URL</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 font-semibold">
                      Preferred Name
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-neutral-300 px-4 py-2 rounded-md text-neutral-600 font-semibold"
                    />
                  </div>
                </div>
              )}
              {activeTab === "account" && (
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-neutral-300 px-4 py-2 rounded-md text-neutral-600 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 font-semibold">
                      Changing Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="bg-neutral-300 px-4 py-2 rounded-md text-neutral-600 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-600 font-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-neutral-300 px-4 py-2 rounded-md text-neutral-600 font-semibold"
                    />
                  </div>
                  <div className="password-checklist text-left bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="font-semibold mb-2">Password must contain:</p>
                    <ul className="list-disc list-inside">
                      <li
                        className={
                          passwordCriteria.length
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        At least 8 characters
                      </li>
                      <li
                        className={
                          passwordCriteria.uppercase
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        At least one uppercase letter
                      </li>
                      <li
                        className={
                          passwordCriteria.number
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        At least one number
                      </li>
                      <li
                        className={
                          password === confirmPassword && ( password || confirmPassword ) && passwordCriteria.length && passwordCriteria.uppercase && passwordCriteria.number 
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        Password must match
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <button
                className="mt-4 px-2 py-1 w-fit bg-blue-300 hover:bg-blue-400 rounded-md"
                onClick={handleSave}
                disabled={
                  (activeTab === "account" &&
                  (password !== confirmPassword ||
                    !passwordCriteria.length ||
                    !passwordCriteria.uppercase ||
                    !passwordCriteria.number)) ||
                  (activeTab === "general" && !isValidUrl)
                }
              >
                Save
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingPage;
