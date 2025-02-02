import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase"; // Ensure correct import path

export async function sessionCreation(questionArr, setStatus) {
    try {
        if (!db) {
            console.error("Firestore database is not initialized.");
            return;
        }

        // Reference Firestore collection correctly
        const sessionsRef = collection(db, "sessions");

        // Add a new document with a generated ID
        const docRef = await addDoc(sessionsRef, {
            players: [],
            questionBank: questionArr,
            currentQIndex: 0,
            joinCode: Math.floor(Math.random()*10000),
        });
        console.log("Document written with ID: ", docRef.id);
        sessionStorage.setItem("id", docRef.id);
        console.log("Session ID stored in sessionStorage");

        setStatus(1); //Flag to indicate session creation success
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}