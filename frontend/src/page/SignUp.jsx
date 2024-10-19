import { Link } from "react-router-dom";


export default function SignUp() {
    return (
        <>
        <div className="fixed inset-0 grid place-content-center">
        <div className="bg-slate-100 rounded-xl flex flex-col p-3 h-auto gap-2">
            <h1 class="w-full text-center">Let's start your journal</h1>
            <span>Username</span>
            <input type="text" placeholder="username"/>
            <span>Email</span>
            <input type="email" placeholder="example.com"/>
            <span>Password</span>
            <input type="password" placeholder="password" />
            <span>Confirm password</span>
            <input type="password" placeholder="password" />
            <button className="btn border rounded-lg"> Sign up </button>
        </div>
    </div>
        </>
    )
}