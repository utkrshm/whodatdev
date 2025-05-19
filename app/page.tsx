"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [starPositions, setStarPositions] = useState<Array<{top: number, left: number, size: number}>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate star positions only on client side
    const positions = Array.from({ length: 30 }, () => ({
      top: Math.floor(Math.random() * 40),
      left: Math.floor(Math.random() * 100),
      size: 0.5
    }));
    setStarPositions(positions);
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
      <div className="relative z-10 w-[90vw] max-w-[1280px] aspect-[16/9] mx-auto">
        {/* Floating elements */}
        <img src="/assets/pixil_clouds1.png" className="absolute top-[0.1%] left-[0px] w-[28%]" alt="cloud1" />
        <img src="/assets/pixil_clouds2.png" className="absolute top-[5%] right-[35%] w-[28%]" alt="cloud2" />
        <img src="/assets/pixil_clouds3.png" className="absolute top-[4%] right-[0px] w-[28%]" alt="cloud3" />
        <img src="/assets/pixil_specs.png" className="absolute top-[27%] right-[10%] w-[15%] rotate-12 z-1" alt="sunglasses" />
        <img src="/assets/pixil_dinosaur.png" className="absolute bottom-[5%] left-[14%] w-[10%] z-1" alt="dino" />
        <img src="/assets/pixil_pinkdonut.png" className="absolute bottom-[5%] right-[16%] w-[7%] z-1 scale-x-[-1]" alt="donut" />
        <img src="/assets/pixil_weed.png" className="absolute top-[27%] left-[17%] w-[7%] z-1 rotate-[340deg]" alt="weed1" />
        <img src="/assets/pixil_weed.png" className="absolute top-[35%] left-[23%] w-[3%] z-1 rotate-[30deg]" alt="weed2" />

        {/* Pink rectangle image as background */}
        <div className="absolute top-[30%] left-1/2 translate-x-[-50%] w-[65%]">
          <img src="/assets/pixil_pinkrectangle.png" alt="background-box" className="w-full" />

          {/* Overlayed content */}
          <div className="absolute mt-[50px] top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-extrabold tracking-widest mb-6 pixel-font text-black text-[80px]">WHO DAT DEV?</h1>
            <div className="flex justify-center items-center gap-2 mb-6">
              <img src="/assets/pixil_pacman.png" alt="pacman" className="h-6" />
              {[...Array(7)].map((_, i) => (
                <img key={i} src="/assets/pixil_pacfood.png" alt={`pacfood${i}`} className="h-6" />
              ))}
            </div>
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

      {/* Cityscape stays on top */}
      <img src="/assets/pixil_buildings.png" alt="city" className="absolute bottom-0 left-0 w-full z-10" />
    </main>
  );
}
