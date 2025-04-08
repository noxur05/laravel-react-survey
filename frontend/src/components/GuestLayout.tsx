import { Link, Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div className="grid">
            <Link to="/guest/login">To Login</Link>
            <Link to="/guest/signup">To SIgnUp</Link>
            <Outlet/>
        </div>
    )
}