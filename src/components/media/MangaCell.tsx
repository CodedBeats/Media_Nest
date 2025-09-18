// dependencies

const MangaCell = ({
    imgUrl,
    title,
    author,
    progress,
    status,
    rating,
}: {
    imgUrl?: string;
    title?: string;
    author?: string;
    progress?: string;
    status?: string;
    rating?: number;
}) => {
    return (
        <div className="flex items-center align-center justify-between gap-6 w-full h-full bg-gray-400 hover:bg-[#bbbbbb] transition rounded-2xl">
            <img src={imgUrl} alt="manga cover" className="w-30 h-30 object-cover" />
            <div className="flex flex-col items-start justify-center w-full h-30 gap-0.5">
                <div className="text-left flex items-center justify-start w-full gap-1">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title} |</h1>
                    <p className="text-lg text-gray-600 mb-2">{author}</p>
                </div>
                <p className="w-full text-lg text-gray-800 mb-2">Progress: {progress}</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    {status}
                </button>
            </div>
            <p className="text-lg text-gray-600 pr-6">{rating}</p>
        </div>
    );
};

export default MangaCell;