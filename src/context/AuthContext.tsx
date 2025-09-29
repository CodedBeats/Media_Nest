// dependencies
import { onAuthStateChanged, signOut, type User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
// firebase config
import { auth } from "../api/firebase/firebaseConfig";
// interface
import { type AuthContextType } from "../utility/interfaces";


const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // state
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // register, login, logout
    const signup = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{ user, loading, signup, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
