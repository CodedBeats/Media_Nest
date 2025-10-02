// dependencies
import { useMemo, useState } from "react";

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
    // fetch manga from firebase with custom hook
    const { mangaItems, isLoading, error, refetch } = useFecthAllMangaItems();
    // const [filteredMangaItems, setFilteredMangaItems] = useState<MangaItem[]>(mangaSeedData);
    const [ratingFilterState, setRatingFilterState] = useState<"Asc" | "Dsc">("Dsc");
    const [statusFilterState, setStatusFilterState] = useState<string>("None");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showAddMangaForm, setShowAddMangaForm] = useState<boolean>(false);

    // derived filtered list
    const filteredMangaItems = useMemo(() => {
        let items = [...mangaItems];

        // apply search filter
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
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
            <div className="overflow-hidden w-full h-[28rem] relative flex items-center justify-center">
                <img
                    className="w-full h-[28rem] object-cover object-bottom"
                    src="https://wallpapers.com/images/hd/pink-blue-anime-city-nv4sit761ja3rnhj.jpg"
                    alt="Banner"
                />
                {/* gradient starts solid at top, begins fade around halfway */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-6xl font-bold text-white mb-4">
                        Manga Tracker
                    </h1>
                    {user && (
                        <button
                            className="px-4 py-1 bg-green-900 text-white rounded hover:bg-green-700 transition"
                            onClick={() => setShowAddMangaForm(true)}
                        >
                            Add Manga
                        </button>
                    )}
                </div>
            </div>
            <div 
                className="flex flex-col items-center justify-center
                bg-[#141414] px-8 py-4 rounded w-full h-full"
            >
                <div className="flex items-center justify-center min-w-1/2 gap-4">
                    <Search
                        onClick={(query) => {
                            handleSearch(query);
                        }}
                    />
                    <button 
                        className="px-4 py-2 text-white w-1/5 rounded transition
                        border-1 border-blue-500 border-solid hover:bg-blue-900"
                        type="button" 
                        onClick={handleRefresh}
                    >
                        Refresh List
                    </button>
                </div>
                <div className="flex items-center justify-center gap-2 my-8">
                    <p className="text-white font-semibold">
                        Filter by status
                    </p>
                    <MediaStatusBtn
                        currentStatus={statusFilterState}
                        options={[
                            "None",
                            "Reading",
                            "Completed",
                            "On Hold",
                            "Dropped",
                            "Plan to Read",
                        ]}
                        onSelect={(newStatus) => {
                            handleFilterByStatus(newStatus);
                        }}
                    />

                    <p className="text-white font-semibold">
                        Filter by rating
                    </p>
                    <button 
                        className="px-4 py-1 text-white rounded border-1 border-[#0CB321] border-solid hover:bg-[#0f661a] transition"
                        onClick={handleRatingFilter}>
                        {ratingFilterState}
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                {filteredMangaItems.length === 0 && (
                    <p className="text-gray-700">No manga found.</p>
                )}
                {filteredMangaItems.map((manga) => (
                    <MangaCell key={manga.id} {...manga} />
                ))}
            </div>

            {/* add manga form */}
            {showAddMangaForm && user && (
                <AddMangaForm closeForm={() => setShowAddMangaForm(false)} />
            )}
        </div>
    );
};

export default Manga;
