// dependencies
import { type User } from "firebase/auth";


// MANGA
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


// SERIES
export interface SeriesItem {
    id?: string;
    tvMazeID: number;
    title: string;
    imgUrl: string;
    seriesEpisodeDetails: Array<{
        seasonNum: number;
        episodeNum: number;
        episodeName: string;
    }>;
    status: string;
    progress: string;
    rating: number;
}



// MOVIES
export interface MovieItem {
    id?: string;
    title: string;
    imgUrl: string;
    year: number;
    director: string;
    status: string;
    rating: number;
}



// firebase auth context
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
