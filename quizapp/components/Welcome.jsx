"use client"
import React from 'react';
import Link from 'next/link';

const Welcome = () => {
  return (
    <section className="flex flex-col">
        <h1 className="text-4xl font-bold text-black dark:text-white capitalize">
            Start your own game
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 py-1 italic">
            Battle of wits.
        </p>
        <p className='text-lg text-neutral-500 dark:text-neutral-400'> 
            Upload your notes and see who knows better!
        </p>
        {/* <div className="flex justify-center space-x-4">
            <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Login
            </Link>
            <Link href="/signup" className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500">
                Sign Up
            </Link>
        </div> */}
    </section>
  )
}

export default Welcome;