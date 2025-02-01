import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase";
import Players from "@/app/components/multiplayer/PlayerInterface";

async function getSessionPlayers(sessionId) {
    const querySnapshot = await getDoc(doc(db, "sessions", "a1234567890"));

    if (querySnapshot.exists())
        return querySnapshot.data();
    
    return {};
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
            <Players sessionId={sessionId} data={sessionData} />
        </div>
    )
}