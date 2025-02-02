import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase";
import PlayerInterface from "@/app/components/multiplayer/PlayerInterface";

async function getSessionPlayers(sessionId) {
    let data = {};

    const querySnapshot = await getDoc(doc(db, "sessions", "a1234567890"));

    if (querySnapshot.exists())
        data = {...querySnapshot.data()};
    
    return data;
}

async function handlePlayerJoin(sessionId, playerId, sessionData) {
    // Check to see if player exists
    if (sessionData.players.find((player) => player.name == playerId))
        console.log("He's there");
    else {
        // Update players
        await updateDoc(doc(db, "sessions", "a1234567890"), {
            players: [...sessionData.players, {
                id: sessionData.players.length - 1,
                points: 0,
                name: playerId,
            }]
        });
        
    }
    
}

export default async function Page({
    params,
}) {
    // Fetch session id from firebase
    const ids = (await params).ids;    
    const sessionData = await getSessionPlayers(ids[0]);


    if (!sessionData) return <div>Session Not Found</div>;
    
    // When player joins -> update document to add player
    await handlePlayerJoin(...ids, sessionData);

    return (
        <div className="w-full">
            <div className="block font-bold text-center uppercase bg-blue-600 text-white">{ids[1]}</div>
            <h1 className="block w-full test">Host: {sessionData.host}</h1>
            <PlayerInterface sessionId={ids[0]} data={sessionData} />
        </div>
    )
}