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
    
    //? possibly fix the weird coverURL issue later
    // const shitsFucked = () => {
    //     console.log("coverUrl:", coverUrl);
    // }


    return (
        <div className="flex items-center align-center justify-between gap-6 w-full h-full hover:bg-[#1e1e1e] transition px-12 py-5">
            {/* background image */}
            <div className="w-30 h-30 flex items-center justify-center">
                <img
                    src={imgUrl}
                    alt="manga cover"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* manga title, author, progress, status */}
            <div className="flex flex-col items-start justify-center w-full h-30 gap-4">
                <div className="text-left flex items-center justify-start w-full gap-1">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        {title} |
                    </h1>
                    <p className="text-lg text-gray-400 mb-2">{author}</p>
                </div>
                <div className="flex items-center justify-start w-full gap-5">
                    <div className="flex items-center justify-start gap-4">
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
                            onSelect={(newStatus) => {
                                if (user) {
                                    setLabelStatus(newStatus);
                                } else return;
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
                    <p className="w-full text-lg text-gray-300 mb-2">
                        Progress: {progress}
                    </p>
                </div>
            </div>
            {/* rating */}
            <div className="flex flex-col items-center justify-center h-full pr-6">
                <p className="text-white">Rating</p>
                <p className="text-lg font-bold text-[#ea8900]">
                    {typeof rating === "number" && rating > 0 ? rating : "Unrated"}
                </p>
                { user && (
                    <button
                        className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-[#036AA1] transition"
                        onClick={handleShowEditMangaForm}
                    >
                        Edit
                    </button>
                )}
            </div>

            {/* edit manga form */}
            {showEditMangaForm && user && (
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
            )}
        </div>
    );
};

export default MangaCell;
