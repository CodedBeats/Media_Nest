// dependencies
import { useEffect, useState } from "react";

// components
import { MediaStatusBtn } from "../../btns/MediaStatusBtn";
import { CustomInput, CustomDropdown } from "../../common/FormFields";

// api
import { updateMangaItemByID, updateMovieItemByID, updateSeriesItemByID } from "../../../apis/firebase/firestore";

// utility
import { type MangaItem, type MovieItem, type SeriesItem } from "../../../utility/interfaces";
import { checkEmptyInput } from "../../../utility/manipulateStr";

// edit manga form
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
        <div className="bg-[#1f1f1f] rounded-2xl shadow-xl p-6 sm:p-10 w-full flex flex-col gap-6 text-white">
            {/* header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#D69500]">Edit Manga</h2>
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

            {/* save manga */}
            <button
                className="w-full py-2 sm:py-3 mt-4 bg-[#058000] text-white font-bold rounded-lg hover:bg-[#48d843] hover:text-black transition"
                onClick={handleEditMangaItem}
            >
                Save Manga
            </button>
        </div>
    );
};


// edit tv series form
export const EditSeriesForm = ({ 
    id,
    tvMazeID,
    title,
    imgUrl,
    seriesEpisodeDetails,
    status,
    progress,
    rating,
    closeForm 
}: { 
    id: string;
    tvMazeID: number;
    title: string;
    imgUrl: string;
    seriesEpisodeDetails: Array<{
        seasonNum: number;
        episodeNum: number;
        episodeName: string;
    }>;
    status: string;
    progress: string;
    rating: number;
    closeForm: () => void 
}) => {
    // state
    const [formData, setFormData] = useState<SeriesItem>({
        id: id,
        tvMazeID: tvMazeID,
        title: title,
        status: status,
        rating: rating,
        progress: progress,
        imgUrl: imgUrl,
        seriesEpisodeDetails: seriesEpisodeDetails,
    });
    const [statusLabelState, setStatusLabelState] = useState<string>(status);
    const [seasonProgress, setSeasonProgress] = useState<string>("S0")
    const [episodeProgress, setEpisodeProgress] = useState<string>("EP0")
    const [episodeTitle, setEpisodeTitle] = useState<string>("")


    // init season num, episdoe num and episode name states WHEN formData.progress comes in
    useEffect(() => {
        // idc if this is not pretty, this is pure (no AI, no auto complete, no docs) exp and js knowledge
        const progressAsArr = formData.progress.split("")
        
        // get indexes for spaces (needed just for the first 2)
        const spaceIndexs: number[] = []
        progressAsArr.forEach((letter, index) => {
            if (letter === " ") {
                spaceIndexs.push(index)
            }
        })
        // console.log(spaceIndexs)
        
        const seasonNum = progressAsArr.slice(0, spaceIndexs[0]).join("")
        const episodeNum = progressAsArr.slice(spaceIndexs[0] + 1, spaceIndexs[1]).join("")
        const episdoeName = progressAsArr.slice(spaceIndexs[1] + 1).join("")
        
        setSeasonProgress(seasonNum)
        setEpisodeProgress(episodeNum)
        setEpisodeTitle(episdoeName)
        
    }, [formData.progress])


    // get all seasons
    const seasonOptions = Array.from( 
        new Set(formData.seriesEpisodeDetails.map(ep => ep.seasonNum)) 
    ).map(num => `S${num}`);
    // get episode options based on season
    const filteredEpisodes = formData.seriesEpisodeDetails.filter(
        ep => ep.seasonNum === Number(seasonProgress.replace("S", ""))
    );
    const episodeOptions = filteredEpisodes.map(ep => `EP${ep.episodeNum}`);

    // find and set episode title on episode selection
    useEffect(() => {
        if (!seasonProgress || !episodeProgress) return;

        const selectedSeason = Number(seasonProgress.replace("S", ""));
        const selectedEpisode = Number(episodeProgress.replace("EP", ""));

        const match = formData.seriesEpisodeDetails.find(
            ep => ep.seasonNum === selectedSeason && ep.episodeNum === selectedEpisode
        );

        if (match) setEpisodeTitle(match.episodeName)
    }, [seasonProgress, episodeProgress, formData.seriesEpisodeDetails]);



    // handle set status
    const handleSetStatus = (status: string) => {
        setStatusLabelState(status);
        setFormData({ ...formData, status: status });
    };

    // handle edit series item
    const handleEditSeriesItem = async () => {
        // validate form data
        if (
            !checkEmptyInput(formData.title) ||
            !checkEmptyInput(formData.imgUrl) || 
            formData.tvMazeID == 0
        ) {
            alert("Required fields: Title, Image URL, tvMazeID");
            return;
        }

        // concat season, episode and title together
        const concatProgress = `${seasonProgress} ${episodeProgress} ${episodeTitle}`
        const newSeriesItem = {
            ...formData,
            progress: concatProgress
        };


        // edit series item
        try {
            await updateSeriesItemByID(id, newSeriesItem)
            console.log("Series updated successfully")

            
            // close form
            closeForm();

        } catch (error) {
            console.error("Failed to update Series:", error)
        }
    }

    return (
        <div className="bg-[#1f1f1f] rounded-2xl shadow-xl p-6 sm:p-10 w-full flex flex-col gap-6 text-white">
            {/* header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#D69500]">Edit TV Show</h2>
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
                    label="Title"
                    inputType="text"
                    placeholder="Series Title"
                    value={formData.title}
                    onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                    }}
                />

                <CustomInput
                    label="Cover Image"
                    inputType="text"
                    placeholder="Image URL"
                    value={formData.imgUrl || ""}
                    onChange={(e) => {
                        setFormData({ ...formData, imgUrl: e.target.value });
                    }}
                />


                {/* select progress from seasons and episodes */}
                <div className="flex flex-col gap-2 mt-4">
                    <label className="text-[#D69500] text-xl font-semibold">Season & Episode Progress</label>

                    <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-x-3 sm:gap-0">
                        {/* season label */}
                        <p 
                            className="col-start-1 row-start-1
                            pb-2"
                        >
                            Select Season
                        </p>
                        {/* episode label */}
                        <p 
                            className="col-start-2 row-start-1
                            pb-2"
                        >
                            Select Episode
                        </p>
                        {/* episode title label */}
                        <p 
                            className="col-start-1 sm:col-start-3 col-end-3 sm:col-end-4 row-start-3 sm:row-start-1
                            pt-4 sm:pt-0"
                        >
                            Episdoe Title
                        </p>

                        {/* season dropdown */}
                        <CustomDropdown 
                            currentStatus={seasonProgress}
                            options={seasonOptions}
                            onSelect={(newVal) => {
                                setSeasonProgress(newVal)
                                // reset episode when season changes
                                setEpisodeProgress("")
                                setEpisodeTitle("")
                            }}
                        />
                        {/* episode dropdown */}
                        <CustomDropdown 
                            isDisabled={!seasonProgress}
                            currentStatus={episodeProgress}
                            options={episodeOptions}
                            onSelect={(newVal) => setEpisodeProgress(newVal)}
                        />
                        {/* episode title */}
                        <label 
                            className="text-[#23d33b] text-xl font-semibold
                            col-start-1 sm:col-start-3 col-end-3 sm:col-end-4 row-start-4 sm:row-start-2"
                        >
                            {episodeTitle || "Select an episode"}
                        </label>
                    </div>
                </div>


                {/* status */}
                <div className="flex flex-col gap-2 mt-4">
                    <label className="text-[#D69500] text-xl font-semibold">Status</label>
                    <MediaStatusBtn
                        disabled={false}
                        currentStatus={statusLabelState}
                        options={[
                            "Status: None",
                            "Watching",
                            "Completed",
                            "On Hold",
                            "Dropped",
                            "Plan to Watch",
                        ]}
                        onSelect={(newStatus) => handleSetStatus(newStatus)}
                    />
                </div>

                <CustomInput
                    label="Rating"
                    inputType="number"
                    placeholder="Series Rating: 1-10"
                    value={formData.rating.toString()}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            rating: parseInt(e.target.value),
                        });
                    }}
                />
            </div>

            {/* update series */}
            <button
                className="w-full py-2 sm:py-3 mt-6 bg-[#058000] text-white font-bold rounded-lg hover:bg-[#48d843] hover:text-black transition"
                onClick={handleEditSeriesItem}
            >
                Update Tv Show
            </button>
        </div>
    );
};



// edit movie form
export const EditMovieForm = ({ 
    id,
    title,
    imgUrl,
    year,
    director,
    status,
    rating,
    closeForm 
}: { 
    id: string;
    title: string;
    imgUrl: string;
    year: number;
    director: string;
    status: string;
    rating: number;
    closeForm: () => void 
}) => {
    // state
    const [formData, setFormData] = useState<MovieItem>({
        title: title,
        imgUrl: imgUrl,
        year: year,
        director: director,
        status: status,
        rating: rating,
    });
    const [statusLabelState, setStatusLabelState] = useState<string>(status);


    // handle set status
    const handleSetStatus = (status: string) => {
        setStatusLabelState(status);
        setFormData({ ...formData, status: status });
    };

    // handle edit movie item
    const handleUpdateMovieItem = async () => {
        // validate form data
        if (
            !checkEmptyInput(formData.title) ||
            !checkEmptyInput(formData.imgUrl) || 
            !checkEmptyInput(formData.director) || 
            formData.year == 0
        ) {
            alert("Required fields: Title, Image URL, direcor, year");
            return;
        }

        
        const updatedMovieItem = { ...formData }


        // update movie item
        try {
            await updateMovieItemByID(id, updatedMovieItem)
            console.log("movie updated successfully")

            
            // close form
            closeForm();

        } catch (error) {
            console.error("Failed to update movie:", error)
        }
    }

    return (
        <div className="bg-[#1f1f1f] rounded-2xl shadow-xl p-6 sm:p-10 w-full flex flex-col gap-6 text-white">
            {/* header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#D69500]">Update Movie</h2>
                <button
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition text-sm"
                    onClick={closeForm}
                >
                    Close
                </button>
            </div>

            {/* form fields */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    {/* input title */}
                    <CustomInput
                        label="Title"
                        inputType="text"
                        placeholder="Series Title"
                        value={formData.title}
                        onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                        }}
                    />
                </div>

                {/* cover img */}
                <CustomInput
                    label="Cover Image"
                    inputType="text"
                    placeholder="Image URL"
                    value={formData.imgUrl || ""}
                    onChange={(e) => {
                        setFormData({ ...formData, imgUrl: e.target.value });
                    }}
                />

                {/* Director */}
                <CustomInput
                    label="Director"
                    inputType="text"
                    placeholder="Director"
                    value={formData.director || ""}
                    onChange={(e) => {
                        setFormData({ ...formData, director: e.target.value });
                    }}
                />

                {/* year */}
                <CustomInput
                    label="Year"
                    inputType="text"
                    placeholder="Year"
                    value={formData.year.toString()}
                    onChange={(e) => {
                        setFormData({ ...formData, year: parseInt(e.target.value) });
                    }}
                />

                {/* status */}
                <div className="flex flex-col gap-2 mt-4">
                    <label className="text-[#D69500] text-xl font-semibold">Status</label>
                    <MediaStatusBtn
                        disabled={false}
                        currentStatus={statusLabelState}
                        options={[
                            "Status: None",
                            "Watching",
                            "Completed",
                            "On Hold",
                            "Dropped",
                            "Plan to Watch",
                        ]}
                        onSelect={(newStatus) => handleSetStatus(newStatus)}
                    />
                </div>

                {/* rating */}
                <CustomInput
                    label="Rating"
                    inputType="number"
                    placeholder="Series Rating: 1-10"
                    value={formData.rating.toString()}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            rating: parseInt(e.target.value),
                        });
                    }}
                />
            </div>

            {/* create series */}
            <button
                className="w-full py-2 sm:py-3 mt-6 bg-[#058000] text-white font-bold rounded-lg hover:bg-[#48d843] hover:text-black transition"
                onClick={handleUpdateMovieItem}
            >
                Update Movie
            </button>
        </div>
    );
};
