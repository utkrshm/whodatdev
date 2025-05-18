export default function Home() {
  return (
    <main className="relative w-full h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden">
      {/* 🔧 Background image with opacity */}
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

      {/* ⭐ Starry Sky */}
{[...Array(30)].map((_, i) => {
  const top = Math.floor(Math.random() * 40); // upper 40% of screen
  const left = Math.floor(Math.random() * 100); // 0 to 100% width
  const size = 0.5; // scale 0.5x to 2x
  return (
    <img
      key={i}
      src="/assets/pixil_stars.png"
      alt="star"
      className="absolute z-[1] pointer-events-none opacity-80"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}rem`,
        transform: `scale(${size})`,
      }}
    />
  );
})}


      {/* ✅ Content wrapper with higher z-index */}
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
  <div className="relative w-[450px] h-[150px] mt-[-50px]">
    <img
      src="/assets/pixil_greyrectangle.png"
      alt="button background"
      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
    />
    <div className="absolute inset-0 mb-[10px] flex items-center justify-center gap-2 pixel-font text-white text-base">
      <span className="text-[30px] font-extrabold top-[40%] ">GDSC</span>
      <img src="/assets/pixil_gdsclogo.png" alt="gdsc" className="h-5" />
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Cityscape stays on top */}
      <img src="/assets/pixil_buildings.png" alt="city" className="absolute bottom-0 left-0 w-full z-10" />
    </main>
  );
}
