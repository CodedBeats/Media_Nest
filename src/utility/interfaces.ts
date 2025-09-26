// dependencies
import { type User } from "firebase/auth";


export interface MangaItem {
    id?: string;
    title: string;
    author: string;
    imgUrl: string;
    progress: string;
    rating: number;
    status: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
