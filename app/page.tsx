import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090d] text-white">

      {/* NAVBAR */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-2xl">
            🏀
          </div>

          <div>
            <h1 className="font-black tracking-wide">
              BASKET NATIONS
            </h1>

            <p className="text-xs text-gray-500">
              Play for your country
            </p>
          </div>

        </div>


        <Link
          href="/leaderboard"
          className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold transition hover:border-orange-500 hover:text-orange-400"
        >
          LEADERBOARD
        </Link>

      </header>


      {/* HERO */}
      <section className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div>

          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-orange-400">
            World Basketball Challenge
          </p>


          <h2 className="text-6xl font-black leading-[0.95] md:text-8xl">

            SHOOT.

            <br />

            SCORE.

            <br />

            <span className="text-orange-500">
              REPRESENT.
            </span>

          </h2>


          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
            You have 2 minutes to make as many baskets
            as possible. Every successful shot gives
            your country another point.
          </p>


          {/* PLAY BUTTON */}
          <Link
            href="/play"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 text-lg font-black transition hover:-translate-y-1 hover:bg-orange-400"
          >
            🏀 PLAY NOW

            <span>
              →
            </span>

          </Link>


          {/* GAME INFORMATION */}
          <div className="mt-10 flex gap-10">

            <div>

              <p className="text-2xl font-black">
                2:00
              </p>

              <p className="text-sm text-gray-500">
                Game Time
              </p>

            </div>


            <div>

              <p className="text-2xl font-black">
                +1
              </p>

              <p className="text-sm text-gray-500">
                Made Basket
              </p>

            </div>


            <div>

              <p className="text-2xl font-black">
                🌎
              </p>

              <p className="text-sm text-gray-500">
                Global
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="relative flex items-center justify-center">

          <div className="absolute h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />


          <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/5">

            <div className="text-[150px]">
              🏀
            </div>

          </div>


          {/* COUNTRY CARD */}
          <div className="absolute bottom-0 left-0 rounded-2xl border border-white/10 bg-[#11151d] p-4 shadow-2xl">

            <p className="text-xs uppercase tracking-widest text-gray-500">
              Your Country
            </p>

            <div className="mt-2 flex items-center gap-3">

              <span className="text-3xl">
                🇮🇩
              </span>

              <div>

                <p className="font-black">
                  Indonesia
                </p>

                <p className="text-xs text-green-400">
                  ● Automatically detected
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* BOTTOM INFO */}
      <section className="border-t border-white/5">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">

              <p className="text-2xl">
                🏀
              </p>

              <h3 className="mt-4 font-black">
                PLAY
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Play a two-minute basketball challenge.
              </p>

            </div>


            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">

              <p className="text-2xl">
                🎯
              </p>

              <h3 className="mt-4 font-black">
                SCORE
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Every successful basket gives one point.
              </p>

            </div>


            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">

              <p className="text-2xl">
                🌎
              </p>

              <h3 className="mt-4 font-black">
                REPRESENT
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your points contribute to your country's ranking.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}