"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Ensure useSearchParams is imported

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GuessData {
  guess: string;
  certainty: number;
  message?: string;
}

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // To read URL query parameters

  // Original state variables
  const [isLoading, setIsLoading] = useState(true);
  const [serverText, setServerText] = useState(''); // This will display the main guess or result message

  // Added state variables for functionality
  const [isConfirming, setIsConfirming] = useState(false); // For "Yes"/"No" button loading state
  const [apiError, setApiError] = useState<string | null>(null); // To show specific API errors if needed
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentGuessData, setCurrentGuessData] = useState<GuessData | null>(null); // Stores the actual guess object
  const [showConfirmationButtons, setShowConfirmationButtons] = useState(false);
  const [showPlayAgainButton, setShowPlayAgainButton] = useState(false); // Control visibility of your play again button

  useEffect(() => {
    const outcomeFromQuery = searchParams.get('outcome');
    const storedSessionId = localStorage.getItem('akinator_session_id');
    const storedGuessDataString = localStorage.getItem('akinator_guess_data');

    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      setServerText("No active game session. Please start over.");
      setShowPlayAgainButton(true); // Allow user to go back
      setIsLoading(false);
      return;
    }

    if (storedGuessDataString) {
      try {
        const parsedGuessData: GuessData = JSON.parse(storedGuessDataString);
        setCurrentGuessData(parsedGuessData); // Store the full guess data

        if (parsedGuessData.guess === "No guess" || outcomeFromQuery === 'failure') {
          // This is a direct failure message from the backend or previous step
          setServerText(parsedGuessData.message || "I couldn't make a guess this time.");
          setShowConfirmationButtons(false);
          setShowPlayAgainButton(true);
          localStorage.removeItem('akinator_guess_data'); // Clean up this specific item
        } else {
          // We have a guess to confirm
          let guessDisplayMessage = parsedGuessData.guess;

          setServerText(guessDisplayMessage);
          // setShowConfirmationButtons(false);
          setShowPlayAgainButton(true); // Hide "Play Again" while confirmation is pending
        }
      } catch (e) {
        console.error("Failed to parse guess data:", e);
        setServerText("Error processing game results.");
        setShowPlayAgainButton(true);
      }
    } else {
      // No guess data in local storage
      if (outcomeFromQuery === 'failure') {
        setServerText("I couldn't make a guess (status: failure).");
      } else {
        setServerText("No guess information was found.");
      }
      setShowPlayAgainButton(true);
    }
    setIsLoading(false);
  }, [searchParams]); // Only re-run if searchParams change

  const handleConfirmation = async (userConfirmsCorrect: boolean) => {
    if (!sessionId || !currentGuessData || currentGuessData.guess === "No guess") {
      setApiError("Cannot process confirmation: Critical information missing.");
      setServerText("Error: Could not process confirmation."); // Update main text
      setShowPlayAgainButton(true);
      setShowConfirmationButtons(false);
      return;
    }

    setIsConfirming(true);
    setApiError(null);
    setShowConfirmationButtons(false); // Hide buttons once an action is taken

    try {
      const response = await fetch(`${API_URL}/confirm_guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          guessed_character_name: currentGuessData.guess,
          user_confirms_correct: userConfirmsCorrect,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.detail || `Server error: ${response.status}`);
      }

      // Update serverText with the outcome from the backend
      if (userConfirmsCorrect) {
        if (responseData.status === "finished_won") {
          setServerText(responseData.message || `Great! I knew it was ${currentGuessData.guess}!`);
          // Full cleanup for a won game
          localStorage.removeItem('akinator_session_id');
          localStorage.removeItem('akinator_guess_data');
          localStorage.removeItem('akinator_question_text');
          localStorage.removeItem('akinator_attribute_key');
          localStorage.removeItem('akinator_questions_asked');
        } else {
          setServerText(responseData.message || `Confirmation status: ${responseData.status}`);
        }
      } else { // User said the guess was incorrect
        if (responseData.status === "playing") {
          // Game continues, store new question data
          localStorage.setItem('akinator_question_text', responseData.question_text);
          localStorage.setItem('akinator_attribute_key', responseData.attribute_key);
          localStorage.setItem('akinator_questions_asked', responseData.questions_asked.toString());
          localStorage.removeItem('akinator_guess_data'); // Remove old guess
          router.push('/questions'); // Navigate to questions page
          return; // Important: exit early as we are navigating away
        } else if (responseData.status === "failure") {
          setServerText(responseData.message || "You beat me! I couldn't guess after all.");
          localStorage.removeItem('akinator_session_id'); // Clean up session
          localStorage.removeItem('akinator_guess_data');
        } else {
          setServerText(responseData.message || `Unexpected status: ${responseData.status}`);
        }
      }
    } catch (err: any) {
      console.error("Error confirming guess:", err);
      setApiError(err.message); // Set specific API error
      setServerText(err.message || "Could not submit your confirmation. Please try again."); // Update main text
    } finally {
      setIsConfirming(false);
      setShowPlayAgainButton(true); // Always show "Play Again" after a confirmation attempt
    }
  };

  // This replaces your original handleClick for the "Try Again" button
  const handlePlayAgain = () => {
    // Clear all game-related local storage for a fresh start
    localStorage.removeItem('akinator_session_id');
    localStorage.removeItem('akinator_guess_data');
    localStorage.removeItem('akinator_question_text');
    localStorage.removeItem('akinator_attribute_key');
    localStorage.removeItem('akinator_questions_asked');
    router.push('/');
  };

  if (isLoading) {
    return (
      <main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center">
        {/* Using your original loading text styling */}
        <div className="text-white pixel-font text-xl">Loading...</div>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center">
      {/* Background image - original styling */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/results-background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 1.0,
        }}
      />

      {/* Foreground content - original structure */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Display server text (guess or final message) - original styling */}
        <div className="p-6 rounded-xl text-center mt-[-100] max-w-[90vw] sm:max-w-[400px] break-words overflow-auto">
          <p className="text-xl pixel-font text-[40px] whitespace-pre-line break-words">{serverText}</p>
        </div>

        {/* Conditionally rendered confirmation buttons */}
        {/* These are new. You'll want to style them to match your app's aesthetic. */}
        {/* You can replace these with your own image buttons if you have them. */}
        {showConfirmationButtons && (
          <div className="mt-6 flex flex-col sm:flex-row gap-x-4 gap-y-3 items-center"> {/* Adjusted margin and gap */}
            <button
              onClick={() => handleConfirmation(true)}
              disabled={isConfirming}
              // Example styling - adapt or replace with your image button
              className="pixel-font text-lg bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-5 rounded-md shadow-md disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isConfirming ? "Checking..." : "Yes, that's it!"}
            </button>
            <button
              onClick={() => handleConfirmation(false)}
              disabled={isConfirming}
              // Example styling - adapt or replace with your image button
              className="pixel-font text-lg bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-5 rounded-md shadow-md disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isConfirming ? "Checking..." : "No, wrong guess!"}
            </button>
          </div>
        )}

        {/* Optional: Display API-specific errors separately if needed */}
        {apiError && (
          <p className="text-red-400 bg-black/60 p-2 rounded pixel-font text-xs mt-3 text-center">
            Error: {apiError}
          </p>
        )}
        
        {/* Try Again Button - uses your original structure and image */}
        {/* Visibility is controlled by showPlayAgainButton state */}
        {showPlayAgainButton && (
          <button
            onClick={handlePlayAgain} // Changed from handleClick
            disabled={isConfirming} // Prevent clicking if a confirmation is somehow processing
            className="absolute bottom-50" // Your original class
          >
            <img
              src="/assets/tryagainbutton_res.png"
              alt="Try Again"
              className="w-[100%] h-auto hover:opacity-90 transition-opacity" // Your original classes
            />
          </button>
        )}
      </div>
    </main>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center"><div className="text-white pixel-font text-xl">Loading...</div></main>}>
      <ResultsContent />
    </Suspense>
  );
}