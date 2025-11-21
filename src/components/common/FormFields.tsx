// dependencies
import { useState } from "react";


// custon form input (also cause updating tailwing classes in each div is a pain)
export const CustomInput = ({
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
            <label className="text-[#D69500] text-xl font-semibold mt-4">{label}</label>
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



export const CustomDropdown = ({
    isDisabled = false,
    currentStatus,
    options,
    onSelect,
}: {
    isDisabled?: boolean;
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
        <div className="relative w-full text-left sm:w-40">
            <button
                disabled={isDisabled}
                className="flex items-center justify-between w-full px-3 py-1 text-white rounded border border-[#0CB321] 
                hover:bg-[#0f661a] transition text-sm"
                onClick={toggleDropdown}
            >
                <p>{currentStatus}</p>
                {/* down arrow*/}
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
                <div className="absolute right-0 mt-1 w-full max-h-50 overflow-y-auto sm:w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
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