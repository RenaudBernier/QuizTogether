'use client'
import TimerComponent from "../components/TimerComponent";
import CardComponent from "../components/CardComponent";
import Options from "../components/Options";
import { useState } from "react";
import Explanation from "./Explanation";

export default function Page() {
    const [questionNb, setQuestionNb] = useState(0);
    const [resultScreen, setResultScreen] = useState(false);
    console.log(questionNb);

    if (resultScreen == false)
        return (
            <div className="">
                <CardComponent/>
                <TimerComponent setResultScreen={setResultScreen}/>
                <Options answers={[{answer: "Yes"}, {answer: "No"}, {answer: "Maybe"}, {answer: "Sure"}]} />
            </div>
        )
    else
        return (
        <Explanation 
        questionNb={questionNb} setQuestionNb={setQuestionNb} setResultScreen={setResultScreen}/>
    )

}