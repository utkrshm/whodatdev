"use client";
import { useEffect, useState } from "react";

export default function Questions() {
    const [question, setQuestion] = useState("Is your character in the tech domain?");
    const [isLoading, setIsLoading] = useState(true);

    const options = ["yes", "no", "maybe", "maybe not"];

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
          backgroundImage: "url('/assets/questions-background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 1.0,
        }}
      />

            {/* Options Buttons in 2x2 Grid */}
{/* Options Buttons in 2x2 Grid */}
<div className="absolute top-[50%] left-[8%] z-10 w-[50%]">
  <div className="grid grid-cols-2 gap-8 w-full">
    {options.map((option, index) => {
      const imageFilenames = [
        'yesbutton.png',
        'nobutton.png',
        'maybebutton.png',
        'maybenotbutton.png'
      ];

      const bgImage = `/assets/${imageFilenames[index]}`;

      return (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className="relative w-[70%] h-[60px] text-white font-bold text-lg pixel-font hover:scale-105 transition-transform"
          style={{
            background: `url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        </button>
      );
    })}
  </div>
</div>
        </main>
    );
}
