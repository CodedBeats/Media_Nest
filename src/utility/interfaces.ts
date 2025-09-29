// dependencies
import { type User } from "firebase/auth";


export interface MangaItem {
    id?: string;
    mangadexID?: string;
    imgUrl?: string; // firebase optional
    title: string;
    author: string;
    progress: string;
    rating: number;
    status: string;
}
// Manga item with guaranteed coverUrl
export type MangaItemWithCover = MangaItem & { 
    coverUrl: string 
};

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
