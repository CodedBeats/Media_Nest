
//! unused
export async function getMangaDetails(mangaId: string) {
    const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
    if (!res.ok) throw new Error("failed to fetch manga");
    return res.json();
}

// get manga thumbnail img url
export async function getMangaCover(mangaID: string) {
    // get manga details
    const mangaData = await getMangaDetails(mangaID);

    // find the cover relationship
    const coverRel = mangaData.data.relationships.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rel: any) => rel.type === "cover_art"
    );
    if (!coverRel) throw new Error("no cover art found");

    const coverId = coverRel.id;

    // fetch cover details
    const coverRes = await fetch(`https://api.mangadex.org/cover/${coverId}`);
    if (!coverRes.ok) throw new Error("failed to fetch cover");
    const coverData = await coverRes.json();

    const fileName = coverData.data.attributes.fileName;

    // return setup api url
    return `https://uploads.mangadex.org/covers/${mangaID}/${fileName}`;
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


