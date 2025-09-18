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
            <button className="px-6 py-2 bg-[#0CB321] text-white rounded hover:bg-[#1BCB31] transition" onClick={toggleDropdown}>
                {currentStatus} v
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                {options.map((option) => (
                    <div key={option} className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition" onClick={() => handleOptionSelect(option)}>
                        {option}
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default MediaStatusBtn;