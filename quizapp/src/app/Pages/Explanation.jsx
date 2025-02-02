import Leaderboard from "../components/multiplayer/Leaderboard";
import {getSession} from "@/app/quiz/player/[...ids]/page";
import {useEffect, useState} from "react";
import updateAfterQuestion from "@/app/quiz/host/[sessionId]/updateAfterQuestion";
const id = sessionStorage.getItem("id");


export default function Explanation({questionNb, setQuestionNb, setResultScreen}) {

  const [data, setData] = useState(null);

  // Fetch session data on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        await updateAfterQuestion(id, questionNb);
        const data = await getSession(id);
        setData(data); // Update state with players
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []); // Empty dependency array runs it **only on mount**


  const handleClick = () => {
    setQuestionNb(questionNb+1);
    setResultScreen(1);
  }


  const endClick = () => {
    window.location.href = "https://quizit.study";
  }

  if(!data || !data.players) return <div>Loading...</div>;
  else {
    const players = data.players;
    const goodAnswer = data.questionBank[questionNb].goodAnswer;
    const answer = data.questionBank[questionNb].answers[goodAnswer];
    const explanation = data.questionBank[questionNb].explanation;
    return (
        <div className="flex justify-between p-6 mt-20">
          <div className="w-1/2 space-y-6">
            <div
                className="bg-white h-80 shadow-lg rounded-lg p-10 border border-gray-200 text-center text-black font-bold text-2xl">
              <h1 className="mx-auto">Answer</h1>
              {answer}
            </div>
            <div
                className="bg-white h-80 shadow-lg rounded-lg p-10 border border-gray-200 text-center text-black font-bold text-2xl">
              <h1 className="mx-auto">Explanation</h1>
              {explanation}
            </div>
          </div>

          <div className="w-1/2 ml-6">
            <div
                className="bg-white h-full shadow-lg rounded-lg p-10 border border-gray-200 text-center text-black font-bold text-2xl">
              <h1 className="mx-auto"></h1>
              <Leaderboard players={players}/>
              <button className="m-5 p-3 border-2 border-blue-500 bg-blue-500 rounded" onClick={handleClick}>Next
              </button>
              <button className="m-5 p-3 border-2 border-blue-500 bg-blue-500 rounded" onClick={endClick}>End</button>
            </div>
          </div>
        </div>


    )
  }
}

