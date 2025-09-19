import { useEffect, useState } from "react";
import { fetchMediaItemByID } from "../api/firebase/firestore";
import { type MangaItem } from "../utility/interfaces";

export const useFecthMediaItem = (id: string) => {
    const [mediaItem, setMediaItem] = useState<MangaItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const mediaData = await fetchMediaItemByID(id);
            setMediaItem(mediaData);
        };
        fetchData();
    }, [id]);

    return mediaItem;
};
