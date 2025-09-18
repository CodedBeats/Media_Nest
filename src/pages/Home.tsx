// dependencies
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Media Nest</h1>
            <p className="text-lg text-gray-600 mb-8">
                My hub for all things media. Explore, discover, and enjoy!
            </p>
            <div className="space-x-4 mb-8">
                <Link to="/manga">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Manga
                    </button>
                </Link>
                <Link to="/movies">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Movies
                    </button>
                </Link>
                <Link to="/series">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Series
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default Home;