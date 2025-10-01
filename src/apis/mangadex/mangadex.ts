export async function getMangaDetails(mangaId: string) {
    // for npm run dev, no serverless function available, use direct api call
    // const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`);

    // fetch manga details from custom api route to avoid CORS issues
    const res = await fetch(`/api/mangadex/manga/${mangaId}`);

    if (!res.ok) throw new Error("failed to fetch manga");
    return res.json();
}

// get manga thumbnail img url
export async function getMangaCover(mangaID: string) {
    try {
        const mangaData = await getMangaDetails(mangaID);
        const coverRel = mangaData.data.relationships.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (rel: any) => rel.type === "cover_art"
        );
        if (!coverRel) throw new Error("no cover art found");

        const coverId = coverRel.id;
        const coverRes = await fetch(`/api/mangadex/coverImg/${coverId}`);
        
        if (!coverRes.ok) throw new Error("failed to fetch cover");
        const coverData = await coverRes.json();

        const fileName = coverData.data.attributes.fileName;
        const coverUrl = `https://uploads.mangadex.org/covers/${mangaID}/${fileName}.256.jpg`;
        
        // Verify the image actually loads
        const verifiedUrl = await verifyImageLoads(coverUrl);
        return verifiedUrl;
        
    } catch (error) {
        console.error('Error in getMangaCover:', error);
        throw error;
    }
}


// search for manga by title with many results
export async function getPossibleMangaByTitle(mangaTitle: string) {
    const baseUrl = 'https://api.mangadex.org';
    const response = await fetch(
        `${baseUrl}/manga?title=${encodeURIComponent(mangaTitle)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Manga search results:", data);
}



// ============================================================= //
// Helper function to verify image loads
async function verifyImageLoads(url: string, retries = 3): Promise<string> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, { 
                method: 'HEAD',
                cache: i === 0 ? 'reload' : 'no-cache' // Force reload on first try
            });
            
            if (response.ok) {
                // If it's not the first try, add cache busting
                if (i > 0) {
                    return `${url}?retry=${i}&t=${Date.now()}`;
                }
                return url;
            }
        } catch (error) {
            console.log(`Image verification attempt ${i + 1} failed:`, error);
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error(`Failed to load image after ${retries} attempts: ${url}`);
}

