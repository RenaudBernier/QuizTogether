import {doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {getSession} from "@/app/quiz/player/[...ids]/page";
import {db} from "@/app/firebase";

export default async function updateAfterQuestion(sessionId) {
    const data = await getSession(sessionId);

    for (let playerName in data.players) {
        if (data.players[playerName].answer === data.questionBank[data.currentQIndex].answer) {
            data.players[playerName].score += 1;
        }
    }
    await updateDoc(doc(db, "sessions", sessionId), {
        players: [...data.players],
    });
};