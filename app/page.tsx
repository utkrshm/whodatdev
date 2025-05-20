"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleClick = () => {
    router.push('/questions');
  };

  if (isLoading) {
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
          backgroundImage: "url('/assets/home-background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 1.0,
        }}
      />

      {/* GDSC Button */}
      <div className="absolute top-[55%] left-1/2 translate-x-[-50%] w-[450px] h-[150px] z-20">
        <button 
          onClick={handleClick}
          className="relative w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/pixil_greyrectangle.png"
            alt="button background"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 pixel-font text-white text-base">
            <span className="text-[30px] font-extrabold">GDSC</span>
            <img src="/assets/pixil_gdsclogo.png" alt="gdsc" className="h-5" />
          </div>
        </button>
      </div>
    </main>
  );
}

