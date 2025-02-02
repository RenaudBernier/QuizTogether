
function comparePlayers(a, b) {
    if (a.score == b.score) return 0;
    return a.score > b.score ? -1 : 1;
}

function sortPlayers(players) {
    const playerArr = [];

    for (let key in players) {
        playerArr.push({
            name: key,
            score: players[key].score
        });
    }


    playerArr.sort(comparePlayers);

    return playerArr;
}

export default function Leaderboard({players}) {
    const playerArr = sortPlayers(players);
    return (
        <div className="pt-40">
            <h2 className="text-center font-bold text-2xl ">LEADERBOARD</h2>
            <div className="my-4 w-[80%] max-w-[600px] mx-auto">
                {playerArr.map((player, idx) => (
                    <div key={idx} className="flex justify-between first:!bg-emerald-400 first:text-white even:bg-amber-600 bg-red odd:bg-amber-400 py-2 px-4 first:rounded-t-lg last:rounded-b-lg first:shadow-md">
                        <h4 className="font-bold uppercase">
                            {player.name}
                        </h4>
                        <span className="font-bold">{player.score}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}