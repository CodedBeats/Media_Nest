// dependencies
import { useState } from "react";

// components
import { MediaStatusBtn } from "../../btns/MediaStatusBtn";

// api
import { updateMangaItemByID } from "../../../apis/firebase/firestore";

// utility
import { type MangaItem } from "../../../utility/interfaces";
import { checkEmptyInput } from "../../../utility/manipulateStr";

// add manga form
export const EditMangaForm = ({
    id,
    mangadexID,
    title,
    author,
    status,
    rating,
    progress,
    imgUrl,
    closeForm,
}: {
    id: string;
    mangadexID: string;
    title: string;
    author: string;
    status: string;
    rating: number;
    progress: string;
    imgUrl: string;
    closeForm: () => void;
}) => {
    // state
    const [formData, setFormData] = useState<MangaItem>({
        mangadexID: mangadexID,
        title: title,
        author: author,
        status: status,
        rating: rating,
        progress: progress,
        imgUrl: imgUrl,
    });
    const [statusLabelState, setStatusLabelState] = useState<string>(status);

    // handle set status
    const handleSetStatus = (status: string) => {
        setStatusLabelState(status);
        setFormData({ ...formData, status: status });
    };

    // handle create manga item
    const handleEditMangaItem = () => {
        // validate form data
        if (
            !checkEmptyInput(formData.title) ||
            !checkEmptyInput(formData.author)
        ) {
            alert("Required fields: Title, Author, Image URL");
            return;
        }

        // edit manga item
        updateMangaItemByID(id, formData);
        console.log("edited manga item:", formData);

        // close form
        closeForm();
    };

    return (
        <div className="bg-[#1f1f1f] rounded-2xl shadow-xl p-10 w-full flex flex-col gap-8 text-white">
            {/* header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-[#D69500]">Edit Manga</h2>
                <button
                    className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition"
                    onClick={closeForm}
                >
                    Close
                </button>
            </div>

            {/* form fields */}
            <CustomInput
                label="Cover Image"
                inputType="text"
                placeholder="Image URL"
                value={formData.imgUrl || ""}
                onChange={(e) => {
                    setFormData({ ...formData, imgUrl: e.target.value });
                }}
            />
            <CustomInput
                label="MangaDex ID"
                inputType="text"
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={formData.mangadexID || ""}
                onChange={(e) => {
                    setFormData({ ...formData, mangadexID: e.target.value });
                }}
            />
            <CustomInput
                label="Title"
                inputType="text"
                placeholder="Manga Title"
                value={formData.title}
                onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                }}
            />
            <CustomInput
                label="Author"
                inputType="text"
                placeholder="Manga Author"
                value={formData.author}
                onChange={(e) => {
                    setFormData({ ...formData, author: e.target.value });
                }}
            />

            {/* status */}
            <div className="flex flex-col gap-2">
                <label className="text-[#D69500] text-xl font-semibold">Status</label>
                <MediaStatusBtn
                    disabled={false}
                    currentStatus={statusLabelState}
                    options={[
                        "Status: None",
                        "Reading",
                        "Completed",
                        "On Hold",
                        "Dropped",
                        "Plan to Read",
                    ]}
                    onSelect={(newStatus) => handleSetStatus(newStatus)}
                />
            </div>

            <CustomInput
                label="Progress"
                inputType="text"
                placeholder="Chpater progress: ##/##"
                value={formData.progress}
                onChange={(e) => {
                    setFormData({ ...formData, progress: e.target.value });
                }}
            />
            <CustomInput
                label="Rating"
                inputType="number"
                placeholder="Manga Rating: 1-10"
                value={formData.rating.toString()}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        rating: parseInt(e.target.value),
                    });
                }}
            />

            {/* save manga */}
            <button
                className="w-full py-3 mt-6 bg-[#058000] text-white font-bold rounded-lg hover:bg-[#48d843] hover:text-black transition"
                onClick={handleEditMangaItem}
            >
                Save Manga
            </button>
        </div>
    );
};

// custon form input (also cause updating tailwing classes in each div is a pain)
const CustomInput = ({
    label,
    inputType,
    placeholder,
    value,
    onChange,
}: {
    label: string;
    inputType: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[#D69500] text-xl font-semibold">{label}</label>
            <input
                type={inputType}
                className="w-full px-4 py-2 bg-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-gray-300"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
