"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Predefined star positions (design preserved)
const STAR_POSITIONS = Array.from({ length: 30 }, () => ({
  top: Math.floor(Math.random() * 40),
  left: Math.floor(Math.random() * 100),
  size: 0.5
}));

const UIOptions = ["Yes", "No", "Probably Yes", "Probably No"];

function QuestionsContent() {
    const router = useRouter();

    // State for game data
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [currentQuestionText, setCurrentQuestionText] = useState("Loading question..."); // Initial text
    const [currentAttributeKey, setCurrentAttributeKey] = useState<string | null>(null);
    const [questionsAskedCount, setQuestionsAskedCount] = useState<number>(0);
    
    // UI Control States
    const [isLoadingInitial, setIsLoadingInitial] = useState(true); // For initial data load from URL/localStorage
    const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
    const [pageError, setPageError] = useState<string | null>(null);


    useEffect(() => {
        const sId = localStorage.getItem('akinator_session_id');
        const qText = localStorage.getItem('akinator_question_text');
        const attrKey = localStorage.getItem('akinator_attribute_key');
        const qAskedStr = localStorage.getItem('akinator_questions_asked');

        if (sId && qText && attrKey && qAskedStr) {
            setSessionId(sId);
            setCurrentQuestionText(qText);
            setCurrentAttributeKey(attrKey);
            setQuestionsAskedCount(parseInt(qAskedStr, 10));
            setIsLoadingInitial(false);
        } else {
            setPageError("Invalid game session or missing data. Please start a new game.");
            setIsLoadingInitial(false);
        }
    }, []);

    const handleAnswer = async (answerString: string) => {
        if (!sessionId || !currentAttributeKey || isSubmittingAnswer) return;

        setIsSubmittingAnswer(true);
        setPageError(null);

        try {
            const response = await fetch(`${API_URL}/questions`, { // Endpoint is /questions for submitting answers
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: sessionId,
                    attribute_key: currentAttributeKey,
                    answer: answerString // Send the string answer, e.g., "Yes", "No"
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: "Unknown error submitting answer." }));
                throw new Error(errorData.detail || `Server error: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.status === "playing") {
                setCurrentQuestionText(data.question_text);
                setCurrentAttributeKey(data.attribute_key);
                setQuestionsAskedCount(data.questions_asked);
                router.replace('/questions');
            } else if (data.status === "make_guess") {
                localStorage.setItem('akinator_guess_data', JSON.stringify({
                    guess: data.guess,
                    certainty: data.certainty,
                    message: data.message // Include message if any
                }));
                router.push(`/results`);
            } else if (data.status === "failure") {
                localStorage.setItem('akinator_guess_data', JSON.stringify({
                    guess: data.guess, // This will be "No guess" from backend
                    certainty: data.certainty, // May or may not be relevant for failure
                    message: data.message
                }));
                router.push(`/results?outcome=failure`);
            } else if (data.status === "error") { // Handle explicit error status from backend/algorithm
                 setPageError(data.message || "An error occurred in the game logic.");
            }else {
                throw new Error("Unknown response status from server.");
            }
        } catch (err: any) {
            console.error("Error submitting answer:", err);
            setPageError(err.message || "Could not submit answer. Please try again.");
        } finally {
            setIsSubmittingAnswer(false);
        }
    };

    if (isLoadingInitial) {
        return (
            <main className="relative min-h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center">
                <div className="text-white pixel-font text-xl">Initializing Game...</div>
            </main>
        );
    }

    if (pageError && !currentAttributeKey) { // If critical error prevents game flow
         return (
            <main className="relative min-h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                <p className="text-red-400 pixel-font text-2xl mb-6">{pageError}</p>
                <button
                    onClick={() => router.push('/')}
                    className="pixel-font text-lg bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
                >
                    Back to Home
                </button>
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
                        {currentQuestionText}
                    </p>
                </div>
            </div>

            {/* Options Buttons in 2x2 Grid */}
            <div className="absolute top-[50%] left-[8%] z-10 w-[50%]">
                <div className="grid grid-cols-2 gap-8 w-full">
                    {UIOptions.map((option, index) => (
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
            <div className="fixed bottom-[-150px] right-[-95px] w-[40vw] z-[5] pointer-events-none">
                <img
                    src="/assets/pixil_donutfinalre.png"
                    alt="big donut"
                    className="w-full"
                    style={{ marginBottom: "-1px" }}
                />
                <img 
                    src="/assets/pixil_crown.png" 
                    alt="crown" 
                    className="absolute top-[-16%] right-[39%] w-[25%] z-[6]"
                />
            </div>
        </main>
    );
}

export default QuestionsContent;
