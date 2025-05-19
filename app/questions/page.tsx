"use client";
import { useEffect, useState } from "react";

// Predefined star positions to ensure consistency between server and client
const STAR_POSITIONS = Array.from({ length: 30 }, () => ({
  top: Math.floor(Math.random() * 40),
  left: Math.floor(Math.random() * 100),
  size: 0.5
}));

export default function Questions() {
    const [question, setQuestion] = useState("is your character in the tech domain?");
    const [options, setOptions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.example.com/question")
            .then((res) => res.json())
            .then((data) => {
                if (data?.question) setQuestion(data.question);
                if (Array.isArray(data?.options)) setOptions(data.options);
            })
            .catch((err) => {
                console.error("Failed to fetch question:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleAnswer = async (option: string) => {
        try {
            await fetch("https://api.example.com/answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer: option }),
            });
        } catch (error) {
            console.error("Failed to send answer:", error);
        }
    };

    if (isLoading) {
        return (
            <main className="relative min-h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden">
            {/* Background and Stars */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/assets/grid-pattern.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    opacity: 0.2,
                }}
            />
            {STAR_POSITIONS.map((star, i) => (
                <img
                    key={i}
                    src="/assets/pixil_stars.png"
                    alt="star"
                    className="absolute z-[1] pointer-events-none opacity-80"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        width: `${star.size}rem`,
                        transform: `scale(${star.size})`,
                    }}
                />
            ))}

            {/* Rest of your component remains the same */}
            {/* Decorative Assets */}
            <div className="relative z-10 w-[90vw] max-w-[1280px] aspect-[16/9] mx-auto">
                <img src="/assets/pixil_clouds1.png" className="absolute top-[0.1%] left-[0px] w-[28%]" alt="cloud1" />
                <img src="/assets/pixil_clouds2.png" className="absolute top-[5%] right-[35%] w-[28%]" alt="cloud2" />
                <img src="/assets/pixil_clouds3.png" className="absolute top-[4%] right-[0px] w-[28%]" alt="cloud3" />
                <img src="/assets/pixil_crown.png" className="absolute top-[39%] right-[113px] w-[10%]" alt="crown" />
                <img src="/assets/pixil_heartsre.png" className="absolute bottom-[-210px] left-[10px] w-[26%]" alt="hearts" />
            </div>

            {/* Question Bubble */}
            <div className="absolute top-[15%] left-[8%] z-10 pointer-events-none">
                <div className="relative w-[60%]">
                    <img
                        src="/assets/pixil_questionbubblere.png"
                        alt="question bubble"
                        className="w-full"
                    />
                    <p className="absolute top-[28%] left-[12%] right-[12%] text-white text-base text-center leading-snug pixel-font text-[27px]">
                        {question}
                    </p>
                </div>
            </div>

            {/* Options Buttons */}
            <div className="absolute top-[60%] left-[8%] flex gap-4 z-10 flex-wrap max-w-[80%]">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="relative w-[200px] h-[60px] text-white font-bold text-lg pixel-font"
                        style={{ background: `url('/assets/pixil_answerre.png')`, backgroundSize: 'cover' }}
                    >
                        <span className="absolute inset-0 flex items-center justify-center">{option}</span>
                    </button>
                ))}
            </div>

            {/* Big Donut */}
            <img
                src="/assets/pixil_donutfinalre.png"
                alt="big donut"
                className="fixed bottom-[-150px] right-[-95px] w-[50vw] z-[1] pointer-events-none"
                style={{ marginBottom: "-1px" }}
            />
        </main>
    );
}
