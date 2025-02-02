import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import PlayerInterface from "@/app/components/multiplayer/PlayerInterface";
import {redirect} from "next/navigation";
import {Button} from "@/app/ui";
import ButtonComponent from "@/app/quiz/host/[sessionId]/buttonComponent";

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

    async function incrementQuestionNb() {
        await updateDoc(doc(db, "sessions", id), {
            currentQIndex: 0,
        });
        redirect(`/Pages/${id}`);
    }

    const sessionData = await getSessionPlayers(sessionId);
    return (
        <div className="pt-16 h-screen">
            <div className="block font-bold text-center text-white bg-red-600">HOST</div>
            <h1 className="block w-full text-center text-4xl font-bold my-4">
                Use this code to join: {sessionId}
            </h1>
            <div className="flex justify-center flex-col items-center">
                <PlayerInterface sessionId={sessionId} data={sessionData} />
                <ButtonComponent id={sessionId} />
            </div>
            {/* Questions */}
        </div>
    );
}
