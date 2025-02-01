'use client'
import { db } from "@/app/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"

// we need a function that pulls from the database

// 1. Create session
// When a session is created, we create a new document in /sessions
// As the new session is created, a join code is made

// 2. 

export default function PlayerInterface({ sessionId, data }) {
    console.log(JSON.stringify(data, null, 2));
    
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
            <h2>JOIN CODE: {data.joinCode}</h2>
            {sessionData.players.map((player, index) => (
                <div key={index}>
                    <h4>{player.name}</h4>
                    {/* <span>{player.points}</span> */}
                </div>
            ))}
        </div>
    )
}