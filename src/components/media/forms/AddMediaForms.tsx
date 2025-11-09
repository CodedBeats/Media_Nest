// dependencies
import { useState } from "react";

// components
import { MediaStatusBtn } from "../../btns/MediaStatusBtn";

// api
import { createMangaItem } from "../../../apis/firebase/firestore";

// utility
import { type MangaItem, type SeriesItem } from "../../../utility/interfaces";
import { checkEmptyInput } from "../../../utility/manipulateStr";

// add manga form
export const AddMangaForm = ({ closeForm }: { closeForm: () => void }) => {
    // state
    const [formData, setFormData] = useState<MangaItem>({
        mangadexID: "",
        title: "",
        author: "",
        status: "Status: None",
        rating: 0,
        progress: "/",
        imgUrl: "",
    });
    const [statusLabelState, setStatusLabelState] = useState<string>("Status: None");

    // handle set status
    const handleSetStatus = (status: string) => {
        setStatusLabelState(status);
        setFormData({ ...formData, status: status });
    };

    // handle create manga item
    const handleCreateMangaItem = () => {
        // validate form data
        if (
            !checkEmptyInput(formData.title) ||
            !checkEmptyInput(formData.author)
        ) {
            alert("Required fields: Title, Author, Image URL");
            return;
        }

        // create manga item
        createMangaItem(formData)
            .then(() => {
                console.log("manga added successfully");
            })
            .catch((error) => {
                console.error("Failed to add manga:", error);
            });

        // reset form data
        setFormData({
            title: "",
            author: "",
            status: "Status: None",
            rating: 0,
            progress: "/",
            imgUrl: "",
        });
        setStatusLabelState("Status: None");
    };

    return (
        <div className="bg-[#1f1f1f] rounded-2xl shadow-xl p-6 sm:p-10 w-full flex flex-col gap-6 text-white">
            {/* header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#D69500]">Add New Manga</h2>
                <button
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition text-sm"
                    onClick={closeForm}
                >
                    Close
                </button>
            </div>

            {/* form fields */}
            <div className="flex flex-col gap-4">
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
            </div>

            {/* create manga */}
            <button
                className="w-full py-2 sm:py-3 mt-4 bg-[#058000] text-white font-bold rounded-lg hover:bg-[#48d843] hover:text-black transition"
                onClick={handleCreateMangaItem}
            >
                Create Manga
            </button>
        </div>
    );
};


// add tv series form
export const AddSeriesForm = ({ closeForm }: { closeForm: () => void }) => {
    // state
    const [formData, setFormData] = useState<SeriesItem>({
        title: "",
        status: "Status: None",
        rating: 0,
        progress: "",
        imgUrl: "",
        seriesEpisodeDetails: [],
    });
    const [statusLabelState, setStatusLabelState] = useState<string>("Status: None");
    const [seasonProgress, setSeasonProgress] = useState<string>("S0")
    const [episodeProgress, setEpisodeProgress] = useState<string>("EP0")
    const [episodeTitle, setEpisodeTitle] = useState<string>("")


    // handle set status
    const handleSetStatus = (status: string) => {
        setStatusLabelState(status);
        setFormData({ ...formData, status: status });
    };

    // handle create manga item
    const handleCreateMangaItem = () => {
        // validate form data
        if (
            !checkEmptyInput(formData.title) ||
            !checkEmptyInput(formData.imgUrl)
        ) {
            alert("Required fields: Title, Image URL");
            return;
        }

        // concat season, episode and title together
        const concatProgress = `${seasonProgress} ${episodeProgress} ${episodeTitle}`
        setFormData({
            ...formData,
            progress: concatProgress
        })


        // create manga item
        console.log(concatProgress)
        // createMangaItem(formData)
        //     .then(() => {
        //         console.log("manga added successfully");
        //     })
        //     .catch((error) => {
        //         console.error("Failed to add manga:", error);
        //     });


        // reset season and episode and title
        setSeasonProgress("")
        setEpisodeProgress("")
        setEpisodeTitle("")
        // reset form data
        setFormData({
            title: "",
            status: "Status: None",
            rating: 0,
            progress: "",
            imgUrl: "",
            seriesEpisodeDetails: [],
        });
        setStatusLabelState("Status: None");
    };

    return (
        <div className="bg-[#1f1f1f] rounded-2xl shadow-xl p-6 sm:p-10 w-full flex flex-col gap-6 text-white">
            {/* header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#D69500]">Add New TV Show</h2>
                <button
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition text-sm"
                    onClick={closeForm}
                >
                    Close
                </button>
            </div>

            {/* form fields */}
            <div className="flex flex-col gap-4">
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
                    label="Title"
                    inputType="text"
                    placeholder="Manga Title"
                    value={formData.title}
                    onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                    }}
                />


                {/* select progress from seasons and episodes */}
                <div className="flex flex-col gap-2">
                    <label className="text-[#D69500] text-xl font-semibold">Season & Episode Progress</label>
                    
                    {/* get series seasons and episods from API */}
                    <button 
                        className="flex items-center justify-between w-full px-3 py-1 text-white rounded border border-[#0CB321] 
                        hover:bg-[#0f661a] transition text-sm"
                        onClick={() => console.log("get seasons and episodes API")}
                    >
                        GRABBIT
                    </button>

                    {/* season */}
                    <CustomDropdown 
                        currentStatus={seasonProgress}
                        options={["S1", "S2", "S3", "S4"]}
                        onSelect={(newVal) => setSeasonProgress(newVal)}
                    />
                    {/* episode */}
                    <CustomDropdown 
                        currentStatus={episodeProgress}
                        options={["EP1", "EP2", "EP3", "EP4"]}
                        onSelect={(newVal) => setEpisodeProgress(newVal)}
                    />
                    {/* episode title */}
                    <CustomInput
                        label=""
                        inputType="text"
                        placeholder="Episode Title"
                        value={episodeTitle}
                        onChange={(e) => {
                            setEpisodeTitle(e.target.value);
                        }}
                    />
                </div>


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
            </div>

            {/* create manga */}
            <button
                className="w-full py-2 sm:py-3 mt-4 bg-[#058000] text-white font-bold rounded-lg hover:bg-[#48d843] hover:text-black transition"
                onClick={handleCreateMangaItem}
            >
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
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[#D69500] text-xl font-semibold">{label}</label>
            <input
                type={inputType}
                className="w-full px-3 py-2 bg-gray-200 rounded-lg text-gray-800 text-sm sm:text-base focus:outline-none focus:border-gray-300"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export const CustomDropdown = ({ currentStatus, options, onSelect }: { currentStatus: string; options: string[]; onSelect: (status: string) => void; }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full text-left sm:w-40">
            <button
                className="flex items-center justify-between w-full px-3 py-1 text-white rounded border border-[#0CB321] 
                hover:bg-[#0f661a] transition text-sm"
                onClick={toggleDropdown}
            >
                <p>{currentStatus}</p>
                {/* down arrow*/}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-1 w-full sm:w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 transition text-sm"
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
