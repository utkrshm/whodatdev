"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Results() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
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

      <div className="relative z-10 w-[90vw] max-w-[1280px] aspect-[16/9] mx-auto">
        {/* Floating elements */}
        <img src="/assets/pixil_amongus.png" className="absolute bottom-[-1px] left-[0px] w-[15%] z-1 rotate-[340deg] scale-x-[-1]" alt="weed1" />
        <img src="/assets/pixil_.png" className="absolute top-[27%] left-[17%] w-[7%] z-1 rotate-[340deg]" alt="weed1" />
        <img src="/assets/pixil_weed.png" className="absolute top-[35%] left-[23%] w-[3%] z-1 rotate-[30deg]" alt="weed2" />

        {/* Pink rectangle image as background */}
        <div className="absolute top-[20%] left-1/2 translate-x-[-50%] w-[40%]">
          <img src="/assets/pixil_pinkrectresults.png" alt="background-box" className="w-full" />

          {/* Overlayed content */}
          <div className="absolute mt-[50px] top-[-150px] left-[-10px] w-full h-full flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-extrabold tracking-widest mb-6 pixel-font text-black text-[40px]">my guess is</h1>
            <div className="flex items-center justify-center gap-2"></div>
            <div className="flex justify-center">
              <button 
                onClick={handleClick}
                className="relative w-[450px] h-[150px] mt-[-50px] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src="/assets/pixil_greyrectangle.png"
                  alt="button background"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="absolute inset-0 mb-[10px] flex items-center justify-center gap-2 pixel-font text-white text-base">
                  <span className="text-[30px] font-extrabold top-[40%]">GDSC</span>
                  <img src="/assets/pixil_gdsclogo.png" alt="gdsc" className="h-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

