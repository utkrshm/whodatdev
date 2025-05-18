import Image from "next/image";

export default function Home() {
  return (
    <main
      className="relative w-full h-screen overflow-hidden text-white font-mono"
      style={{
        backgroundColor: "black",
        backgroundImage: "url('/grid-pattern.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: 1,
      }}
    >
      {/* Background grid (now set via backgroundImage on <main>) */}

      {/* Floating elements */}
      {/* Clouds */}
      <img src="/assets/pixil_clouds1.png" className="absolute top-8 left-16 w-32 z-10" alt="cloud" />
      <img src="/assets/pixil_clouds2.png" className="absolute top-8 right-32 w-40 z-10" alt="cloud" />
      <img src="/assets/pixil_clouds1.png" className="absolute top-20 right-8 w-28 z-10" alt="cloud" />
      {/* Sunglasses */}
      <img src="/assets/pixil_specs.png" className="absolute top-24 right-[23%] w-16 rotate-12 z-20" alt="sunglasses" />
      {/* Dinosaur */}
      <img src="/assets/pixil_dinosaur.png" className="absolute bottom-40 left-16 w-16 z-20" alt="dino" />
      {/* Donut */}
      <img src="/assets/pixil_donut1.png" className="absolute bottom-32 right-20 w-16 z-20" alt="donut" />
      {/* Green pixel splats */}
      <img src="/assets/pixil_splat1.png" className="absolute top-28 left-[18%] w-10 z-20" alt="splat" />
      <img src="/assets/pixil_splat2.png" className="absolute top-32 left-[21%] w-6 z-20" alt="splat" />

      {/* Main screen */}
      <div className="relative z-30 mx-auto mt-32 w-[90%] max-w-3xl bg-pink-600 border-8 border-black p-12 rounded-lg shadow-2xl text-center pixel-font"
        style={{ boxShadow: "8px 8px 0 #222" }}>
        <h1 className="text-6xl font-bold tracking-widest pixel-font mb-8">WHO DAT DEV?</h1>
        <div className="flex justify-center items-center gap-2 mb-8">
          {/* Pacman and dots */}
          <img src="/assets/pixil_pacman.png" alt="pacman" className="h-6" />
          <img src="/assets/pixil_pacfood.png" alt="pacfood1" className="h-6" />
          <img src="/assets/pixil_pacfood.png" alt="pacfood2" className="h-6" />
          <img src="/assets/pixil_pacfood.png" alt="pacfood3" className="h-6" />
          <img src="/assets/pixil_pacfood.png" alt="pacfood4" className="h-6" />
        
        </div>
        {/* GDSC Button */}
        <div className="flex justify-center">
          <button className="bg-black text-white px-8 py-4 rounded-lg border-2 border-white flex items-center gap-3 shadow-lg pixel-font text-lg"
            style={{ boxShadow: "4px 4px 0 #222" }}>
            <span>GDSC</span>
            <img src="/assets/pixil_gdsclogo.png" alt="gdsc" className="h-6" />
          </button>
        </div>
      </div>

      {/* Bottom cityscape */}
      <div className="absolute bottom-0 w-full z-20">
        <img src="/assets/pixil_buildings.png" alt="city" className="w-full" />
      </div>
    </main>
  );
}

