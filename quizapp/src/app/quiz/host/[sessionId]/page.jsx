import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase";
import PlayerInterface from "@/app/components/multiplayer/PlayerInterface";

async function getSessionPlayers(sessionId) {
    const querySnapshot = await getDoc(doc(db, "sessions", "a1234567890"));

    if (querySnapshot.exists())
        return querySnapshot.data();
    
    return {};
}

export async function handlePlayerTest(sessionId, playerId) {
    // Get data from server
    const sessionData = await getSessionPlayers(sessionId);

    // Update points
    for (let i = 0; i < sessionData.players.length; i++) {
        if (sessionData.players[i].id !== playerId) continue;

        sessionData.players[i].points = (sessionData.players[i].points + 1) || 0 ;
        break;
    }

    // Update data on server
    await updateDoc(doc(db, "sessions", "a1234567890"), {
        players: [...sessionData.players],
    });
}

export default async function Page({
    params,
}) {
    // Fetch session id from firebase
    const sessionId = (await params).sessionId;

    const sessionData = await getSessionPlayers(sessionId);
    return (
        <div>
            <div className="block font-bold text-center text-white bg-red-600">HOST</div>
            <h1 className="block w-full">Host: {sessionData.host}</h1>
            {sessionId}
            <PlayerInterface sessionId={sessionId} data={sessionData} />
            {/* Questions */}
        </div>
    )
}