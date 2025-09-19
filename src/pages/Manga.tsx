// dependencies
import { useEffect, useState } from "react";
import type { MangaItem } from "../utility/interfaces";

// components
import MangaCell from "../components/media/MangaCell";
import MediaStatusBtn from "../components/btns/MediaStatusBtn";
import Search from "../components/common/Search";

// utility
import { removeStartAndEndWhitespace } from "../utility/manipulateStr";
// import { useFecthAllMangaItems } from "../hooks/useFirestore";
import { mangaSeedData } from "../utility/seedData";

const Manga = () => {
    // fetch manga from firebase with custom hook
    // const [filteredMangaItems, setFilteredMangaItems] = useState<MangaItem[]>(
    //     useFecthAllMangaItems()
    // );
    const [filteredMangaItems, setFilteredMangaItems] =
        useState<MangaItem[]>(mangaSeedData);

    useEffect(() => {
        // console.log("");
    }, []);

    // handle filter
    const handleFilterByStatus = (status: string) => {
        console.log("filter by rating: ", status);
    };
    const handleFilterByRating = (rating: number) => {
        console.log("filter by rating: ", rating);
    };

    // handle search
    const handleSearch = (query: string) => {
        // reset filtered items
        setFilteredMangaItems(mangaSeedData);
        // ignore empty queries
        if (!query) return;
        if (/^\s*$/.test(query)) return; // only whitespace...racist

        // trim off start and end whitespace
        query = removeStartAndEndWhitespace(query);
        // convert to lowercase
        query = query.toLowerCase();

        console.log(`search for: "${query}"`);

        const filteredItems = filteredMangaItems.filter((item) =>
            item.title.toLocaleLowerCase().includes(query)
        );
        setFilteredMangaItems(filteredItems);
        console.log(filteredItems);
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
                {filteredMangaItems.map((manga) => (
                    <MangaCell key={manga.id} {...manga} />
                ))}
            </div>
        </div>
    );
};

export default Manga;
