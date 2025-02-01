'use client'
import { useState } from "react"

// we need a function that pulls from the database

// 1. Create session
// When a session is created, we create a new document in /sessions
// As the new session is created, a join code is made

// 2. 

export default function Players({ data }) {
    console.log(JSON.stringify(data, null, 2));
    
    const [players, setPlayers] = useState(data.players || []);
    // const [players, setPlayers] = useState([
    //     {
    //         name: "John",
    //         points: 0,
    //     },
    //     {
    //         name: "Jude",
    //         points: 10,
    //     },
    //     {
    //         name: "Anne",
    //         points: 2,
    //     },
    //     {
    //         name: "Mary",
    //         points: 1,
    //     },
    // ]);

    return (
        <div className="block">
            <h2>JOIN CODE: {data.joinCode}</h2>
            {players.map((player, index) => (
                <div key={index}>
                    <h4>{player.name}</h4>
                    <span>{player.points}</span>
                </div>
            ))}
        </div>
    )
}