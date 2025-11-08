// dependencies
import { useState } from "react";

export const MediaStatusBtn = ({
    disabled = false,
    currentStatus,
    options,
    onSelect,
}: {
    disabled: boolean;
    currentStatus: string;
    options: string[];
    onSelect: (status: string) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        if (disabled) return;
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
                {/* down arrow if admin */}
                { !disabled && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                )}
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

