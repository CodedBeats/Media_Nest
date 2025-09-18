// dependencies

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Login</h1>
            <form className="flex flex-col items-center justify-center w-full">
                <input type="text" placeholder="Username" className="px-6 py-2 bg-gray-200 text-gray-800 rounded w-full" />
                <input type="password" placeholder="Password" className="px-6 py-2 bg-gray-200 text-gray-800 rounded w-full" />
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;