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
