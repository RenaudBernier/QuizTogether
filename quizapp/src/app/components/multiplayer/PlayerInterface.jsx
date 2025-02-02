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

    return (
        <div className="block">
            <h2>JOIN CODE: {sessionData.joinCode || "Loading..."}</h2>

            {sessionData?.players?.length > 0 ? (
                sessionData.players.map((player, index) => (
                    <div key={index} className="flex justify-between">
                        <h4>{player.name}</h4>
                        <span>{player.points || 0}</span>
                        <button 
                            className="bg-blue-200 rounded-lg px-2 py-2" 
                            onClick={() => handlePlayerTest(sessionId, player.id)}
                        >
                            Test Button
                        </button>
                    </div>
                ))
            ) : (
                <p>No players joined yet.</p> // ✅ Handle empty or undefined players array
            )}
        </div>
    )
}