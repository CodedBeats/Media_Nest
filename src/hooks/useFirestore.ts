// dependencies
import { useQuery } from "@tanstack/react-query";

// api functions
import { fetchAllMovieItems, fetchAllSeriesItems } from "../apis/firebase/firestore"

// utility
import { type MangaItemWithCover, type MovieItem, type SeriesItem } from "../utility/interfaces"
import { fetchAllMangaItemsEnriched } from "../utility/fetchHelpers"



// custom hook to fetch all manga items, add coverUrl from mangadex api call if mangadexID is available
export const useFecthAllMangaItems = () => {
    return useQuery<MangaItemWithCover[]>({
        queryKey: ["mangaItems"],
        queryFn: fetchAllMangaItemsEnriched,
        staleTime: 1000 * 60 * 10, // 10 minutes cached
        refetchOnWindowFocus: false, // switching tabs doesn't reload
    })
};




// custom hook to fetch all series items
export const useFetchAllSeriesItems = () => {
    return useQuery<SeriesItem[]>({
        queryKey: ["seriesItems"],
        queryFn: fetchAllSeriesItems,
        staleTime: 1000 * 60 * 10, // 10 minutes cached
        refetchOnWindowFocus: false, // switching tabs doesn't reload
    })
}




// custom hook to fetch all movie items
export const useFetchAllMovieItems = () => {
    return useQuery<MovieItem[]>({
        queryKey: ["movieItems"],
        queryFn: fetchAllMovieItems,
        staleTime: 1000 * 60 * 10, // 10 minutes cached
        refetchOnWindowFocus: false, // switching tabs doesn't reload
    })
}
