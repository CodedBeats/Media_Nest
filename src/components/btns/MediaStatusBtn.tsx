import { useState } from "react";

const MediaStatusBtn = ({
    currentStatus,
    options,
    onSelect,
}: {
    currentStatus: string;
    options: string[];
    onSelect: (status: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                className="flex items-center justify-between gap-2 px-3 py-1 bg-[#0CB321] text-white rounded hover:bg-[#1BCB31] transition"
                onClick={toggleDropdown}
            >
                <p>{currentStatus}</p>
                {/* down arrow */}
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-0 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
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

export default MediaStatusBtn;
