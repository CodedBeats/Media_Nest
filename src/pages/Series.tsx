// dependencies
import { useState } from "react";

// components
import Search from "../components/common/Search";
import { AddSeriesForm } from "../components/media/forms/AddMediaForms"
import SeriesCell from "../components/media/media-cell/SeriesCell";

// hooks
import { useAuth } from "../hooks/useFirebaseAuth";
import { useFetchAllSeriesItems } from "../hooks/useFirestore";


const Series = () => {
    // context
    const { user } = useAuth();
    // fetch manga from firebase with custom hook
    const { seriesItems, isLoading, error, refetch } = useFetchAllSeriesItems();

    // state
    // const [searchQuery, setSearchQuery] = useState<string>("");
    const [showAddSeriesForm, setShowAddSeriesForm] = useState<boolean>(false);


    return (
        <div className="flex flex-col items-center justify-start min-h-svh pb-20 bg-[#1a1a1a]">
            {/* background img header */}
            <div className="overflow-hidden w-full h-[12rem] md:h-[28rem] relative flex items-center justify-center">
                <img
                    className="w-full h-full object-cover object-center"
                    src="https://t4.ftcdn.net/jpg/02/16/48/61/360_F_216486141_IIwlsQfsnMzf6Br2yqlU7GTj0u09kWYs.jpg"
                    alt="Banner"
                />
                {/* gradient starts solid at top, begins fade around halfway */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 pt-12 md:pt-0">
                        Series Tracker
                    </h1>
                    {user && (
                        <button
                            className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 transition text-sm sm:text-base"
                            onClick={() => setShowAddSeriesForm(true)}
                        >
                            Add TV Show
                        </button>
                    )}
                </div>
            </div>

            {/* search + filters */}
            <div 
                className="flex flex-col items-center justify-center
                bg-[#141414] px-4 sm:px-8 py-6 rounded w-full gap-6"
            >
                {/* search */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <Search
                        onClick={() => {
                            // handleSearch(query)
                            console.log("implement search dumbass")
                        }}
                    />
                    <button 
                        className="px-4 py-2 text-white rounded border border-blue-500 hover:bg-blue-900 
                        transition w-full sm:w-auto"
                        type="button" 
                        // onClick={handleRefresh}
                        onClick={() => console.log("implement refresh dumbass")}
                    >
                        Refresh List
                    </button>
                </div>

                {/* filter */}
                <div className="flex justify-center items-center w-full h-full">
                    <div className="flex flex-row items-center justify-center gap-8 md:gap-10 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                                Status
                            </p>
                            <div className="flex-1 min-w-30">
                                {/* <MediaStatusBtn
                                    disabled={false}
                                    currentStatus={statusFilterState}
                                    options={["None", "Reading", "Completed", "On Hold", "Dropped", "Plan to Read"]}
                                    onSelect={handleFilterByStatus}
                                /> */}
                                <p className="text-gray-500">media status btn here</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm sm:text-base whitespace-nowrap">
                                Rating
                            </p>
                            <button
                                className="flex-1 px-3 py-1 text-white min-w-0 max-w-40
                                rounded border border-[#0CB321] hover:bg-[#0f661a] transition"
                                onClick={() => console.log("implement handleRatingFilter dumbass")}
                            >
                                {/* {ratingFilterState} */}
                                ratingFilterState here
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* manga list */}
            <div className="flex flex-col items-center justify-center w-full mt-6 px-3 gap-4 md:gap-0">
                {/* {filteredMangaItems.length === 0 && (
                    <p className="text-gray-500 text-center">No manga found.</p>
                )}
                {visibleManga.map((manga) => (
                    <MangaCell key={manga.id} {...manga} />
                ))}
                { visibleCount < filteredMangaItems.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Load More
                    </button>
                )} */}
            </div>

            {/* add series form */}
            {showAddSeriesForm && user && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 overflow-y-auto p-4">
                    <div className="mt-10 mb-10 w-full sm:w-[80%] md:w-[50%]">
                        <AddSeriesForm closeForm={() => setShowAddSeriesForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Series;

