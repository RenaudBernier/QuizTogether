'use client'
import { useState } from "react"


export default function Players({}) {
    const [players, setPlayers] = useState([
        {
            name: "John",
            points: 0,
        },
        {
            name: "Jude",
            points: 10,
        },
        {
            name: "Anne",
            points: 2,
        },
        {
            name: "Mary",
            points: 1,
        },
    ]);

    return (
        <div className="block">
            {players.map((player, index) => (
                <div key={index}>
                    <h4>{player.name}</h4>
                    <span>{player.points}</span>
                </div>
            ))}
        </div>
    )
}