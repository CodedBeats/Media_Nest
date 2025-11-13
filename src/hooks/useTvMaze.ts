// dependencies
import { useEffect, useRef, useState } from "react";

// components
import { getTvMazeShowData, getTvMazeShowEpisodes } from "../apis/tvmaze/tvmaze"

// utility
import { type SeriesItem } from "../utility/interfaces"


// custom hook to fetch manga item by id
export const useFecthShow = (showName: string) => {
    const [showData, setShowData] = useState<SeriesItem | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const fetchRef = useRef(false); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fecthedShowData = await getTvMazeShowData(showName);
                const fetchedShowEpisodes = await getTvMazeShowEpisodes(fecthedShowData?.tvMazeID || 0)

                // construct show item to store in db
                const setupShow = {
                    tvMazeID: fecthedShowData?.tvMazeID,
                    title: fecthedShowData?.showName,
                    imgUrl: fecthedShowData?.imgUrl,
                    seriesEpisodeDetails: fetchedShowEpisodes,
                    status: "none",
                    progress: "S0 EP0 episodeTitle",
                    rating: 0
                }
                setShowData(setupShow);

            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }
        
        fetchData();
    }, [showName]);

    return {showData, isLoading, error, fetchRef};
};
