"use client";
import { useEffect, useState } from "react";

// Predefined star positions to ensure consistency between server and client
const STAR_POSITIONS = Array.from({ length: 30 }, () => ({
  top: Math.floor(Math.random() * 40),
  left: Math.floor(Math.random() * 100),
  size: 0.5
}));

export default function Questions() {
    const [question, setQuestion] = useState("Is your character in the tech domain?");
    const [isLoading, setIsLoading] = useState(true);

    const options = ["yes", "no", "maybe", "I don't know"];

    useEffect(() => {
        fetch("https://api.example.com/question")
            .then((res) => res.json())
            .then((data) => {
                if (data?.question) setQuestion(data.question);
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

            {/* Decorative Clouds */}
            <div className="relative z-10 w-[90vw] max-w-[1280px] aspect-[16/9] mx-auto">
                <img src="/assets/pixil_clouds1.png" className="absolute top-[0.1%] left-[0px] w-[28%]" alt="cloud1" />
                <img src="/assets/pixil_clouds2.png" className="absolute top-[5%] right-[35%] w-[28%]" alt="cloud2" />
                <img src="/assets/pixil_clouds3.png" className="absolute top-[4%] right-[0px] w-[28%]" alt="cloud3" />
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

            {/* Options Buttons in 2x2 Grid */}
            <div className="absolute top-[50%] left-[8%] z-10 w-[50%]">
                <div className="grid grid-cols-2 gap-8 w-full">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className="relative w-full h-[60px] text-white font-bold text-lg pixel-font hover:scale-105 transition-transform"
                            style={{ 
                                background: `url('/assets/pixil_answerre.png')`, 
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <span className="absolute inset-0 flex items-center justify-center">{option}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Hearts at Bottom of Screen */}
            <div className="fixed bottom-0 left-20 w-full z-[4] pointer-events-none">
                <img 
                    src="/assets/pixil_heartsre.png" 
                    alt="hearts" 
                    className="w-[26%] max-w-[300px] ml-[10px]"
                />
            </div>

            {/* Big Donut with Crown */}
            <div className="fixed bottom-[-150px] right-[-95px] w-[50vw] z-[5] pointer-events-none">
                <img
                    src="/assets/pixil_donutfinalre.png"
                    alt="big donut"
                    className="w-full"
                    style={{ marginBottom: "-1px" }}
                />
                <img 
                    src="/assets/pixil_crown.png" 
                    alt="crown" 
                    className="absolute top-[-15%] right-[39%] w-[25%] z-[6]"
                />
            </div>
        </main>
    );
}
