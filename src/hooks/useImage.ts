// dependencies
import { useEffect, useState } from "react";


export const useImageLoader = (src: string) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!src) {
            setError(true);
            return;
        }

        const img = new Image();
        
        // add event listeners to the image
        img.onload = () => {
            console.log("Image loaded successfully:", src);
            setLoaded(true);
        };
        img.onerror = () => {
            console.error("Image failed to load:", src);
            setError(true);
        };
        img.src = src;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    return { loaded, error };
};
