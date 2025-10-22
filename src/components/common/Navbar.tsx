// dependencies
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// context
import { useAuth } from "../../hooks/useFirebaseAuth";


const Navbar = () => {
    // context
    const { user, logout } = useAuth();

    // navigate
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="fixed flex items-center justify-between px-20 py-3 
            bg-gray-800/50 w-full backdrop-blur-md z-50"
        >
            <NavItem to="/" label="Media Nest" />
            {user ? (
                <button
                    onClick={handleLogout}
                    className="text-red-400 text-lg font-semibold border-b-2 border-solid border-transparent transition
                    hover:border-white hover:text-white"
                >
                    Logout
                </button>
            ) : (
                <NavItem to="/login" label="Admin Login" />
            )}
        </div>
    );
};

const NavItem = ({ to, label }: { to: string; label: string }) => (
    <Link
        to={to}
        className="text-blue-400 text-lg font-semibold border-b-2 border-solid border-transparent transition
        hover:border-white hover:text-white"
    >
        {label}
    </Link>
);

export default Navbar;
