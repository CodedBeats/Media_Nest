// dependencies

// components
import MangaCell from "../components/media/MangaCell";
import MediaStatusBtn from "../components/btns/MediaStatusBtn";
import Search from "../components/common/Search";

// utility
import { removeStartAndEndWhitespace } from "../utility/manipulateStr";
import { useEffect } from "react";
import { useFecthAllMangaItems } from "../hooks/useFirestore";

const Manga = () => {
    // fetch manga from firebase with custom hook
    const mangaItems = useFecthAllMangaItems();
    console.log("mangaItems: ", mangaItems);

    useEffect(() => {
        // console.log("");
    }, []);

    // handle filter
    const handleFilterByStatus = (status: string) => {
        console.log("filter by status: ", status);
    };
    const handleFilterByRating = (rating: number) => {
        console.log("filter by rating: ", rating);
    };

    // handle search
    const handleSearch = (query: string) => {
        // ignore empty queries
        if (!query) return;
        if (/^\s*$/.test(query)) return; // only whitespace...racist

        // trim off start and end whitespace
        query = removeStartAndEndWhitespace(query);

        console.log(`search for: "${query}"`);
    };

    return (
        <div className="flex flex-col items-center justify-start py-10 min-h-svh bg-gray-600 px-15">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Manga Tracker
            </h1>
            <p className="text-lg text-gray-600 mb-8">manga stuff below</p>
            <div className="flex items-center justify-center gap-4 mb-8">
                <p>Filter by:</p>
                <MediaStatusBtn
                    currentStatus={"Select Status"}
                    options={[
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
                <MediaStatusBtn
                    currentStatus={"Select Rating"}
                    options={["1", "2", "3", "4", "5"]}
                    onSelect={(newRating) => {
                        handleFilterByRating(parseInt(newRating));
                    }}
                />
            </div>
            <Search
                onClick={(query) => {
                    handleSearch(query);
                }}
            />
            <div className="flex flex-col items-center justify-center w-full gap-8">
                {mangaItems.map((manga) => (
                    <MangaCell key={manga.id} {...manga} />
                ))}
            </div>
        </div>
    );
};

export default Manga;
