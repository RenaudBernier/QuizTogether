import Image from "next/image";

export default function HeroBanner() {
    return (
        <div className=" bg-blue-100 w-full h-full relative">
            <Image src={"/hero_banner.png"} width={1920} height={1080} alt="Hero Banner"/>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                {/* <h1 className="uppercase font-bold text-[42px]">QuizIt</h1> */}
            </div>
        </div>
    )
}