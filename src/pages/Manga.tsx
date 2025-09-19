// dependencies

// components
import MangaCell from "../components/media/MangaCell";
import MediaStatusBtn from "../components/btns/MediaStatusBtn";
import Search from "../components/common/Search";

// utility
import { removeStartAndEndWhitespace } from "../utility/manipulateStr";
import { useEffect } from "react";
import { useFecthMediaItem } from "../hooks/useFirestore";

// temp seed manga
const manga = [
    {
        id: 0,
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgcqp4aZoigwFfalwhgtv4txxFk-2KVD3HHQ&s",
        title: "One Piece",
        author: "Eiichiro Oda",
        progress: "20/1335",
        status: "Reading",
        rating: 7,
    },
    {
        id: 1,
        imgUrl: "https://christandpopculture.com/wp-content/uploads/2017/06/HorribleSubs-One-Punch-Man-05-1080p.mkv0079-1024x576.jpg",
        title: "One Punch Man",
        author: "Eiichiro Oda",
        progress: "63/64",
        status: "Reading",
        rating: 8,
    },
    {
        id: 2,
        imgUrl: "https://i.imgflip.com/7w3anz.jpg",
        title: "Toriko",
        author: "Eiichiro Oda",
        progress: "112/112",
        status: "Reading",
        rating: 9.5,
    },
];

const Manga = () => {
    // fetch manga from firebase with custom hook

    useEffect(() => {
        // console.log("");
    }, []);

    // temp fetch manga from firebase
    const fetchedMangaItem = useFecthMediaItem("jo1qwf9aqG2DI3XmpyWz");
    console.log("fetched manga item: ", fetchedMangaItem);

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
                {manga.map((manga) => (
                    <MangaCell key={manga.id} {...manga} />
                ))}
            </div>
        </div>
    );
};

export default Manga;
