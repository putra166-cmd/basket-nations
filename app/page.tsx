import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07090d] text-white">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/2 top-[-300px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[140px]" />

        <div className="absolute -left-40 top-[45%] h-[500px] w-[500px] rounded-full bg-orange-600/[0.04] blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-400/[0.04] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

      </div>


      {/* =========================
          NAVBAR
      ========================= */}

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">

        <Link
          href="/"
          className="group flex items-center gap-3"
        >

          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-orange-500 text-2xl shadow-[0_0_30px_rgba(249,115,22,0.18)] transition duration-300 group-hover:scale-105">

            <div className="absolute inset-0 bg-gradient-to-br from-orange-300/30 to-transparent" />

            <span className="relative">
              🏀
            </span>

          </div>

          <div>

            <h1 className="text-sm font-black tracking-[0.16em]">
              BASKET NATIONS
            </h1>

            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">
              World Basketball Challenge
            </p>

          </div>

        </Link>


        <nav className="flex items-center gap-2 sm:gap-3">

          <Link
            href="/leaderboard"
            className="hidden rounded-full border border-white/10 bg-white/[0.025] px-5 py-2.5 text-xs font-black tracking-wider text-gray-300 transition duration-300 hover:border-orange-500/40 hover:bg-orange-500/5 hover:text-orange-400 sm:block"
          >
            LEADERBOARD
          </Link>

          <Link
            href="/play"
            className="rounded-full bg-orange-500 px-5 py-2.5 text-xs font-black tracking-wider text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-orange-500/20"
          >
            PLAY NOW
          </Link>

        </nav>

      </header>


      {/* =========================
          HERO
      ========================= */}

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28">

        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">


          {/* LEFT */}

          <div className="relative z-10">

            {/* BADGE */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/[0.06] px-4 py-2">

              <span className="flex h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400 sm:text-xs">
                Global Competition
              </span>

            </div>


            {/* HEADLINE */}

            <h2 className="max-w-3xl text-[3.8rem] font-black leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-[6.8rem]">

              SHOOT.

              <br />

              SCORE.

              <br />

              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                REPRESENT.
              </span>

            </h2>


            {/* DESCRIPTION */}

            <p className="mt-8 max-w-xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">

              Step onto the court and represent your
              country. You have two minutes to make
              as many baskets as possible.

              <span className="font-semibold text-gray-300">
                {" "}Every basket counts.
              </span>

            </p>


            {/* CTA */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/play"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black tracking-wide shadow-[0_15px_40px_rgba(249,115,22,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:shadow-[0_20px_50px_rgba(249,115,22,0.24)]"
              >

                <span className="text-xl">
                  🏀
                </span>

                PLAY FOR YOUR COUNTRY

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </Link>


              <Link
                href="/leaderboard"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-7 py-4 text-sm font-black tracking-wide text-gray-300 transition duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                🏆 VIEW LEADERBOARD
              </Link>

            </div>


            {/* QUICK STATS */}

            <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-white/10 py-5">

              <div className="border-r border-white/10">

                <p className="text-2xl font-black sm:text-3xl">
                  2:00
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600 sm:text-xs">
                  Game Time
                </p>

              </div>


              <div className="border-r border-white/10 pl-4 sm:pl-7">

                <p className="text-2xl font-black sm:text-3xl">
                  +1
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600 sm:text-xs">
                  Every Basket
                </p>

              </div>


              <div className="pl-4 sm:pl-7">

                <p className="text-2xl font-black sm:text-3xl">
                  🌎
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600 sm:text-xs">
                  Worldwide
                </p>

              </div>

            </div>

          </div>


          {/* RIGHT — BASKETBALL VISUAL */}

          <div className="relative flex min-h-[450px] items-center justify-center lg:min-h-[600px]">

            {/* ORANGE GLOW */}

            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[90px] sm:h-[430px] sm:w-[430px]" />


            {/* OUTER RING */}

            <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/10 sm:h-[470px] sm:w-[470px]" />

            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-orange-500/10 sm:h-[380px] sm:w-[380px]" />


            {/* ORBIT DOTS */}

            <div className="absolute left-[12%] top-[30%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.8)]" />

            <div className="absolute right-[14%] top-[25%] h-1.5 w-1.5 rounded-full bg-orange-500/60" />

            <div className="absolute bottom-[25%] right-[17%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)]" />

            <div className="absolute bottom-[22%] left-[15%] h-1.5 w-1.5 rounded-full bg-white/20" />


            {/* BASKETBALL */}

            <div className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border border-orange-400/20 bg-gradient-to-br from-orange-500/[0.13] to-transparent shadow-[inset_0_0_80px_rgba(249,115,22,0.07),0_0_80px_rgba(249,115,22,0.08)] sm:h-80 sm:w-80">

              <div className="text-[150px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] sm:text-[190px]">
                🏀
              </div>

            </div>


            {/* COUNTRY CARD */}

            <div className="absolute bottom-3 left-0 z-20 rounded-2xl border border-white/10 bg-[#10141c]/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-2 sm:p-5">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                Your Country
              </p>

              <div className="mt-2.5 flex items-center gap-3">

                <span className="text-3xl">
                  🇮🇩
                </span>

                <div>

                  <p className="font-black">
                    Indonesia
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold text-emerald-400">
                    ● READY TO PLAY
                  </p>

                </div>

              </div>

            </div>


            {/* GLOBAL CARD */}

            <div className="absolute right-0 top-10 z-20 rounded-2xl border border-white/10 bg-[#10141c]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:right-3 sm:top-16">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                Competition
              </p>

              <p className="mt-1 font-black">
                🌎 GLOBAL
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURE STRIP
      ========================= */}

      <section className="relative border-y border-white/[0.06] bg-white/[0.015]">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

          <div className="grid gap-4 md:grid-cols-3">


            {/* CARD 1 */}

            <div className="group rounded-2xl border border-white/[0.07] bg-[#0c1017] p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500/20">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-xl">
                  🏀
                </div>

                <span className="text-xs font-black text-gray-700">
                  01
                </span>

              </div>

              <h3 className="mt-5 text-lg font-black">
                PLAY THE GAME
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Take the court and make as many
                baskets as possible before time runs out.
              </p>

            </div>


            {/* CARD 2 */}

            <div className="group rounded-2xl border border-white/[0.07] bg-[#0c1017] p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500/20">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-xl">
                  🎯
                </div>

                <span className="text-xs font-black text-gray-700">
                  02
                </span>

              </div>

              <h3 className="mt-5 text-lg font-black">
                SCORE POINTS
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Every successful basket gives your
                country another point on the global board.
              </p>

            </div>


            {/* CARD 3 */}

            <div className="group rounded-2xl border border-white/[0.07] bg-[#0c1017] p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-500/20">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-xl">
                  🏆
                </div>

                <span className="text-xs font-black text-gray-700">
                  03
                </span>

              </div>

              <h3 className="mt-5 text-lg font-black">
                REPRESENT YOUR NATION
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your performance contributes to your
                country&apos;s position in the worldwide ranking.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl">

          <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">
            The world is watching
          </p>

          <h3 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            READY TO REPRESENT?
          </h3>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Step onto the virtual court, chase your highest
            score, and help your country climb the leaderboard.
          </p>

          <Link
            href="/play"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 text-sm font-black shadow-lg shadow-orange-500/10 transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
          >
            🏀 START PLAYING

            <span>
              →
            </span>
          </Link>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="border-t border-white/[0.06]">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div>

            <p className="text-xs font-black tracking-[0.15em]">
              BASKET NATIONS
            </p>

            <p className="mt-1 text-[10px] text-gray-600">
              World Basketball Challenge
            </p>

          </div>


          <div className="flex items-center gap-5 text-xs font-bold text-gray-600">

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