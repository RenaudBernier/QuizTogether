'use client'
import { db } from "@/app/firebase";
import { handlePlayerTest } from "@/app/quiz/host/[sessionId]/page";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"

// we need a function that pulls from the database

// 1. Create session
// When a session is created, we create a new document in /sessions
// As the new session is created, a join code is made

// 2. 

export default function PlayerInterface({ sessionId, data }) {
    const [sessionData, setSessionData] = useState(data);

    useEffect(() => {
        const docRef = doc(db, "sessions", sessionId);
        
        // Subscribe to real-time updates
        const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setSessionData(docSnap.data());
            }
        });

        return () => unsub(); // Cleanup on unmount
    }, [sessionId]);
    let i = 0;
    return (
        <div className="block min-h-80">
            <h2>Players: </h2>
            {sessionData?.players !== undefined ? (
                Object.keys(sessionData.players).map((name) => (
                    <div key={i++} className="flex justify-between">
                        <h4>{name}</h4>
                    </div>
                ))
            ) : (
                <p>No players joined yet.</p> // ✅ Handle empty or undefined players array
            )}
        </div>
    )
}