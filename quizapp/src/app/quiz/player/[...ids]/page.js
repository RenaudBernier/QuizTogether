import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
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
            [`playerCount`]: increment(1),
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
        <div className="w-full min-h-screen pt-24">
            <div className="g-0 m-0 w-full h-20 text-[48px] font-bold text-white flex items-center justify-center bg-indigo-500 uppercase">
            {ids[1]}
            </div>
            {/* <div className="w-full h-8 text-[24px] font-bold text-white flex items-center justify-center bg-emerald-500 uppercase mb-4">
                Waiting for next question...
            </div> */}
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