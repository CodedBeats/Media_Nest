// dependencies

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-20 py-5 bg-gray-800 w-full">
            <Link to="/">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Home
                </button>
            </Link>
            <Link to="/login">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Login
                </button>
            </Link>
        </div>
    );
};

export default Navbar;