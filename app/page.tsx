"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter();
  const [starPositions, setStarPositions] = useState<Array<{top: number, left: number, size: number}>>([]);
  const [isLoading, setIsLoading] = useState(true); // For initial star generation
  
  // New state for the start game button
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [startGameError, setStartGameError] = useState<string | null>(null);
  const [currentQuestionText, setCurrentQuestionText] = useState<string | null>(null);
  const [currentAttributeKey, setCurrentAttributeKey] = useState<string | null>(null);
  const [questionsAskedCount, setQuestionsAskedCount] = useState<number | null>(null);

  useEffect(() => {
    const positions = Array.from({ length: 30 }, () => ({
      top: Math.floor(Math.random() * 40),
      left: Math.floor(Math.random() * 100),
      size: 0.5
    }));
    setStarPositions(positions);
    setIsLoading(false); // For star generation
  }, []);

  // MODIFIED handleClick for the main button on the home page
  const handleClick = async () => {
    setIsStartingGame(true);
    setStartGameError(null);
    try {
      const response = await fetch(`${API_URL}/start_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error starting game." }));
        throw new Error(errorData.detail || `Server error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.session_id && data.status === "playing" && data.attribute_key && data.question_text) {
        localStorage.setItem('akinator_session_id', data.session_id);
        // Store question data in localStorage before navigating
        localStorage.setItem('akinator_question_text', data.question_text);
        localStorage.setItem('akinator_attribute_key', data.attribute_key);
        localStorage.setItem('akinator_questions_asked', data.questions_asked.toString());

        // Navigate to /questions without query parameters
        router.push('/questions');
      } else {
        throw new Error("Invalid response from server when starting game.");
      }
    } catch (err: any) {
      console.error("Error starting game:", err);
      setStartGameError(err.message || "Could not start the game. Please try again.");
      setIsStartingGame(false);
    }
    // Do not set isStartingGame to false here if navigation occurs,
    // as the component will unmount. It's set in the catch block.
  };

  if (isLoading) { // This isLoading is for star generation
    return (
      <main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden">
      {/* Background image with opacity */}
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

      {/* Starry Sky - now using client-side generated positions */}
      {starPositions.map((star, i) => (
        <img
          key={i}
          src="/assets/pixil_stars.png"
          alt="" // Decorative
          className="absolute z-[1] pointer-events-none opacity-80"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}rem`, // Control size via style
            height: `${star.size}rem`,
            objectFit: 'contain',
          }}
        />
      ))}

      {/* Rest of your component remains the same */}
      <div className="relative z-10 w-[90vw] max-w-[1280px] aspect-[16/9] mx-auto">
        {/* Floating elements */}
        <img src="/assets/pixil_clouds1.png" className="absolute top-[0.1%] left-[0px] w-[28%]" alt="" />
        <img src="/assets/pixil_clouds2.png" className="absolute top-[5%] right-[35%] w-[28%]" alt="" />
        <img src="/assets/pixil_clouds3.png" className="absolute top-[4%] right-[0px] w-[28%]" alt="" />
        <img src="/assets/pixil_specs.png" className="absolute top-[27%] right-[10%] w-[15%] rotate-12 z-1" alt="" />
        <img src="/assets/pixil_dinosaur.png" className="absolute bottom-[5%] left-[14%] w-[10%] z-1" alt="" />
        <img src="/assets/pixil_pinkdonut.png" className="absolute bottom-[5%] right-[16%] w-[7%] z-1 scale-x-[-1]" alt="" />
        <img src="/assets/pixil_weed.png" className="absolute top-[27%] left-[17%] w-[7%] z-1 rotate-[340deg]" alt="" />
        <img src="/assets/pixil_weed.png" className="absolute top-[35%] left-[23%] w-[3%] z-1 rotate-[30deg]" alt="" />

        {/* Pink rectangle image as background */}
        <div className="absolute top-[30%] left-1/2 translate-x-[-50%] w-[65%]">
          <img src="/assets/pixil_pinkrectangle.png" alt="background-box" className="w-full" />

          {/* Overlayed content */}
          <div className="absolute mt-[50px] top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-extrabold tracking-widest mb-6 pixel-font text-black text-[clamp(2rem,10vw,80px)]">WHO DAT DEV?</h1>
            <div className="flex justify-center items-center gap-2 mb-6">
              <img src="/assets/pixil_pacman.png" alt="pacman" className="h-6" />
              {[...Array(7)].map((_, i) => (
                <img key={i} src="/assets/pixil_pacfood.png" alt="" className="h-6" />
              ))}
            </div>
            {startGameError && (
              <p className="text-red-400 bg-black/50 p-2 rounded pixel-font text-sm mb-4 text-center">
                {startGameError}
              </p>
            )}
            <div className="flex justify-center">
              <button 
                onClick={handleClick} // This is now the async function
                disabled={isStartingGame} // Disable button while processing
                className="relative w-[clamp(200px,50vw,450px)] h-auto aspect-[3/1] mt-[-50px] cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <img
                  src="/assets/pixil_greyrectangle.png"
                  alt="button background"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="absolute inset-0 mb-[10px] flex items-center justify-center gap-2 pixel-font text-white text-base">
                  <span className="text-[clamp(1rem,5vw,30px)] font-extrabold top-[40%]">
                    {isStartingGame ? "Starting..." : "GDSC"} {/* Update text based on loading state */}
                  </span>
                  <img src="/assets/pixil_gdsclogo.png" alt="gdsc" className="h-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/pixil_buildings.png" alt="city" className="absolute bottom-0 left-0 w-full z-10" />
    </main>
  );
}
