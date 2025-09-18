// dependencies

const Manga = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Manga Tracker</h1>
            <p className="text-lg text-gray-600 mb-8">
                manga stuff below
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                filter
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Search
            </button>
            <p className="text-lg text-gray-600 mb-8">
                manga entry
            </p>
        </div>
    );
};

export default Manga;