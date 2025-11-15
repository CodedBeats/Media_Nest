interface OMDBMovieData {
    title: number;
    year: number;
    director: string;
    imgUrl: string;
}

export const getOMDBMovieData = async (movieName: string): Promise<OMDBMovieData> => {
    try {
        const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY

        const encodedMovieName = encodeURIComponent(movieName);
        const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${encodedMovieName}`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`)
        }

        const data = await response.json()
        console.log("movie data", data)
        
        return {
            title: data.Title, 
            year: data.Year,
            director: data.Director,
            imgUrl: data.Poster
        }

    } catch (err) {
        console.log("error fetching data", err)
        throw err
    }
}
