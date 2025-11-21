// apis
import { getTvMazeShowData, getTvMazeShowEpisodes } from "../apis/tvmaze/tvmaze";
import { getOMDBMovieData } from "../apis/omdb/omdb";
import { fetchAllMangaItems } from "../apis/firebase/firestore";

// interface
import type { SeriesItem, MovieItem } from "./interfaces";


// fetch tv series data
export const fetchShowDataAPI = async (showName: string): Promise<SeriesItem | null> => {
    try {
        if (!showName.trim()) throw new Error("Empty show name");

        const fetchedShowData = await getTvMazeShowData(showName);
        const fetchedShowEpisodes = await getTvMazeShowEpisodes(fetchedShowData?.tvMazeID || 0);

        const showDataFoundation = {
            tvMazeID: fetchedShowData?.tvMazeID,
            title: fetchedShowData?.showName,
            imgUrl: fetchedShowData?.imgUrl,
            seriesEpisodeDetails: fetchedShowEpisodes ?? [],
            status: "none",
            progress: "S0 EP0 episodeTitle",
            rating: 0,
        }

        console.log(showDataFoundation)

        return showDataFoundation
    } catch (err) {
        console.error("Error fetching show:", err);
        return null;
    }
};


// fetch movie data
export const fetchMovieDataAPI = async (movieName: string): Promise<MovieItem | null> => {
    try {
        if (!movieName.trim()) throw new Error("Empty show name");

        const fetchedMovieData = await getOMDBMovieData(movieName)

        const movieDataFoundation = {
            title: fetchedMovieData.title,
            imgUrl: fetchedMovieData.imgUrl,
            year: fetchedMovieData.year,
            director: fetchedMovieData.director,
            status: "Status: None",
            rating: 0
        }

        console.log(movieDataFoundation)

        return movieDataFoundation

    } catch (err) {
        console.error("Error fetching show:", err);
        return null;
    }
}


// fetch manga data
export const fetchAllMangaItemsEnriched = async () => {
    const data = await fetchAllMangaItems()

    return Promise.all(
        data.map(async (manga) => {
            // priority 1 - existing URL
            if (manga.imgUrl) {
                return { ...manga, coverUrl: manga.imgUrl }
            }

            // priority 2 - mangadex ID
            if (manga.mangadexID) {
                try {
                    console.log("mangadexID:", manga.mangadexID)
                    return { ...manga, coverUrl: manga.imgUrl || "/fallback-cover.png" }
                } catch (err) {
                    console.error(`Failed to fetch cover:`, err)
                    return { ...manga, coverUrl: "/fallback-cover.png" }
                }
            }

            // fallback
            return { ...manga, coverUrl: "/fallback-cover.png" }
        })
    )
}
