export default function CardComponent({prompt}) {
    return(
        <div className="bg-[#ffffff] shadow-lg rounded-lg p-6 border border-gray-200 w-3/5 mx-auto mt-20 text-center  text-black font-bold text-2xl">
        <h1 className="mx-auto">{prompt}</h1>
      </div>
     )
}