'use client'
import TimerComponent from "../components/TimerComponent";
import CardComponent from "../components/CardComponent";
import Options from "../components/Options";
import { useState } from "react";
import Explanation from "./Explanation";
import {getSession} from "@/app/quiz/player/[...ids]/page";

const id = sessionStorage.getItem("id");
const data = await getSession(id);

export default function Page() {
    const [questionNb, setQuestionNb] = useState(0);
    const [resultScreen, setResultScreen] = useState(false);
    console.log(questionNb);

    const currentQuestion = data.questionBank[questionNb];
    const answers = data.questionBank[questionNb].answers;

    if (resultScreen == false)
        return (
            <div className="">
                <CardComponent prompt={currentQuestion.prompt}/>
                <TimerComponent setResultScreen={setResultScreen}/>
                <Options answers={[{answer: answers[0]}, {answer: answers[1]}, {answer: answers[2]}, {answer: answers[3]}]} />
            </div>
        )
    else
        return (
        <Explanation 
        questionNb={questionNb} setQuestionNb={setQuestionNb} setResultScreen={setResultScreen}/>
    )

}