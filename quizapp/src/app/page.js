"use client"
import JoinQuiz from '../../components/JoinQuiz';
import Welcome from '../../components/Welcome';
import FileDropzone from './dropzone component';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [status, setStatus] = useState(0);
  const router = useRouter(); // ✅ Initialize Next.js Router
  
  const handleNext = () => {
    console.log("Next button clicked!");
    const id = sessionStorage.getItem("id");

    if (id) {
      router.push(`/quiz/host/${id}`); // ✅ Navigate without refresh
    } else {
      console.error("No session ID found in sessionStorage.");
    }
  };

    return (
        <main className="flex flex-col justify-center gap-[32px] items-center min-h-screen text-center pt-24 md:pt:16 mx-auto px-6">
          <Welcome />
          <section className="flex flex-col md:flex-row gap-8">
            <FileDropzone setStatus={setStatus} />
            <JoinQuiz />
          </section>

          {/* Next Button: Only show if status is 1 */}
          {status === 1 && (
            <button
              onClick={handleNext}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Next
            </button>
          )}
        </main>
    );
  }
  