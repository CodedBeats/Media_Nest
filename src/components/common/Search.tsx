// dependencies
import { useState } from "react";

const Search = ({ onClick }: { onClick: (searchQuery: string) => void }) => {
    // state
    const [query, setQuery] = useState("");

    return (
        <div className="flex items-center justify-center gap-4 w-full sm:w-[60%]">
            <input
                type="text"
                placeholder="Input search query..."
                className="w-full px-4 py-2 bg-[#2b2b2b] text-white rounded hover:bg-[#363636] transition
                border-1 border-gray-600 border-solid"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                className="px-4 py-2 text-white rounded transition
                border-1 border-blue-500 border-solid hover:bg-blue-900"
                type="button"
                onClick={() => onClick(query)}
            >
                Search
            </button>
        </div>
    );
};

export default Search;
