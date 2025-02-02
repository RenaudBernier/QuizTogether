import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteSession(sessionId) {
    try {
        // Delete session from Firestore
        await deleteDoc(doc(db, "sessions", sessionId));
        console.log("Successfully deleted session.");
    } catch (error) {
        console.error("Could not delete session from Firestore.");
    } finally {
        // Delete session stored in local/sessionStorage
        // regardless of what happens
        sessionStorage.removeItem("id");
    }
}