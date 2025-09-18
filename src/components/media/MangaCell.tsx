// components
import { useState } from "react";
import MediaStatusBtn from "../btns/MediaStatusBtn";

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
    const [labelStatus, setLabelStatus] = useState(status ?? "Select Status");

    return (
        <div className="flex items-center align-center justify-between gap-6 w-full h-full bg-gray-400 hover:bg-[#bbbbbb] transition rounded-2xl">
            <img src={imgUrl} alt="manga cover" className="w-30 h-30 object-cover" />
            <div className="flex flex-col items-start justify-center w-full h-30 gap-0.5">
                <div className="text-left flex items-center justify-start w-full gap-1">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{title} |</h1>
                    <p className="text-lg text-gray-600 mb-2">{author}</p>
                </div>
                <p className="w-full text-lg text-gray-800 mb-2">Progress: {progress}</p>
                <MediaStatusBtn
                    currentStatus={labelStatus}
                    options={["Reading", "Completed", "On Hold", "Dropped", "Plan to Read"]}
                    onSelect={(newStatus) => {
                        setLabelStatus(newStatus);
                    }}
                />
            </div>
            <p className="text-lg text-gray-600 pr-6">{rating}</p>
        </div>
    );
};

export default MangaCell;