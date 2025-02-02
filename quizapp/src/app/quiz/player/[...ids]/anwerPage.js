"use client";

import { useEffect, useState } from 'react';
import {doc, onSnapshot, updateDoc} from 'firebase/firestore';
import { db } from "@/app/firebase";

import React from 'react';

const colors = ["#8789C0", "#50C878", "#FB607F", "#FFBF00"];

export default function AnswerPage({name, sessionId, sessionData}) {

    const [questionNb, setQuestionNb] = useState(null);

    useEffect(() => {
        // Replace 'myCollection' and 'myDocId' with your actual collection/doc
        const docRef = doc(db, 'sessions', sessionId);

        // Listen to real-time updates
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                const key = snapshot.data();
                setQuestionNb(key.currentQIndex);
            } else {
                setQuestionNb(null);
            }
        });

        // Cleanup the listener when component unmounts
        return () => unsubscribe();
    }, []);

    if(questionNb === null) {
        return <div>Loading...</div>;
    }
    if(questionNb === -1) {
        return <div>Please Wait for the game to start</div>;
    }

    // Simple click handler for demo; adapt logic to your app
    const handleAnswerClick = async (answerLabel) => {

        await updateDoc(doc(db, "sessions", sessionId), {
            [`players.${name}.answer`]: answerLabel,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-4xl font-bold mb-8">
                Which is the correct answer?
            </h1>
            {/* Create a responsive grid of 4 buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                <button
                    onClick={() => handleAnswerClick(0)}
                    style={{backgroundColor: colors[0]}}
                    className="rounded-xl text-white text-xl font-semibold p-8 hover:brightness-90 transition-colors"
                >
                    Answer A
                </button>

                <button
                    onClick={() => handleAnswerClick(1)}
                    style={{backgroundColor: colors[1]}}
                    className="rounded-xl text-white text-xl font-semibold p-8 hover:brightness-90 transition-colors"
                >
                    Answer B
                </button>

                <button
                    onClick={() => handleAnswerClick(2)}
                    style={{backgroundColor: colors[2]}}
                    className="rounded-xl text-white text-xl font-semibold p-8 hover:brightness-90 transition-colors"
                >
                    Answer C
                </button>

                <button
                    onClick={() => handleAnswerClick(3)}
                    style={{backgroundColor: colors[3]}}
                    className="rounded-xl text-white text-xl font-semibold p-8 hover:brightness-90 transition-colors"
                >
                    Answer D
                </button>
            </div>
        </div>
    );
}