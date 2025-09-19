import { useEffect, useState } from "react";
import {
    fetchAllMangaItems,
    fetchMangaItemByID,
} from "../api/firebase/firestore";
import { type MangaItem } from "../utility/interfaces";

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

// custom hook to fetch all manga items
export const useFecthAllMangaItems = () => {
    const [mangaItems, setMangaItems] = useState<MangaItem[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchAllMangaItems();
            setMangaItems(data);
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

    return {mangaItems, isLoading, error};
};
