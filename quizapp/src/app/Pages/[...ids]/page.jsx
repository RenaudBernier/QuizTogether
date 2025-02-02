'use client';
import { useState, useEffect } from "react";
import TimerComponent from "../../components/TimerComponent";
import CardComponent from "../../components/CardComponent";
import Options from "../../components/Options";
import Explanation from "../Explanation";
import { getSession } from "@/app/quiz/player/[...ids]/page";
import { useParams} from "next/navigation";
// Other imports ...

export default function Page() {
    const [data, setData] = useState(null);
    const [questionNb, setQuestionNb] = useState(0);
    const [resultScreen, setResultScreen] = useState(false);
    const params = useParams();
    const ids = params?.ids;
    const id = ids ? ids[0] : null;

    useEffect(() => {
        // This code runs only on the client.
        // Make sure to handle the case when `id` is null.
        getSession(id)
            .then((fetchedData) => {
                setData(fetchedData);
            })
            .catch((err) => {
                console.error("Error fetching session:", err);
            });
    }, []);

    // While the data is loading, you can display a loading indicator.
    if (!data) {
        return <div>Loading...</div>;
    }

    const currentQuestion = data.questionBank[questionNb];
    const answers = currentQuestion.answers;

    return !resultScreen ? (
        <div>
            <CardComponent prompt={currentQuestion.prompt} />
            <TimerComponent setResultScreen={setResultScreen} />
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
            setResultScreen={setResultScreen}
        />
    );
}