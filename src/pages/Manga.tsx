// dependencies
import { useMemo, useState } from "react";

// components
import MangaCell from "../components/media/media-cell/MangaCell";
import { MediaStatusBtn } from "../components/btns/MediaStatusBtn";
import { AddMangaForm } from "../components/media/forms/AddMediaForms";
import Search from "../components/common/Search";

// utility
import { useFecthAllMangaItems } from "../hooks/useFirestore";
// import { mangaSeedData } from "../utility/seedData";


const Manga = () => {
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
        <div className="flex flex-col items-center justify-start py-10 min-h-svh bg-gray-600 px-15">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Manga Tracker
            </h1>
            <button
                className="px-4 py-1 bg-green-900 text-white rounded hover:bg-green-700 transition"
                onClick={() => setShowAddMangaForm(true)}
            >
                Add Manga
            </button>
            <button className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-[#036AA1] transition" onClick={handleRefresh}>
                Refresh List
            </button>
            <div className="flex items-center justify-center gap-4 mb-8">
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
                <button onClick={handleRatingFilter}>
                    {ratingFilterState}
                </button>
            </div>
            <Search
                onClick={(query) => {
                    handleSearch(query);
                }}
            />
            <div className="flex flex-col items-center justify-center w-full gap-8">
                {filteredMangaItems.length === 0 && (
                    <p className="text-gray-700">No manga found.</p>
                )}
                {filteredMangaItems.map((manga) => (
                    <MangaCell key={manga.id} {...manga} />
                ))}
            </div>

            {/* add manga form */}
            {showAddMangaForm && (
                <AddMangaForm closeForm={() => setShowAddMangaForm(false)} />
            )}
        </div>
    );
};

export default Manga;
