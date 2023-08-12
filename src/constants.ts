import { collection } from "firebase/firestore"
import { db } from "./firebase"

export const imageCollectionRef = collection(db,'images')