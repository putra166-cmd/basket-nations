import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070a0f] text-white">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[140px]" />

        <div className="absolute -left-40 top-[45%] h-[350px] w-[350px] rounded-full bg-orange-600/[0.035] blur-[100px]" />

        <div className="absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-orange-400/[0.035] blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

      </div>


      {/* =========================
          NAVBAR
      ========================= */}

      <header className="relative z-30 border-b border-white/[0.05]">

        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-2.5"
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xl shadow-lg shadow-orange-500/10">
              🏀
            </div>

            <div>

              <p className="text-[12px] font-black tracking-[0.12em] sm:text-sm">
                BASKET NATIONS
              </p>

              <p className="hidden text-[9px] uppercase tracking-[0.16em] text-gray-600 sm:block">
                World Basketball Challenge
              </p>

            </div>

          </Link>


          {/* NAVIGATION */}

          <div className="flex items-center gap-2">

            <Link
              href="/leaderboard"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-[10px] font-black tracking-wider text-gray-400 transition hover:border-orange-500/30 hover:text-orange-400 sm:block"
            >
              LEADERBOARD
            </Link>

            <Link
              href="/play"
              className="rounded-full bg-orange-500 px-4 py-2.5 text-[10px] font-black tracking-wider text-white shadow-lg shadow-orange-500/10 transition hover:bg-orange-400 sm:px-5"
            >
              PLAY NOW
            </Link>

          </div>

        </div>

      </header>


      {/* =========================
          HERO
      ========================= */}

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-28">

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">


          {/* =====================
              LEFT CONTENT
          ===================== */}

          <div className="relative z-10">

            {/* BADGE */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.06] px-3 py-1.5 sm:mb-7 sm:px-4 sm:py-2">

              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)] sm:h-2 sm:w-2" />

              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-400 sm:text-xs sm:tracking-[0.25em]">
                Global Competition
              </span>

            </div>


            {/* HEADLINE */}

            <h1 className="max-w-3xl text-[3.25rem] font-black leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-[6.5rem]">

              SHOOT.
              <br />

              SCORE.
              <br />

              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                REPRESENT.
              </span>

            </h1>


            {/* DESCRIPTION */}

            <p className="mt-6 max-w-lg text-sm leading-6 text-gray-400 sm:mt-8 sm:text-lg sm:leading-8">

              Step onto the virtual court and represent your country.

              <br className="hidden sm:block" />

              You have two minutes to make as many baskets as possible.

              <span className="font-semibold text-gray-300">
                {" "}Every basket counts.
              </span>

            </p>


            {/* BUTTONS */}

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">

              <Link
                href="/play"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 px-6 text-sm font-black tracking-wide shadow-[0_15px_40px_rgba(249,115,22,0.15)] transition hover:-translate-y-1 hover:bg-orange-400 sm:w-auto"
              >

                <span className="text-xl">
                  🏀
                </span>

                PLAY FOR YOUR COUNTRY

                <span>
                  →
                </span>

              </Link>


              <Link
                href="/leaderboard"
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-6 text-sm font-black text-gray-300 transition hover:border-white/20 hover:text-white sm:w-auto"
              >

                🏆

                LEADERBOARD

              </Link>

            </div>


            {/* STATS */}

            <div className="mt-9 grid max-w-lg grid-cols-3 border-y border-white/[0.08] py-4 sm:mt-12 sm:py-5">

              <div>

                <p className="text-xl font-black sm:text-3xl">
                  2:00
                </p>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.13em] text-gray-600 sm:text-xs">
                  Game Time
                </p>

              </div>


              <div className="border-l border-white/10 pl-4 sm:pl-7">

                <p className="text-xl font-black sm:text-3xl">
                  +1
                </p>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.13em] text-gray-600 sm:text-xs">
                  Every Basket
                </p>

              </div>


              <div className="border-l border-white/10 pl-4 sm:pl-7">

                <p className="text-xl font-black sm:text-3xl">
                  🌎
                </p>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.13em] text-gray-600 sm:text-xs">
                  Worldwide
                </p>

              </div>

            </div>

          </div>


          {/* =====================
              BASKETBALL AREA
          ===================== */}

          <div className="relative mx-auto mt-2 flex h-[350px] w-full max-w-[420px] items-center justify-center sm:h-[500px] lg:mt-0 lg:h-[600px]">


            {/* GLOW */}

            <div className="absolute h-[220px] w-[220px] rounded-full bg-orange-500/10 blur-[70px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]" />


            {/* RINGS */}

            <div className="absolute h-[260px] w-[260px] rounded-full border border-orange-500/10 sm:h-[450px] sm:w-[450px]" />

            <div className="absolute h-[210px] w-[210px] rounded-full border border-dashed border-orange-500/10 sm:h-[350px] sm:w-[350px]" />


            {/* BALL */}

            <div className="relative z-10 flex h-[190px] w-[190px] items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/[0.06] shadow-[0_0_70px_rgba(249,115,22,0.08)] sm:h-[290px] sm:w-[290px]">

              <div className="text-[105px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] sm:text-[160px]">
                🏀
              </div>

            </div>


            {/* COUNTRY */}

            <div className="absolute bottom-0 left-2 z-20 rounded-xl border border-white/10 bg-[#10141c]/95 px-3 py-3 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:left-0 sm:rounded-2xl sm:px-5 sm:py-4">

              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gray-600 sm:text-[9px]">
                Your Country
              </p>

              <div className="mt-1.5 flex items-center gap-2 sm:mt-2.5 sm:gap-3">

                <span className="text-2xl sm:text-3xl">
                  🇮🇩
                </span>

                <div>

                  <p className="text-sm font-black sm:text-base">
                    Indonesia
                  </p>

                  <p className="text-[8px] font-bold text-emerald-400 sm:text-[10px]">
                    ● READY TO PLAY
                  </p>

                </div>

              </div>

            </div>


            {/* GLOBAL */}

            <div className="absolute right-2 top-2 z-20 rounded-xl border border-white/10 bg-[#10141c]/95 px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:right-0 sm:top-8 sm:rounded-2xl sm:px-4 sm:py-3">

              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gray-600">
                Competition
              </p>

              <p className="mt-1 text-xs font-black sm:text-sm">
                🌎 GLOBAL
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section className="border-y border-white/[0.06] bg-white/[0.015]">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">


            {/* PLAY */}

            <div className="rounded-2xl border border-white/[0.07] bg-[#0c1017] p-5 sm:p-6">

              <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-lg">
                  🏀
                </div>

                <span className="text-xs font-black text-gray-700">
                  01
                </span>

              </div>

              <h2 className="mt-4 text-base font-black sm:text-lg">
                PLAY THE GAME
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                Take the court and make as many baskets as possible before time runs out.
              </p>

            </div>


            {/* SCORE */}

            <div className="rounded-2xl border border-white/[0.07] bg-[#0c1017] p-5 sm:p-6">

              <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-lg">
                  🎯
                </div>

                <span className="text-xs font-black text-gray-700">
                  02
                </span>

              </div>

              <h2 className="mt-4 text-base font-black sm:text-lg">
                SCORE POINTS
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                Every successful basket gives your country another point.
              </p>

            </div>


            {/* REPRESENT */}

            <div className="rounded-2xl border border-white/[0.07] bg-[#0c1017] p-5 sm:p-6">

              <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-lg">
                  🏆
                </div>

                <span className="text-xs font-black text-gray-700">
                  03
                </span>

              </div>

              <h2 className="mt-4 text-base font-black sm:text-lg">
                REPRESENT YOUR NATION
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                Help your country climb the worldwide leaderboard.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">

        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
          The world is watching
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight sm:mt-4 sm:text-5xl">
          READY TO REPRESENT?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-gray-500 sm:mt-5 sm:text-base sm:leading-7">
          Step onto the virtual court, chase your highest score, and help your country climb the leaderboard.
        </p>

        <Link
          href="/play"
          className="mt-7 inline-flex h-14 items-center gap-3 rounded-2xl bg-orange-500 px-7 text-sm font-black shadow-lg shadow-orange-500/10 transition hover:-translate-y-1 hover:bg-orange-400"
        >
          🏀 START PLAYING
          →
        </Link>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="border-t border-white/[0.06]">

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:px-6 md:flex-row md:justify-between lg:px-8">

          <div className="text-center md:text-left">

            <p className="text-xs font-black tracking-[0.15em]">
              BASKET NATIONS
            </p>

            <p className="mt-1 text-[9px] text-gray-600">
              World Basketball Challenge
            </p>

          </div>


          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-600 sm:gap-5 sm:text-xs">

            <Link
              href="/play"
              className="transition hover:text-orange-400"
            >
              PLAY
            </Link>

            <Link
              href="/leaderboard"
              className="transition hover:text-orange-400"
            >
              LEADERBOARD
            </Link>

            <span>
              © 2026
            </span>

          </div>

        </div>

      </footer>

    </main>
  );
}