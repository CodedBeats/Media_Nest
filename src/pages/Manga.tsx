// dependencies
import { useEffect, useState } from "react";
import type { MangaItem } from "../utility/interfaces";

// components
import MangaCell from "../components/media/media-cell/MangaCell";
import { MediaStatusBtn } from "../components/btns/MediaStatusBtn";
import { AddMangaForm } from "../components/media/forms/AddMediaForms";
import Search from "../components/common/Search";

// utility
import { removeStartAndEndWhitespace } from "../utility/manipulateStr";
import { useFecthAllMangaItems } from "../hooks/useFirestore";
// import { mangaSeedData } from "../utility/seedData";

const Manga = () => {
    // fetch manga from firebase with custom hook
    const { mangaItems, isLoading, error } = useFecthAllMangaItems();
    const [filteredMangaItems, setFilteredMangaItems] = useState<MangaItem[]>(
        []
    );
    // const [filteredMangaItems, setFilteredMangaItems] = useState<MangaItem[]>(mangaSeedData);
    const [ratingFilterState, setRatingFilterState] = useState<string>("Dsc");
    const [statusFilterState, setStatusFilterState] =
        useState<string>("Status: None");
    const [showAddMangaForm, setShowAddMangaForm] = useState<boolean>(false);

    useEffect(() => {
        console.log("mangaItems updated:", mangaItems);
        setFilteredMangaItems(mangaItems);
    }, [mangaItems]);

    // handle sort by rating
    const handleRatingFilter = () => {
        if (ratingFilterState === "Dsc") {
            setRatingFilterState("Asc");
            const sortedItems = [...filteredMangaItems].sort(
                (a, b) => a.rating - b.rating
            );
            setFilteredMangaItems(sortedItems);
        } else {
            setRatingFilterState("Dsc");
            const sortedItems = [...filteredMangaItems].sort(
                (a, b) => b.rating - a.rating
            );
            setFilteredMangaItems(sortedItems);
        }
    };

    // handle sort by status
    const handleFilterByStatus = (status: string) => {
        // reset filtered items
        // setFilteredMangaItems(mangaItems);

        // clear status filter
        if (status === "None") {
            setFilteredMangaItems(mangaItems);
            return;
        }

        // update status tn label
        setStatusFilterState(`Status: ${status}`);
        // sort by status
        const filteredItems = mangaItems.filter(
            (item) => item.status == status
        );
        setFilteredMangaItems(filteredItems);
    };

    // handle search
    const handleSearch = (query: string) => {
        // reset filtered items
        setFilteredMangaItems(mangaItems);
        // ignore empty queries
        if (!query) return;
        if (/^\s*$/.test(query)) return; // only whitespace...racist

        // trim off start and end whitespace
        query = removeStartAndEndWhitespace(query);
        // convert to lowercase
        query = query.toLowerCase();

        // console.log(`search for: "${query}"`);
        const filteredItems = mangaItems.filter((item) =>
            item.title.toLocaleLowerCase().includes(query)
        );
        setFilteredMangaItems(filteredItems);
        console.log(filteredItems);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
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
