"use client";

import { useEffect, useState } from "react";
import {doc, increment, onSnapshot, updateDoc} from "firebase/firestore";
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
        return (
            <div className="w-full h-8 text-[24px] font-bold text-white flex items-center justify-center bg-indigo-500 uppercase mb-4">
            Loading...</div>
        );
    }
    if (questionNb === -1) {
        return (
            <div className="w-full h-8 text-[24px] font-bold text-white flex items-center justify-center bg-indigo-500 uppercase mb-4">
                Please wait for the game to start
            </div>
        );
    }
    if (isQuestionTime === 0) {
        
        return (
            <div className="w-full h-8 text-[24px] font-bold text-white flex items-center justify-center bg-indigo-500 uppercase mb-4">
                Please wait for the host
            </div>
        );
    }

    const handleAnswerClick = async (answerIndex) => {
        console.log("Clicked answer:", answerIndex);
        setSelectedAnswer(answerIndex);
        await updateDoc(doc(db, "sessions", sessionId), {
            [`players.${name}.answer`]: answerIndex,
            [`numberOfAnswers`]: increment(1),
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">

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