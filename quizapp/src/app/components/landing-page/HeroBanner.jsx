import Image from "next/image";
import JoinQuiz from "../../../../components/JoinQuiz";

export default function HeroBanner() {
    return (
        <div className=" bg-blue-100 w-full h-[500px] relative">
            <Image src={"/hero_banner.png"} objectFit="cover" layout="fill" alt="Hero Banner"/>
            <div className="absolute inset-0 flex items-center md:flex-row flex-col justify-around bg-black bg-opacity-60 text-white text-xl">
                <div className="pt-12 md:pt-0">
                    <h1 className="capitalize font-bold text-[36px] md:text-[42px] block mb-8 text-center md:text-left">
                        Your notes, your choices.
                    </h1>
                    <h2 className="block text-center text-sm md:text-md md:text-left">
                        Transforming the way you learn with friends.
                    </h2>
                </div>
                <JoinQuiz />
            </div>
        </div>
    )
}