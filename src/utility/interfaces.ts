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

// === example ===
// const stats = {
//     title: "Better Call Saul",
//     thumbnailUrl: "URL to official poster or thumbnail image",
//     seriesEpisodeDetails: [
//         {
//             season: 1,
//             episode: 1,
//             title: "Uno",
//         },
//         {
//             season: 1,
//             episode: 2,
//             title: "Duo",
//         },
//     ],
//     status: "personal status - watching/completed",
//     progress: "if not completed status, 'S1 EP2 episodeTitle'",
//     rating: 10,
// }


export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
