"use client"
import JoinQuiz from '../../components/JoinQuiz';
import Welcome from '../../components/Welcome';
import HeroBanner from './components/landing-page/HeroBanner';
import FileDropzone from './dropzone component';
import {useRef, useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Loader from './components/landing-page/Loader';
import { Input } from '@mui/material';
import startTestQuiz from "@/app/debugging/startTestQuiz";

export default function Home() {
  const [status, setStatus] = useState(0);
  const [loader, setLoader] = useState(false);
  const timePerQuestion = useRef(null);
  const router = useRouter(); // Initialize Next.js Router

    useEffect(() => {
        sessionStorage.clear();
    }, []);
  
  const handleNext = () => {
    console.log("Next button clicked!");
    const id = sessionStorage.getItem("id");
    sessionStorage.setItem("timePerQuestion", timePerQuestion.current.value);
    console.log("Time per question set to:", timePerQuestion.current.value);

    if (id) {
      router.push(`/quiz/host/${id}`); // Navigate without refresh
    } else {
      console.error("No session ID found in sessionStorage.");
    }
  };

    return (
        <main className="flex flex-col justify-center gap-[32px] items-center min-h-screen text-center pt-16 md:pt:16 mx-auto ">
          <HeroBanner />
          <Welcome />
          <section className="flex flex-col gap-8 pb-12 items-center">
            <FileDropzone setStatus={setStatus} setLoader={setLoader} />
              <div className="flex items-center" >
                  <p>Time per question:</p>
                      <Input inputProps={{
                  className: 'text-center bg-gray-100 w-12 rounded-md',
              }}
                             inputRef={timePerQuestion}
                             type={"number"}></Input>
                  <p>seconds</p>

                  <button onClick={() => startTestQuiz(setStatus)}>TEST</button>

              </div>

          {/* Next Button: Only show if status is 1 */}
            {status === 1 ? (
              <button
                onClick={handleNext}
                className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
              >
                Next
              </button>
            ) : loader ? (
              <div className='fixed w-full h-full z-100'>
                <Loader />
              </div>
            ) : <></>
          }
          </section>
        </main>
    );
  }
  
