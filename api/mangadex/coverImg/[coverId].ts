// vercel types
import type { VercelRequest, VercelResponse } from "@vercel/node";

// === when deployed to vercel, it exposes this file as an API route === //

// handler for /api/mangadex/[coverId]
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { coverId } = req.query;

    try {
        const response = await fetch(
            `https://api.mangadex.org/cover/${coverId}`
        );
        if (!response.ok) {
            return res
                .status(response.status)
                .json({ error: "failed to fetch cover" });
        }

        const data = await response.json();

        // add proper CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "internal server error" });
    }
}
