"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Results() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [serverText, setServerText] = useState('');

  useEffect(() => {
    // Simulate fetching data from server
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Replace with actual fetch call: const res = await fetch('/api/your-endpoint');
        // const data = await res.json();
        const data = { message: "Noel Alex" };
        setServerText(data.message);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setServerText("Error fetching results.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
<main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden flex items-center justify-center">
  {/* Background image */}
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

{/* Foreground content */}
<div className="relative z-10 flex flex-col items-center justify-center h-full">
  {/* Display server text */}
  <div className="p-6 rounded-xl text-center mt-[-100]">
    <p className="text-xl pixel-font text-[50px]">{serverText}</p>
  </div>

  {/* Try Again Button - pinned to the bottom */}
  <button
    onClick={handleClick}
    className="absolute bottom-50"
  >
    <img
      src="/assets/tryagainbutton_res.png"
      alt="Try Again"
      className="w-[100%] h-auto hover:opacity-90 transition-opacity"
    />
  </button>
</div>
</main>
  );
}

