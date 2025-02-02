import {setDoc, collection, doc} from "firebase/firestore";
import { db } from "@/app/firebase"; // Ensure correct import path

export async function sessionCreation(questionArr, setStatus) {
    try {
        if (!db) {
            console.error("Firestore database is not initialized.");
            return;
        }

        // Reference Firestore collection correctly
        const sessionsRef = collection(db, "sessions");

        const sessionId = Math.floor(Math.random()*10000);
        // Add a new document with a generated ID
        await setDoc(doc(db, "sessions", sessionId.toString()), {
            players: {},
            questionBank: questionArr,
            currentQIndex: -1,
        });
        console.log("Document written with ID: ", sessionId);
        sessionStorage.setItem("id", sessionId.toString());
        console.log("Session ID stored in sessionStorage");

        setStatus(1); //Flag to indicate session creation success
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}