// firebase config
import { db } from "./firebaseConfig";
// dependencies
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { type MangaItem } from "../../utility/interfaces";

const mangaCollection = "manga";


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


// === DELETE === //



