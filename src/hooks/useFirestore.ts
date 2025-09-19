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

    useEffect(() => {
        const fetchData = async () => {
            const mediaData = await fetchAllMangaItems();
            setMangaItems(mediaData);
        };
        fetchData();
    }, []);

    return mangaItems;
};
