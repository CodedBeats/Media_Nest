export const removeStartAndEndWhitespace = (str: string) => {
    return str.replace(/^\s+|\s+$/g, "");
};

export const capitalizeFirstLetter = (str: string) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const lowercaseFirstLetter = (str: string) => {
    if (str.length === 0) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
};

// weird input validation i'm doing cause I'm weird
export const checkEmptyInput = (input: string) => {
    if (input.length === 0) return false;
    if (/^\s*$/.test(input)) return false;
    return true;
};
