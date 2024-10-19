import { Link } from "react-router-dom";

export default function SignIn() {
    return (
        <>
        <div className="fixed inset-0 grid place-content-center">
        <div className="bg-slate-100 rounded-xl flex flex-col p-3 h-auto gap-2">
            <h1 class="w-full text-center">LOGIN PLEASE</h1>
            <span>Username</span>
            <input type="text" placeholder="username"/>
            <span>Password</span>
            <input type="password" placeholder="password" />
            <button className="btn"> login </button>
            <button className="btn"> are you first time ? <Link to="/signup" className="hover:underline">Sign Up!</Link> </button>
        </div>
    </div>
        </>
    )
}