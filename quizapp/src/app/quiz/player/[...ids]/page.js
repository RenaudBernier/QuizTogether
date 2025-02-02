import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import PlayerInterface from "@/app/components/multiplayer/PlayerInterface";
import AnswerPage from "@/app/quiz/player/[...ids]/anwerPage";



export async function getSession(sessionId) {
    let data = {};

    const querySnapshot = await getDoc(doc(db, "sessions", sessionId));

    if (querySnapshot.exists())
        data = {...querySnapshot.data()};
    console.log(data);
    return data;
}

async function handlePlayerJoin(sessionId, playerName, sessionData) {
    // Check to see if player exists
    if (sessionData.players[playerName])
        console.log("He's there");
    else {
        // Update players
        await updateDoc(doc(db, "sessions", sessionId), {
            [`players.${playerName}`]: {
                answer: 0,
                score: 0,
            },
        });
        }
    
}

export default async function Page({
                                       params,
                                   }) {
    // Fetch session id from firebase
    const ids = (await params).ids;
    const sessionID = ids[0];
    const name = ids[1];
    const sessionData = await getSession(sessionID);

    if (!sessionData) return <div>Session Not Found</div>;

    // When player joins -> update document to add player
    await handlePlayerJoin(...ids, sessionData);

    return (
        <div className="w-full">
            <div className="block font-bold text-center uppercase bg-blue-600 text-white">{ids[1]}</div>
            <AnswerPage name={name} sessionId={sessionID} sessionData={sessionData}/>
            {/*<PlayerInterface sessionId={ids[0]} data={sessionData} />*/}
        </div>
    )
}



// export default async function Page({
//     params,
// }) {
//     // Fetch session id from firebase
//     const ids = (await params).ids;
//     const sessionData = await getSession(ids[0]);
//
//
//     if (!sessionData) return <div>Session Not Found</div>;
//
//     // When player joins -> update document to add player
//     await handlePlayerJoin(...ids, sessionData);
//
//     return (
//         <div className="w-full">
//             <div className="block font-bold text-center uppercase bg-blue-600 text-white">{ids[1]}</div>
//             <h1 className="block w-full test">Host: {sessionData.host}</h1>
//             <PlayerInterface sessionId={ids[0]} data={sessionData} />
//         </div>
//     )
// }