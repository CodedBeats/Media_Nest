import { useState } from "react";

const Search = ({ onClick }: { onClick: (searchQuery: string) => void }) => {
    // state
    const [query, setQuery] = useState("");

    return (
        <div className="flex items-center justify-center gap-4 w-full">
            <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => onClick(query)}
            >
                Search
            </button>
        </div>
    );
};

export default Search;
