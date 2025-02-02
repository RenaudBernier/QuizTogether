"use client"; // Marks this as a client component to use React states and events

import React from 'react';

export default function AnswerPage() {
    // Simple click handler for demo; adapt logic to your app
    const handleAnswerClick = (answerLabel) => {
        alert(`You selected: ${answerLabel}`);
        // e.g., call an API or navigate somewhere
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-tropical_indigo-500">
            <h1 className="text-4xl font-bold text-light_yellow-300 mb-8">
                Which is the correct answer?
            </h1>
            {/* Create a responsive grid of 4 buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                <button
                    onClick={() => handleAnswerClick('Answer A')}
                    className="rounded-xl bg-emerald-500 text-white text-xl font-semibold p-8
                     hover:bg-emerald-600 transition-colors"
                >
                    Answer A
                </button>

                <button
                    onClick={() => handleAnswerClick('Answer B')}
                    className="rounded-xl bg-bright_pink_crayola-500 text-white text-xl font-semibold p-8
                     hover:bg-bright_pink_crayola-600 transition-colors"
                >
                    Answer B
                </button>

                <button
                    onClick={() => handleAnswerClick('Answer C')}
                    className="rounded-xl bg-amber-500 text-white text-xl font-semibold p-8
                     hover:bg-amber-600 transition-colors"
                >
                    Answer C
                </button>

                <button
                    onClick={() => handleAnswerClick('Answer D')}
                    className="rounded-xl bg-light_yellow-300 text-tropical_indigo-900 text-xl font-semibold p-8
                     hover:bg-light_yellow-200 transition-colors"
                >
                    Answer D
                </button>
            </div>
        </div>
    );
}