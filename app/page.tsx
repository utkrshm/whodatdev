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
          opacity: 0.2, // Adjust to desired background visibility
        }}
      />

      {/* ✅ Content wrapper with higher z-index */}
      <div className="relative z-10 w-[90vw] max-w-[1280px] aspect-[16/9] mx-auto">
        {/* Floating elements */}
        <img src="/assets/pixil_clouds1.png" className="absolute top-[0.1%] left-[1%] w-[28%]" alt="cloud1" />
        <img src="/assets/pixil_clouds2.png" className="absolute top-[5%] right-[35%] w-[25%]" alt="cloud2" />
        <img src="/assets/pixil_clouds1.png" className="absolute top-[15%] right-[5%] w-[15%]" alt="cloud3" />
        <img src="/assets/pixil_specs.png" className="absolute top-[20%] right-[23%] w-[5%] rotate-12" alt="sunglasses" />
        <img src="/assets/pixil_dinosaur.png" className="absolute bottom-[30%] left-[17%] w-[7%] z-1" alt="dino" />
        <img src="/assets/pixil_pinkdonut.png" className="absolute bottom-[30%] right-[17%] w-[7%] z-1" alt="donut" />
        <img src="/assets/pixil_splat1.png" className="absolute top-[25%] left-[18%] w-[3%]" alt="splat1" />
        <img src="/assets/pixil_splat2.png" className="absolute top-[28%] left-[21%] w-[2%]" alt="splat2" />

        {/* Main content */}
        <div
          className="absolute top-[25%] left-[50%] translate-x-[-50%] bg-pink-600 border-8 border-black p-8 rounded-lg shadow-2xl text-center w-[60%]"
          style={{ boxShadow: "8px 8px 0 #222" }}
        >
          <h1 className="text-4xl font-extra-bold tracking-widest mb-6 pixel-font text-black">WHO DAT DEV?</h1>
          <div className="flex justify-center items-center gap-2 mb-6">
            <img src="/assets/pixil_pacman.png" alt="pacman" className="h-6" />
            {[...Array(4)].map((_, i) => (
              <img key={i} src="/assets/pixil_pacfood.png" alt={`pacfood${i}`} className="h-6" />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-black text-white px-6 py-3 rounded-lg border-2 border-white flex items-center gap-2 shadow-lg text-base pixel-font"
              style={{ boxShadow: "4px 4px 0 #222" }}
            >
              <span>GDSC</span>
              <img src="/assets/pixil_gdsclogo.png" alt="gdsc" className="h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cityscape stays on top */}
      <img src="/assets/pixil_buildings.png" alt="city" className="absolute bottom-0 left-0 w-full z-10" />
    </main>
  );
}
