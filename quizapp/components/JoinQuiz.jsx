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
    // <div className="flex flex-col gap-4">
    //     <h2 className="text-xl font-bold">Join Quiz</h2>
    //     <form className="flex flex-col gap-4">
    //         <div className="flex flex-col gap-2">
    //             {/* <label className="text-left" htmlFor="code">Code</label> */}
    //             <input ref={code} placeholder='CODE' className="border-2 border-solid border-black rounded-sm px-1" type="text" id="code" name="code" />
    //         </div>
    //         <div className="flex flex-col gap-2">
    //             <label className="text-left" htmlFor="name">Your Name</label>
    //             <input ref={name} placeholder='NAME' className="border-2 border-solid border-black rounded-sm px-1" type="text" id="name" name="name" />
    //         </div>
    //         <button onClick={clickHandler} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" type="submit">Join</button>
    //     </form>
    // </div>
<div className="flex flex-col gap-2 shadow-lg max-w-md">
    <h2 className="text-2xl font-bold text-center text-white capitalize">Play with friends</h2>
    <form className="flex flex-col gap-4 bg-white bg-opacity-20 p-6 rounded-xl">
        <div className="flex flex-col gap-2">
            <input 
                ref={code} 
                placeholder="CODE" 
                className="text-black uppercase w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-sm transition-all" 
                type="text" 
                id="code" 
                name="code" 
            />
        </div>
        <div className="flex flex-col gap-2">
            {/* <label className="text-lg font-medium text-gray-700" htmlFor="name">Your Name</label> */}
            <input 
                ref={name} 
                placeholder="NAME" 
                className="text-black uppercase w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-sm transition-all" 
                type="text" 
                id="name" 
                name="name" 
            />
        </div>
        <button 
            onClick={clickHandler} 
            className="w-full bg-indigo-500 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md"
            type="submit"
        >
            Join
        </button>
    </form>
</div>
  )
}

export default JoinQuiz;