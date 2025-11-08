// components
import { useState } from "react";
import { MediaStatusBtn } from "../../btns/MediaStatusBtn";
import { EditMangaForm } from "../forms/EditMediaForms";
// api
import { updateMangaItemByID } from "../../../apis/firebase/firestore";
// context
import { useAuth } from "../../../hooks/useFirebaseAuth";

const MangaCell = ({
    id,
    mangadexID,
    //coverUrl,
    imgUrl,
    title,
    author,
    progress,
    status,
    rating,
}: {
    id?: string;
    mangadexID?: string;
    //coverUrl?: string;
    imgUrl?: string;
    title?: string;
    author?: string;
    progress?: string;
    status?: string;
    rating?: number;
}) => {
    // context
    const { user } = useAuth();

    // state
    const [originalStatus, setOriginalStatus] = useState(status ?? "Select Status");
    const [labelStatus, setLabelStatus] = useState(status ?? "Select Status");
    const [showEditMangaForm, setShowEditMangaForm] = useState(false);

    // handle status change
    const handleUpdateMangaStatus = () => {
        if (labelStatus == originalStatus) return;

        // update manga status with firebase api call
        updateMangaItemByID(id || "", { status: labelStatus })
            .then(() => {
                console.log("Manga status updated successfully");
                setOriginalStatus(labelStatus); // update original status to new status
            })
            .catch((error) => {
                console.error("Error updating manga status: ", error);
            });
    };

    // show and hide edit manga form
    const handleShowEditMangaForm = () => {
        setShowEditMangaForm(true);
    };
    const handleCloseEditMangaForm = () => {
        setShowEditMangaForm(false);
    }


    return (
        <div
            className="w-full bg-[#1e1e1e] rounded-lg hover:bg-[#2a2a2a] transition 
             px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2 sm:gap-6"
        >
            {/* MOBILE view (full image + overlay) */}
            <div className="relative w-full h-[60vh] sm:hidden overflow-hidden rounded-lg">
                <img
                    src={imgUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-sm text-gray-300 mb-2">{author}</p>

                    <div className="flex items-center gap-3">
                        <p className="text-white text-sm">Rating:</p>
                        <p className="text-lg font-bold text-[#ea8900]">
                            {typeof rating === "number" && rating > 0
                                ? rating
                                : "Unrated"}
                        </p>
                    </div>

                    <p className="text-gray-400 text-sm mt-2">
                        Progress: {progress}
                    </p>
                </div>
            </div>
            {/* actions below img */}
            <div className="sm:hidden flex flex-col items-center justify-center gap-3 w-[100%]">
                <div className="w-full max-w-[400px]">
                    <MediaStatusBtn
                        disabled={!user}
                        currentStatus={labelStatus}
                        options={["Reading", "Completed", "On Hold", "Dropped", "Plan to Read"]}
                        onSelect={(newStatus) => user && setLabelStatus(newStatus)}
                    />
                </div>

                {labelStatus !== originalStatus && (
                <button
                    className="px-5 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 transition text-sm w-[100%]"
                    onClick={handleUpdateMangaStatus}
                >
                    Update Status
                </button>
                )}

                {user && (
                <button
                    className="px-5 py-2 bg-blue-800 text-white rounded-md hover:bg-[#036AA1] transition text-sm w-[100%]"
                    onClick={handleShowEditMangaForm}
                >
                    Edit
                </button>
                )}
            </div>


            {/* DESKTOP view */}
            <div className="hidden sm:flex items-center sm:items-start justify-between gap-4 sm:gap-6 w-full">
                {/* cover */}
                <div className="w-32 h-48 md:w-22 md:h-30 flex-shrink-0">
                    <img
                        src={imgUrl}
                        alt="manga cover"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                {/* info */}
                <div className="flex flex-col w-full gap-3 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-start gap-1 md:gap-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-white">
                            {title}
                        </h1>
                        <p className="text-sm sm:text-lg text-gray-400">
                            {author}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-6">
                        <MediaStatusBtn
                            disabled={!user}
                            currentStatus={labelStatus}
                            options={[
                                "Reading",
                                "Completed",
                                "On Hold",
                                "Dropped",
                                "Plan to Read",
                            ]}
                            onSelect={(newStatus) =>
                                user && setLabelStatus(newStatus)
                            }
                        />
                        {labelStatus !== originalStatus && (
                            <button
                                className="px-3 py-1 bg-green-900 text-white rounded hover:bg-green-700 transition text-sm"
                                onClick={handleUpdateMangaStatus}
                            >
                                Update Status
                            </button>
                        )}
                        <p className="text-gray-300 text-sm sm:text-base">
                            Progress: {progress}
                        </p>
                    </div>

                    <div className="align-bottom">
                        {user && (
                            <button
                                className="px-8 py-1 bg-blue-800 text-white rounded hover:bg-[#036AA1] transition text-sm"
                                onClick={handleShowEditMangaForm}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* rating */}
                <div className="flex flex-row md:flex-col items-center justify-center gap-5 md:gap-1 sm:pr-4 h-full">
                    <p className="text-white text-sm">Rating</p>
                    <p className="text-lg font-bold text-[#ea8900]">
                        {typeof rating === "number" && rating > 0
                            ? rating
                            : "Unrated"}
                    </p>
                </div>
            </div>

            {/* --- Edit Form --- */}
            {showEditMangaForm && user && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 overflow-y-auto p-4">
                    <div className="mt-10 mb-10 w-full sm:w-[80%] md:w-[50%]">
                        <EditMangaForm
                            id={id || ""}
                            mangadexID={mangadexID || ""}
                            title={title || ""}
                            author={author || ""}
                            status={labelStatus}
                            rating={rating || 0}
                            progress={progress || ""}
                            imgUrl={imgUrl || ""}
                            closeForm={handleCloseEditMangaForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MangaCell;
