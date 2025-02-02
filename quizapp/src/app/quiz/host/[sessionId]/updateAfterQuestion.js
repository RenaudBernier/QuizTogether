import {doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {getSession} from "@/app/quiz/player/[...ids]/page";
import {db} from "@/app/firebase";

export default async function updateAfterQuestion(sessionId, currentQIndex) {
    const data = await getSession(sessionId);
    console.log(data);
    const players = data.players;

    for (let playerName in players) {
        console.log("inside for loop", playerName);
        console.log(players[playerName]);
        if (players[playerName].answer === data.questionBank[data.currentQIndex].goodAnswer) {
            players[playerName].score += 1;
        }
        players[playerName].answer = -1;
    }
    await updateDoc(doc(db, "sessions", sessionId), {
        players: players,
        currentQIndex: currentQIndex + 1,
    });

};