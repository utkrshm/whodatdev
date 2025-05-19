export default function Questions() {
    return (
        <main className="relative min-h-screen bg-[#1E1E1E] text-white font-mono overflow-hidden">

        {/* 🔳 Grid Pattern */}
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
            const top = Math.floor(Math.random() * 40);
            const left = Math.floor(Math.random() * 100);
            const size = 0.5;
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

        {/* 📦 Content Area */}
        <div className="relative z-10 w-[90vw] max-w-[1280px] aspect-[16/9] mx-auto">
        <img src="/assets/pixil_clouds1.png" className="absolute top-[0.1%] left-[0px] w-[28%]" alt="cloud1" />
        <img src="/assets/pixil_clouds2.png" className="absolute top-[5%] right-[35%] w-[28%]" alt="cloud2" />
        <img src="/assets/pixil_clouds3.png" className="absolute top-[4%] right-[0px] w-[28%]" alt="cloud3" />
        </div>

        {/* 🍩 Big Donut */}
        <img
        src="/assets/pixil_donutfinalre.png"
        alt="big donut"
        className="fixed bottom-0 right-0 w-[50vw] z-[1] pointer-events-none"
        style={{ marginBottom: "-1px" }} // Force against bottom
        />
        </main>
    );
}

