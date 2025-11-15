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


// format series item progress
export const extractSeriesProgress = (str: string) => {
    const progressAsArr = str.split("")
    
    // get indexes for spaces (needed just for the first 2)
    const spaceIndexs: number[] = []
    progressAsArr.forEach((letter, index) => {
        if (letter === " ") {
            spaceIndexs.push(index)
        }
    })
    
    const seasonNum = progressAsArr.slice(1, spaceIndexs[0]).join("") //S#
    const episodeNum = progressAsArr.slice(spaceIndexs[0] + 3, spaceIndexs[1]).join("") //EP#
    const episdoeName = progressAsArr.slice(spaceIndexs[1] + 1).join("")
    
    return { seasonNum, episodeNum, episdoeName }
}
