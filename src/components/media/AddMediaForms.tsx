// dependencies
import { useState } from "react";

// components
import { MediaStatusBtn } from "../btns/MediaStatusBtn";

// api
import { createMangaItem } from "../../api/firebase/firestore";

// utility
import { type MangaItem } from "../../utility/interfaces";
import { checkEmptyInput } from "../../utility/manipulateStr";


// add manga form
export const AddMangaForm = ({ closeForm }: { closeForm: () => void }) => {
    // state
    const [formData, setFormData] = useState<MangaItem>({
        title: "",
        author: "",
        status: "n/a",
        rating: 0,
        progress: "n/a",
        imgUrl: "",
    });
    const [statusLabelState, setStatusLabelState] = useState<string>("Status: None");

    // handle set status
    const handleSetStatus = (status: string) => {
        setStatusLabelState(status);
        setFormData({...formData, status: status});
    }


    // handle create manga item
    const handleCreateMangaItem = () => {
        // validate form data
        if (!checkEmptyInput(formData.title) || !checkEmptyInput(formData.author) || !checkEmptyInput(formData.imgUrl)) {
            alert("Required fields: Title, Author, Image URL");
            return;
        }

        // create manga item
        createMangaItem(formData)
        .then(() => {
            console.log("manga added successfully");
        })
        .catch(error => {
            console.error("Failed to add manga:", error);
        });

        // reset form data
        setFormData({
            title: "",
            author: "",
            status: "n/a",
            rating: 0,
            progress: "n/a",
            imgUrl: "",
        });
    };


    return (
        <div className="z-10 absolute top-0 left-0 w-full h-full py-5 px-32 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center gap-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={closeForm}>
                Close
            </button>
            <CustomInput
                label="Cover Image"
                inputType="text"
                placeholder="Image URL"
                value={formData.imgUrl}
                onChange={(e) => {
                    setFormData({...formData, imgUrl: e.target.value});
                }}
            />
            <CustomInput
                label="Title"
                inputType="text"
                placeholder="Manga Title"
                value={formData.title}
                onChange={(e) => {
                    setFormData({...formData, title: e.target.value});
                }}
            />
            <CustomInput
                label="Author"
                inputType="text"
                placeholder="Manga Author"
                value={formData.author}
                onChange={(e) => {
                    setFormData({...formData, author: e.target.value});
                }}
            />
            <div className="flex flex-col items-center justify-start w-full gap-4">
                <label className="text-[#D69500] text-3xl font-bold">Status</label>
                <MediaStatusBtn
                    currentStatus={statusLabelState}
                    options={[
                        "Reading",
                        "Completed",
                        "On Hold",
                        "Dropped",
                        "Plan to Read",
                    ]}
                    onSelect={(newStatus) => {
                        handleSetStatus(newStatus);
                    }}
                />
            </div>
            <CustomInput
                label="Progress"
                inputType="text"
                placeholder="Chpater progress: ##/##"
                value={formData.progress}
                onChange={(e) => {
                    setFormData({...formData, progress: e.target.value});
                }}
            />
            <CustomInput
                label="Rating"
                inputType="number"
                placeholder="Manga Rating: 1-10"
                value={formData.rating.toString()}
                onChange={(e) => {
                    setFormData({...formData, rating: parseInt(e.target.value)});
                }}
            />

            {/* create manga */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handleCreateMangaItem}>
                Create Manga
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
        <div className="flex flex-col items-center justify-start w-full gap-4">
            <label className="text-[#D69500] text-3xl font-bold">{label}</label>
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