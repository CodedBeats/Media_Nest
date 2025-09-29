// dependencies
import { useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
// context
import { useAuth } from "../hooks/useFirebaseAuth";

const Login = () => {
    // navigate
    const navigate = useNavigate();
    // context
    const { loading, login } = useAuth();
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            
            await login(email, password);
            // redirect
            navigate("/");
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center w-full max-w-sm space-y-3"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default Login;