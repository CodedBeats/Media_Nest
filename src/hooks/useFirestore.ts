// dependencies
import { useEffect, useState } from "react";
// api functions
import { fetchAllMangaItems, fetchMangaItemByID } from "../api/firebase/firestore";
import { getMangaCover } from "../api/mangadex/mangadex";
// utility
import { type MangaItem, type MangaItemWithCover } from "../utility/interfaces";

// custom hook to fetch manga item by id
export const useFecthMangaItem = (id: string) => {
    const [mediaItem, setMediaItem] = useState<MangaItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const mediaData = await fetchMangaItemByID(id);
            setMediaItem(mediaData);
        };
        fetchData();
    }, [id]);

    return mediaItem;
};

// custom hook to fetch all manga items, add coverUrl from mangadex api call if mangadexID is available
export const useFecthAllMangaItems = () => {
    // state
    const [mangaItems, setMangaItems] = useState<MangaItemWithCover[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    const fetchData = async () => {
        try {
            setLoading(true);
            // fetch all manga from firestore
            const data = await fetchAllMangaItems();

            // add cover img url to each manga item 
            const enrichedData = await Promise.all(
                data.map(async (manga) => {
                    // prioirty 1 - use existing coverUrl if available
                    if (manga.imgUrl) {
                        return { ...manga, coverUrl: manga.imgUrl };
                    }

                    // priority 2 - fetch from mangadex if mangadexId is available
                    if (manga.mangadexID) {
                        try {
                            const coverUrl = await getMangaCover(manga.mangadexID);
                            console.log("cover url fetched:", coverUrl);
                            return { ...manga, coverUrl };
                        } catch (err) {
                            console.error(`failed to fetch cover for manga ${manga.id}:`, err);
                            return { ...manga, coverUrl: "/fallback-cover.png" }; // return manga without imgUrl if fetch fails
                        }
                    }

                    // fallback
                    return { ...manga, coverUrl: "public/fallback-cover.png" };
                })
            );

            setMangaItems(enrichedData);

        } catch (err: string | unknown) {
            console.error(err);
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error(String(err)));
            }
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = async () => {
        await fetchData();
    };

    return {mangaItems, isLoading, error, refetch};
};
