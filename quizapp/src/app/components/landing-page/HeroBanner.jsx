import Image from "next/image";

export default function HeroBanner() {
    return (
        <div className=" bg-blue-100 w-full h-[400px] relative">
            <Image src={"/hero_banner.png"} objectFit="cover" layout="fill" alt="Hero Banner"/>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                {/* <h1 className="uppercase font-bold text-[42px]">QuizIt</h1> */}
            </div>
        </div>
    )
}