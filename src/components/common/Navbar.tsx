// dependencies

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-20 py-3 bg-gray-800 w-full">
            <NavItem to="/" label="Media Nest" />
            <NavItem to="/login" label="Admin Login" />
        </div>
    );
};

const NavItem = ({ to, label }: { to: string; label: string }) => (
    <Link
        to={to}
        className="text-blue-400 text-lg font-semibold border-b-2 border-solid border-gray-800 transition
        hover:border-white hover:text-white"
    >
        {label}
    </Link>
);

export default Navbar;
