import "./App.css";
import { Link } from "react-router-dom";
import FloatingEmojis from "./component/FloatingEmojis";

function App() {
  return (
    <>
      <div className="fixed inset-0 grid place-content-center z-10">
        <div className="flex">
          <div>
            <div className="text-6xl font-bold">
              Take your time <br /> with your documents
            </div>
            <Link to={`signin`} className="">
              singin
            </Link>
          </div>
        </div>
      </div>

      {/* <FloatingEmojis /> */}
    </>
  );
}

export default App;
