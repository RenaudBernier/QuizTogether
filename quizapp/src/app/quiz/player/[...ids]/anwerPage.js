"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import React from "react";

const colors = ["#8789C0", "#50C878", "#FB607F", "#FFBF00"];

export default function AnswerPage({ name, sessionId, sessionData }) {
    const [questionNb, setQuestionNb] = useState(null);
    const [prompt, setPrompt] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [isQuestionTime, setIsQuestionTime] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        const docRef = doc(db, "sessions", sessionId);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                const key = snapshot.data();
                setQuestionNb(key.currentQIndex);
                if (key.currentQIndex >= 0) {
                    setAnswers(key.questionBank[key.currentQIndex].answers);
                    setPrompt(key.questionBank[key.currentQIndex].prompt);
                    setIsQuestionTime(key.isQuestionTime);
                }
            } else {
                setQuestionNb(null);
            }
        });

        return () => unsubscribe();
    }, [sessionId]);

    if (questionNb === null) {
        return <div>Loading...</div>;
    }
    if (questionNb === -1) {
        return <div>Please wait for the game to start</div>;
    }
    if (isQuestionTime === 0) {
        return <h1>Please wait for the host</h1>;
    }

    const handleAnswerClick = async (answerIndex) => {
        console.log("Clicked answer:", answerIndex);
        setSelectedAnswer(answerIndex);
        await updateDoc(doc(db, "sessions", sessionId), {
            [`players.${name}.answer`]: answerIndex,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">{prompt}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        style={{ backgroundColor: colors[index] }}
                        className={`rounded-xl text-white text-xl font-semibold p-8 hover:brightness-90 transition-colors ${
                            selectedAnswer === index
                                ? "ring-4 ring-offset-2 ring-blue-500"
                                : ""
                        }`}
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
}