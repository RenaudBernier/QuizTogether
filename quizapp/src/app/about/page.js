"use client"; // Ensure interactivity support

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter(); // Next.js router for navigation

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 pt-28 md:pt-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center">🚀 The Ultimate Quiz Experience</h1>
      
      <p className="text-lg text-gray-600 text-center mt-4 max-w-3xl">
        Welcome to <span className="font-semibold text-blue-600">Quizmaster</span>, the interactive quiz platform designed 
        to make learning and engagement more fun, dynamic, and competitive! Whether you're a teacher looking to boost 
        classroom participation, a corporate trainer aiming for effective learning, or a quiz enthusiast hosting 
        game nights—Quizmaster is built for you.
      </p>

      {/* 🎯 Mission */}
      <section className="mt-8 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">🎯 Our Mission</h2>
        <p className="text-gray-700 mt-2">
          At Quizmaster, we believe that learning should be engaging, accessible, and rewarding. Our platform empowers 
          educators, students, and professionals by offering a seamless way to create, host, and participate in quizzes—anytime, anywhere.
        </p>
      </section>

      {/* ✨ What We Offer */}
      <section className="mt-8 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">✨ What We Offer</h2>
        <ul className="mt-4 text-gray-700 space-y-3">
          <li>✅ <b>Easy Quiz Creation</b> – Upload documents, generate quizzes instantly, or craft custom questions.</li>
          <li>✅ <b>Live & Interactive Hosting</b> – Engage players in real-time with instant feedback.</li>
          <li>✅ <b>AI-Powered Assistance</b> – Smart quiz generation from PDFs and text content.</li>
          <li>✅ <b>Seamless Participation</b> – Join with a simple code, no sign-ups needed.</li>
          <li>✅ <b>Real-Time Analytics</b> – Track performance and improve learning outcomes.</li>
        </ul>
      </section>

      {/* 🌎 Who Can Use Quizmaster? */}
      <section className="mt-8 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">🌎 Who Can Use Quizmaster?</h2>
        <p className="text-gray-700 mt-2">
          <b>Teachers & Educators:</b> Make lessons fun and interactive. <br />
          <b>Students & Learners:</b> Study smarter, test knowledge, and challenge friends. <br />
          <b>Corporate Teams:</b> Conduct training and team-building activities. <br />
          <b>Event Hosts:</b> Run engaging trivia nights, competitions, and more.
        </p>
      </section>

      {/* 📈 Our Vision */}
      <section className="mt-8 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">📈 Our Vision</h2>
        <p className="text-gray-700 mt-2">
          We aim to redefine how people learn, teach, and compete, turning knowledge-sharing into a more 
          collaborative and enjoyable experience.
        </p>
      </section>

      {/* CTA Button */}
      <button 
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={() => router.push("/")} // Navigate to Home
      >
        Get Started
      </button>
    </main>
  );
}