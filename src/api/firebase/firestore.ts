// firebase config
import { db } from "./firebaseConfig";
// dependencies
import { doc, getDoc } from "firebase/firestore";
import { type MangaItem } from "../../utility/interfaces";

const mangaCollection = "manga";

export const fetchMediaItemByID = async (
    id: string
): Promise<MangaItem | null> => {
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
