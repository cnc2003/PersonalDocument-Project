import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./page/SignIn.jsx";
import SignUp from "./page/SignUp.jsx";
import DocumentList from "./page/DocumentList.jsx";
import Playground from "./page/Playground.jsx";
import DocumentDetail from "./page/DocumentDetail.jsx";
import SettingPage from "./page/SettingPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/:username/document",
    element: <DocumentList />,
  },{
    path: "/:username/setting",
    element: <SettingPage />,
  },
  {
    path: "/:username/document/:documentId",
    element: <DocumentDetail />,
  },
  {
    path: "/playground",
    element: <Playground />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <RouterProvider router={router} />
   </StrictMode>,
);
