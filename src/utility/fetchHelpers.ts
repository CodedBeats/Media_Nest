// apis
import { getTvMazeShowData, getTvMazeShowEpisodes } from "../apis/tvmaze/tvmaze";

// interface
import type { SeriesItem } from "./interfaces";


export const fetchShowData = async (showName: string): Promise<SeriesItem | null> => {
    try {
        if (!showName.trim()) throw new Error("Empty show name");

        const fetchedShowData = await getTvMazeShowData(showName);
        const fetchedShowEpisodes = await getTvMazeShowEpisodes(fetchedShowData?.tvMazeID || 0);

        const showDataBase = {
            tvMazeID: fetchedShowData?.tvMazeID,
            title: fetchedShowData?.showName,
            imgUrl: fetchedShowData?.imgUrl,
            seriesEpisodeDetails: fetchedShowEpisodes ?? [],
            status: "none",
            progress: "S0 EP0 episodeTitle",
            rating: 0,
        }

        console.log(showDataBase)

        return showDataBase
    } catch (err) {
        console.error("Error fetching show:", err);
        return null;
    }
};
