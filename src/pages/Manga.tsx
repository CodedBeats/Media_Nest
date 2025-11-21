// dependencies
import { useEffect, useMemo, useState } from "react";

// components
import MangaCell from "../components/media/media-cell/MangaCell";
import { MediaStatusBtn } from "../components/btns/MediaStatusBtn";
import { AddMangaForm } from "../components/media/forms/AddMediaForms";
import Search from "../components/common/Search";

// context
import { useAuth } from "../hooks/useFirebaseAuth";

// utility
import { useFecthAllMangaItems } from "../hooks/useFirestore";


const Manga = () => {
    // context
    const { user } = useAuth();

    // state
    // fetch manga from firebase with custom query hook
    const { data: mangaItems = [], isLoading, error, refetch } = useFecthAllMangaItems();
    const [ratingFilterState, setRatingFilterState] = useState<"Asc" | "Dsc">("Dsc");
    const [statusFilterState, setStatusFilterState] = useState<string>("None");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showAddMangaForm, setShowAddMangaForm] = useState<boolean>(false);
    // load more
    const [visibleCount, setVisibleCount] = useState<number>(10)
    const LOAD_STEP = 10


    // derived filtered list
    const filteredMangaItems = useMemo(() => {
        let items = [...mangaItems]

        // apply search filter
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase()
            items = items.filter((item) =>
                item.title.toLowerCase().includes(q)
            );
        }

        // apply status filter
        if (statusFilterState !== "None") {
            items = items.filter((item) => item.status === statusFilterState);
        }

        // apply rating sort
        if (ratingFilterState === "Asc") {
            items.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
        } else {
            items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        }
        
        return items;
    }, [mangaItems, ratingFilterState, statusFilterState, searchQuery]);
    

    useEffect(() => {
        // reset visible count
        setVisibleCount(LOAD_STEP)
    }, [ratingFilterState, statusFilterState, searchQuery])


    // handle load more
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + LOAD_STEP)
    }
    const visibleManga = filteredMangaItems.slice(0, visibleCount)


    // handle refresh manga list
    const handleRefresh = async () => {
        await refetch();
        setStatusFilterState("None");
        setRatingFilterState("Dsc");
        setSearchQuery("");
    };

    // handle sort by rating
    const handleRatingFilter = () => {
        setRatingFilterState((prev) => (prev === "Dsc" ? "Asc" : "Dsc"));
    };

    // handle sort by status
    const handleFilterByStatus = (status: string) => {
        setStatusFilterState(status);
    };

    // handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col items-center justify-start min-h-svh pb-20 bg-[#1a1a1a]">
            {/* background img header */}
            <div className="overflow-hidden w-full h-[12rem] md:h-[28rem] relative flex items-center justify-center">
                <img
                    className="w-full h-full object-cover object-bottom"
                    src="https://wallpapers.com/images/hd/pink-blue-anime-city-nv4sit761ja3rnhj.jpg"
                    alt="Banner"
                />
                {/* gradient starts solid at top, begins fade around halfway */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 pt-12 md:pt-0">
                        Manga Tracker
                    </h1>
                    {user && (
                        <button
                            className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 transition text-sm sm:text-base"
                            onClick={() => setShowAddMangaForm(true)}
                        >
                            Add Manga
                        </button>
                    )}
                </div>
            </div>

            {/* search + filters */}
            <div 
                className="flex flex-col items-center justify-center
                bg-[#141414] px-4 sm:px-8 py-6 rounded w-full gap-6"
            >
                {/* search */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <Search
                        onClick={(query) => {
                            handleSearch(query);
                        }}
                    />
                    <button 
                        className="px-4 py-2 text-white rounded border border-blue-500 hover:bg-blue-900 
                        transition w-full sm:w-auto"
                        type="button" 
                        onClick={handleRefresh}
                    >
                        Refresh List
                    </button>
                </div>

                {/* filter */}
                <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
                    <div className="flex flex-row items-center justify-center gap-8 md:gap-10 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                                Status
                            </p>
                            <div className="flex-1 min-w-30">
                                <MediaStatusBtn
                                    disabled={false}
                                    currentStatus={statusFilterState}
                                    options={["None", "Reading", "Completed", "On Hold", "Dropped", "Plan to Read"]}
                                    onSelect={handleFilterByStatus}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                                Rating
                            </p>
                            <button
                                className="flex-1 px-3 py-1 text-white min-w-0 max-w-40
                                rounded border border-[#0CB321] hover:bg-[#0f661a] transition"
                                onClick={handleRatingFilter}
                            >
                                {ratingFilterState}
                            </button>
                        </div>
                    </div>
                    {filteredMangaItems.length === 0 ? (
                        <p className="text-gray-500 text-center">No manga found</p>
                    ): (
                        <p className="text-gray-500 text-center">{filteredMangaItems.length} manga found</p>
                    )}
                </div>
            </div>

            {/* manga list */}
            <div className="flex flex-col items-center justify-center w-full mt-6 px-3 gap-4 md:gap-0">
                {visibleManga.map((manga) => (
                    <MangaCell key={manga.id} {...manga} />
                ))}
                { visibleCount < filteredMangaItems.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Load More
                    </button>
                )}
            </div>

            {/* add manga form */}
            {showAddMangaForm && user && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 overflow-y-auto p-4">
                    <div className="mt-10 mb-10 w-full sm:w-[80%] md:w-[50%]">
                        <AddMangaForm closeForm={() => setShowAddMangaForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Manga;
