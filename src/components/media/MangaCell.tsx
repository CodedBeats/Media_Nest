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
    // state
    const originalStatus = status;
    const [labelStatus, setLabelStatus] = useState(status ?? "Select Status");

    // handle status change
    const handleUpdateMangaStatus = () => {
        if (labelStatus == originalStatus) return;

        // update manga with firebase api call
        console.log("updating manga status to", labelStatus);
    };

    return (
        <div className="flex items-center align-center justify-between gap-6 w-full h-full bg-gray-400 hover:bg-[#bbbbbb] transition rounded-2xl">
            <img
                src={imgUrl}
                alt="manga cover"
                className="w-30 h-30 object-cover"
            />
            <div className="flex flex-col items-start justify-center w-full h-30 gap-0.5">
                <div className="text-left flex items-center justify-start w-full gap-1">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {title} |
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">{author}</p>
                </div>
                <p className="w-full text-lg text-gray-800 mb-2">
                    Progress: {progress}
                </p>
                <div className="flex items-center justify-start gap-4 w-full">
                    <MediaStatusBtn
                        currentStatus={labelStatus}
                        options={[
                            "Reading",
                            "Completed",
                            "On Hold",
                            "Dropped",
                            "Plan to Read",
                        ]}
                        onSelect={(newStatus) => {
                            setLabelStatus(newStatus);
                        }}
                    />
                    {labelStatus !== originalStatus && (
                        <button
                            className="px-4 py-1 bg-green-900 text-white rounded hover:bg-green-700 transition"
                            onClick={handleUpdateMangaStatus}
                        >
                            Update Status
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full pr-6">
                <p className="text-gray-600 pr-6">Rating</p>
                <p className="text-lg text-gray-800 pr-6">{rating}</p>
            </div>
        </div>
    );
};

export default MangaCell;
