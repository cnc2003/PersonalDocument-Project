import "./App.css";
import { Link } from "react-router-dom";
import FloatingEmojis from "./component/FloatingEmojis";

function App() {
  return (
    <>
      <div className="fixed inset-0 grid place-content-center z-10">
        <h1 className="text-3xl font-bold underline">
          Hello Document miner!!!
        </h1>
        <Link to={`signin`} className="">
          singin
        </Link>
      </div>

      <FloatingEmojis />
    </>
  );
}

export default App;
