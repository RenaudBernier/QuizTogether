import React from 'react'

const JoinQuiz = () => {
  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Join Quiz</h2>
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-left" htmlFor="code">Code</label>
                <input className="border-2 border-solid border-black rounded-sm px-1" type="text" id="code" name="code" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-left" htmlFor="name">Your Name</label>
                <input className="border-2 border-solid border-black rounded-sm px-1" type="text" id="name" name="name" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" type="submit">Join</button>
        </form>
    </div>
  )
}

export default JoinQuiz;