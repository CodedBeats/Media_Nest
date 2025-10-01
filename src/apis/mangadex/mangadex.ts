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
    // // get manga details
    // const mangaData = await getMangaDetails(mangaID);

    // // find the cover relationship
    // const coverRel = mangaData.data.relationships.find(
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     (rel: any) => rel.type === "cover_art"
    // );
    // if (!coverRel) throw new Error("no cover art found");

    // const coverId = coverRel.id;


    // // for npm run dev, no serverless function available, use direct api call
    // // const coverRes = await fetch(`https://api.mangadex.org/cover/${coverId}`);

    // // fetch cover details from custom api route to avoid CORS issues
    // const coverRes = await fetch(`/api/mangadex/coverImg/${coverId}`, {
    //     headers: {
    //         'Cache-Control': 'no-cache',
    //         'Pragma': 'no-cache'
    //     }
    // });


    // if (!coverRes.ok) throw new Error("failed to fetch cover");
    // const coverData = await coverRes.json();

    // const fileName = coverData.data.attributes.fileName;

    // // return setup api url
    // return `https://uploads.mangadex.org/covers/${mangaID}/${fileName}.256.jpg`;

    // ============================================================= //
    // get manga details
    const mangaData = await getMangaDetails(mangaID);

    // find the cover relationship
    const coverRel = mangaData.data.relationships.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rel: any) => rel.type === "cover_art"
    );
    if (!coverRel) throw new Error("no cover art found");

    const coverId = coverRel.id;

    // Use the debug function instead of direct fetch
    const coverData = await debugCoverFetch(coverId);

    const fileName = coverData.data.attributes.fileName;

    // cache-busting parameter
    const timestamp = Date.now();
    // return setup api url
    return `https://uploads.mangadex.org/covers/${mangaID}/${fileName}.256.jpg?t=${timestamp}`;
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
const debugCoverFetch = async (coverId: string) => {
    console.log('=== DEBUG COVER FETCH START ===');
    console.log('Cover ID:', coverId);
    
    try {
        const coverRes = await fetch(`/api/mangadex/coverImg/${coverId}`);
        console.log('Cover response status:', coverRes.status);
        console.log('Cover response ok:', coverRes.ok);
        console.log('Cover response headers:', Object.fromEntries(coverRes.headers.entries()));
        
        // Get the response as text first to see raw content
        const text = await coverRes.text();
        console.log('Cover response text length:', text.length);
        console.log('Cover response first 500 chars:', text.substring(0, 500));
        
        if (!coverRes.ok) {
            console.error('Cover fetch failed with status:', coverRes.status);
            throw new Error("failed to fetch cover");
        }

        // Parse back to JSON
        let coverData;
        try {
            coverData = JSON.parse(text);
            console.log('Cover data structure:', {
                hasData: !!coverData.data,
                dataKeys: coverData.data ? Object.keys(coverData.data) : 'no data',
                attributes: coverData.data?.attributes ? Object.keys(coverData.data.attributes) : 'no attributes'
            });
            console.log('FileName from cover data:', coverData.data?.attributes?.fileName);
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            console.log('Raw response that failed to parse:', text);
            throw new Error("failed to parse cover data");
        }
        
        console.log('=== DEBUG COVER FETCH END ===');
        return coverData;
    } catch (error) {
        console.error('=== DEBUG COVER FETCH ERROR ===', error);
        throw error;
    }
};

