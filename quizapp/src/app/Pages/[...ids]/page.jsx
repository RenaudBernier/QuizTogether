'use client';
import { useState, useEffect } from "react";
import TimerComponent from "../../components/TimerComponent";
import CardComponent from "../../components/CardComponent";
import Options from "../../components/Options";
import Explanation from "../Explanation";
import { getSession } from "@/app/quiz/player/[...ids]/page";
import { useParams} from "next/navigation";
import {doc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "@/app/firebase";
import endRoundEarly from "@/app/Pages/endRoundEarly";
let timePerQuestion = Number(sessionStorage.getItem("timePerQuestion"));
if (!timePerQuestion)
    timePerQuestion = 20;
// Other imports ...

console.log("Time per question is now:", timePerQuestion);

export default function Page() {
    const [data, setData] = useState(null);
    const [questionNb, setQuestionNb] = useState(0);
    const [resultScreen, setResultScreen] = useState(false);
    const params = useParams();
    const ids = params?.ids;
    const id = ids ? ids[0] : null;
    const sessionRef = doc(db, "sessions", id);

    async function questionEnd(isQuestionTime){

        await updateDoc(doc(db, "sessions", id), {
            isQuestionTime: isQuestionTime,
        });
        if(isQuestionTime === 1){
            setResultScreen(false);
        }
        else {
            setResultScreen(true);
            await updateDoc(sessionRef, {
                numberOfAnswers: 0,
            })
        }
    }

    useEffect(() => {

        // This code runs only on the client.
        // Make sure to handle the case when `id` is null.
        const unsubscribe = onSnapshot(sessionRef, (docSnap) => {
            if (docSnap.exists()) {
                setData(docSnap.data());
                console.log("Current data updated", docSnap.data().numberOfAnswers);
            }
        });
    }, [id]);

    if(data)
        endRoundEarly(data, questionEnd);


    // While the data is loading, you can display a loading indicator.
    if (!data) {
        return <div>Loading...</div>;
    }

    const currentQuestion = data.questionBank[questionNb];
    const answers = currentQuestion.answers;

    return !resultScreen ? (
        <div>
            <CardComponent prompt={currentQuestion.prompt} />
            <TimerComponent setResultScreen={questionEnd} timePerQuestion={timePerQuestion} />
            <Options
                answers={[
                    { answer: answers[0] },
                    { answer: answers[1] },
                    { answer: answers[2] },
                    { answer: answers[3] },
                ]}
            />
        </div>
    ) : (
        <Explanation
            questionNb={questionNb}
            setQuestionNb={setQuestionNb}
            setResultScreen={questionEnd}
        />
    );
}