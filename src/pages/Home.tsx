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
                        Tracking everything I watch, read, and love. All in one
                        cozy nest.
                    </p>
                </div>

                {/* Media Buttons (Manual Placement Control) */}
                <div className="absolute inset-0 z-20">
                    {/* Movies */}
                    <FancyLink 
                        to="/coming-soon"
                        width= "16%"
                        height= "23%"
                        top= "24%"
                        left= "32%"
                        rotate= "80"
                    />

                    {/* Series */}
                    <FancyLink 
                        to="/coming-soon"
                        width= "12%"
                        height= "23%"
                        top= "24%"
                        left= "50%"
                        rotate= "10"
                    />

                    {/* Books */}
                    <FancyLink 
                        to="/coming-soon"
                        width= "11%"
                        height= "20%"
                        top= "56%"
                        left= "33%"
                        rotate= "70"
                    />

                    {/* Manga */}
                    <FancyLink 
                        to="/manga"
                        width= "13%"
                        height= "23%"
                        top= "53%"
                        left= "52%"
                        rotate= "22"
                    />
                </div>
            </div>
        </div>
    );
};


// fancy link with cool hover
const FancyLink = (
    {to, width, height, top, left, rotate}: 
    {to: string, width: string, height: string, top: string, left: string, rotate: string}
) => {
    return (
        <Link
            to={to}
            className="absolute border-4 border-transparent rounded-full transition-all duration-300 group"
            style={{
                width: width,
                height: height,
                top: top,
                left: left,
                transform: `rotate(${rotate}deg)`,
            }}
        >
            {/* blur edges */}
            <span className="absolute inset-0 rounded-xl opacity-0 blur-[10px] transition-opacity duration-300 group-hover:opacity-100"
                style={{
                background: `radial-gradient(
                    circle at center, 
                    rgba(255,255,255,0.35) 0%, 
                    rgba(255,255,255,0.15) 50%, 
                    rgba(255,255,255,0.1) 60%, 
                    rgba(255,255,255,0) 100%
                )`,
                }}
            ></span>
        </Link>
    );
};

export default Home;