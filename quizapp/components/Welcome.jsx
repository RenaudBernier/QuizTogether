"use client"
import React from 'react';
import Link from 'next/link';

const Welcome = () => {
  return (
    <>
        <h1 className="text-4xl font-bold text-black dark:text-white">
            Welcome to QuizMaster 🚀
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6 py-3">
            The ultimate quiz app for developers
        </p>
        <div className="flex space-x-4">
            <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Login
            </Link>
            <Link href="/signup" className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500">
                Sign Up
            </Link>
        </div>
    </>
  )
}

export default Welcome;