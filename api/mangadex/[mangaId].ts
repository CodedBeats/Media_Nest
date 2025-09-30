// vercel types
import type { VercelRequest, VercelResponse } from "@vercel/node";

// === when deployed to vercel, it exposes this file as an API route === //

// handler for /api/mangadex/[mangaId]
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { mangaId } = req.query;

    try {
        const response = await fetch(
            `https://api.mangadex.org/manga/${mangaId}`
        );
        if (!response.ok) {
            return res
                .status(response.status)
                .json({ error: "failed to fetch cover" });
        }

        const data = await response.json();

        // add CORS header
        res.setHeader("Access-Control-Allow-Origin", "*");

        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "internal server error" });
    }
}
