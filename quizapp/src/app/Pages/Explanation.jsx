import Leaderboard from "../components/multiplayer/Leaderboard";
import {getSession} from "@/app/quiz/player/[...ids]/page";
import {useEffect, useState} from "react";

const id = sessionStorage.getItem("id");


export default function Explanation({questionNb, setQuestionNb, setResultScreen}) {

  const [players, setPlayers] = useState(null);

  // Fetch session data on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSession(id);
        setPlayers(data.players); // Update state with players
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []); // Empty dependency array runs it **only on mount**


  const handleClick = () => {
    setQuestionNb(questionNb+1);
    setResultScreen(false);
  }

  if(!players) return <div>Loading...</div>;
  else
    return (
        <div className="flex justify-between p-6 mt-20">
  <div className="w-1/2 space-y-6">
    <div className="bg-white h-80 shadow-lg rounded-lg p-10 border border-gray-200 text-center text-black font-bold text-2xl">
      <h1 className="mx-auto">Answer</h1>
      smth
    </div>
    <div className="bg-white h-80 shadow-lg rounded-lg p-10 border border-gray-200 text-center text-black font-bold text-2xl">
      <h1 className="mx-auto">Explanation</h1>
      smth
    </div>
  </div>

  <div className="w-1/2 ml-6">
    <div className="bg-white h-full shadow-lg rounded-lg p-10 border border-gray-200 text-center text-black font-bold text-2xl">
      <h1 className="mx-auto"></h1>
      <Leaderboard players={players}/>
      <button className="m-5 p-3 border-2 border-blue-500 bg-blue-500 rounded" onClick={handleClick}>Next</button>
    </div>
  </div>
</div>

        
        
    )
}

