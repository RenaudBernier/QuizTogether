"use client"
import React, {useRef} from 'react'
import {redirect} from "next/navigation";

const JoinQuiz = () => {

    const name = useRef(null);
    const code = useRef(null);

    function clickHandler(e) {
        e.preventDefault();
        const nameVal = name.current.value;
        const codeVal = code.current.value;
        redirect(`/quiz/player/${codeVal}/${nameVal}`);
    }

  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Join Quiz</h2>
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-left" htmlFor="code">Code</label>
                <input ref={code} className="border-2 border-solid border-black rounded-sm px-1" type="text" id="code" name="code" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-left" htmlFor="name">Your Name</label>
                <input ref={name} className="border-2 border-solid border-black rounded-sm px-1" type="text" id="name" name="name" />
            </div>
            <button onClick={clickHandler} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" type="submit">Join</button>
        </form>
    </div>
  )
}

export default JoinQuiz;