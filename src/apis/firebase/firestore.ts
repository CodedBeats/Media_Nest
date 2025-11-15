// firebase config
import { db } from "./firebaseConfig";
// dependencies
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

// utility
import { type MangaItem, type MovieItem, type SeriesItem } from "../../utility/interfaces";

const mangaCollection = "manga"
const seriesCollection = "series"
const moviesCollection = "movies"


// === CREATE === //
// create manga item
export const createMangaItem = async (mangaItem: MangaItem): Promise<void> => {
    try {
        await addDoc(collection(db, mangaCollection), mangaItem);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

// create tv show item
export const createSeriesItem = async (seriesItem: SeriesItem): Promise<void> => {
    try {
        await addDoc(collection(db, seriesCollection), seriesItem);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

// create movie item
export const createMovieItem = async (movieItem: MovieItem): Promise<void> => {
    try {
        await addDoc(collection(db, moviesCollection), movieItem)
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}


// === READ === //
// fetch manga item by id
export const fetchMangaItemByID = async (id: string): Promise<MangaItem | null> => {
    const docRef = doc(db, mangaCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // console.log("Document ID:", docSnap.id);
        return docSnap.exists() ? (docSnap.data() as MangaItem) : null;
    } else {
        console.log("No such document");
        return null;
    }
};

// fetch all manga items
export const fetchAllMangaItems = async (): Promise<MangaItem[]> => {
    const querySnapshot = await getDocs(collection(db, mangaCollection));
    const mangaItems: MangaItem[] = [];
    querySnapshot.forEach((doc) => {
        mangaItems.push({ id: doc.id, ...doc.data() } as MangaItem);
    });
    return mangaItems;
};


// fetch all series items
export const fetchAllSeriesItems = async (): Promise<SeriesItem[]> => {
    const querySnapshot = await getDocs(collection(db, seriesCollection));
    const seriesItems: SeriesItem[] = [];
    querySnapshot.forEach((doc) => {
        seriesItems.push({ id: doc.id, ...doc.data() } as SeriesItem);
    });
    return seriesItems;
};


// fetch all movie items
export const fetchAllMovieItems = async (): Promise<MovieItem[]> => {
    const querySnapshot = await getDocs(collection(db, moviesCollection));
    const movieItems: MovieItem[] = [];
    querySnapshot.forEach((doc) => {
        movieItems.push({ id: doc.id, ...doc.data() } as MovieItem);
    });
    return movieItems;
};



// === UPDATE === //
// update manga item by id
export const updateMangaItemByID = async (mangaID: string, updateMangaData: object): Promise<void> => {
    // console.log(mangaID)
    const docRef = doc(db, mangaCollection, mangaID);
    try {
        await updateDoc(docRef, updateMangaData);
    } catch (e) {
        console.error("error updating document: ", e);
        throw e;
    }
}


// update seriesItem by id
export const updateSeriesItemByID = async (seriesID: string, updatedSeriesData: object): Promise<void> => {
    const docRef = doc(db, seriesCollection, seriesID);
    try {
        await updateDoc(docRef, updatedSeriesData);
    } catch (e) {
        console.error("error updating document: ", e);
        throw e;
    }
}


// update moveItem by id
export const updateMovieItemByID = async (movieID: string, updatedMovieData: object): Promise<void> => {
    const docRef = doc(db, moviesCollection, movieID);
    try {
        await updateDoc(docRef, updatedMovieData);
    } catch (e) {
        console.error("error updating document: ", e);
        throw e;
    }
}



// === DELETE === //



