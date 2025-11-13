interface TvMazeShowData {
    tvMazeID: number;
    imgUrl: string;
    showName: string;
}

export const getTvMazeShowData = async (showName: string): Promise<TvMazeShowData> => {
    try {
        const encodedShowName = encodeURIComponent(showName);
        const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodedShowName}`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`)
        }

        const data = await response.json()
        // console.log("show data", data)
        return {
            tvMazeID: data.id, 
            imgUrl: data.image.original,
            showName: data.name
        }

    } catch (err) {
        console.log("error fetching data", err)
        throw err
    }
}


interface EpisodeData {
    seasonNum: number;
    episodeNum: number;
    episodeName: string;
}

export const getTvMazeShowEpisodes = async (showID: number): Promise<Array<EpisodeData>> => {
    try {
        const url = `https://api.tvmaze.com/shows/${showID}/episodes`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error, status: ${response.status}`)
        }

        const data = await response.json()
        // console.log("show seasons and episodes", data)

        // create arr of season, episode and episdoe name
        const episodeList = []
        for (let i = 0; i < data.length; i++) {
            const episodeData = { 
                seasonNum: data[i].season,
                episodeNum: data[i].number,
                episodeName: data[i].name
            }
                            
            episodeList.push(episodeData)
        }


        return episodeList

    } catch (err) {
        console.log("error fetching data", err)
        throw err
    }
}
