// dependencies
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-svh bg-[#0e0e0e] text-white overflow-hidden">
            {/* Banner Section */}
            <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src="/imgs/media_nest_banner.png"
                    alt="Media Nest Banner"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

                {/* Title */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg">
                        Welcome to{" "}
                        <span className="text-[#D69500]">Media Nest</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl">
                        Tracking everything I watch, read, and love. All in one cozy nest.
                    </p>
                </div>

                {/* Media Buttons (Manual Placement Control) */}
                <div className="absolute inset-0 z-20">
                    {/* Movies */}
                    <Link
                        to="/coming-soon"
                        className="absolute border-4 border-transparent rounded-xl hover:bg-[#fff]/20 rotate-80 transition-all duration-300"
                        style={{
                            width: "230px",
                            height: "225px",
                            top: "19%",
                            left: "34%",
                        }}
                    />

                    {/* Series */}
                    <Link
                        to="/coming-soon"
                        className="absolute border-4 border-transparent rounded-xl hover:bg-[#fff]/20 rotate-10 transition-all duration-300"
                        style={{
                            width: "220px",
                            height: "210px",
                            top: "20%",
                            left: "50%",
                        }}
                    />

                    {/* Books */}
                    <Link
                        to="/coming-soon"
                        className="absolute border-4 border-transparent rounded-xl hover:bg-[#fff]/20 rotate-70 transition-all duration-300"
                        style={{
                            width: "170px",
                            height: "220px",
                            top: "57%",
                            left: "35%",
                        }}
                    />

                    {/* Manga */}
                    <Link
                        to="/manga"
                        className="absolute border-4 border-transparent rounded-xl hover:bg-[#fff]/20 rotate-20 transition-all duration-300"
                        style={{
                            width: "210px",
                            height: "200px",
                            top: "57%",
                            left: "53%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;