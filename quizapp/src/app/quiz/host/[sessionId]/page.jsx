import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase";
import Players from "@/app/components/multiplayer/Players";

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
            {sessionId}
            <Players data={sessionData} />
        </div>
    )
}