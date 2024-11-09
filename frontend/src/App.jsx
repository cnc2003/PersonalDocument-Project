import "./App.css";
import { Link } from "react-router-dom";
import FloatingEmojis from "./component/FloatingEmojis";

function App() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-[#F9F6EE] flex gap-10 justify-center items-center flex-col sm:flex-row">
        <div className="text-center sm:text-start">
          <div className="text-6xl font-bold mb-4">
            Take your time <br/> with your documents
          </div>
          <div className="text-xl font-medium mb-6">
            Write Note Plan Documentation.
          </div>
          <Link to={`signin`} className="">
            <button className="px-2 py-1 font-medium text-lg rounded-md border border-1  hover:bg-orange-200 transition duration-300 ease-out">
              Get Started
            </button>
          </Link>
        </div>
        <div>
          <img src="icon/brain.svg" className="size-60 hover:rotate-12 transition duration-300 cursor-progress cursor- [url(/public/buld.svg),_pointer]" />
        </div>
      </div>
      <footer className="w-[100%] text-center fixed bottom-0 left-0 mb-2 text-amber-950">
        <a href="https://github.com/cnc2003/PersonalDocument-Project"><p>&copy; {new Date().getFullYear()} cnc2003</p></a>
      </footer>
      {/* <FloatingEmojis /> */}
    </>
  );
}

export default App;
