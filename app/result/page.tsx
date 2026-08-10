"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Country = {
  code: string;
  name: string;
  flag: string;
};

type CountryScore = {
  country_code: string;
  country_name: string;
  flag: string;
  total_score: number;
};

export default function ResultPage() {
  const [score, setScore] = useState(0);

  const [country, setCountry] = useState<Country>({
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
  });

  const [countryTotal, setCountryTotal] =
    useState(0);

  const [globalRank, setGlobalRank] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        /* =========================
           GET LAST GAME SCORE
        ========================= */

        const savedScore =
          localStorage.getItem(
            "basket-nations-score"
          );

        const savedCountry =
          localStorage.getItem(
            "basket-nations-country"
          );

        const currentScore =
          savedScore
            ? Number(savedScore)
            : 0;

        setScore(currentScore);

        /* =========================
           GET COUNTRY
        ========================= */

        let currentCountry: Country = {
          code: "ID",
          name: "Indonesia",
          flag: "🇮🇩",
        };

        if (savedCountry) {
          try {
            const parsed =
              JSON.parse(savedCountry);

            if (
              parsed &&
              parsed.code &&
              parsed.name
            ) {
              currentCountry = {
                code: parsed.code,
                name: parsed.name,
                flag:
                  parsed.flag || "🌎",
              };
            }
          } catch {
            console.log(
              "Invalid country data"
            );
          }
        }

        setCountry(
          currentCountry
        );

        /* =========================
           GET LEADERBOARD
        ========================= */

        const { data, error } =
          await supabase
            .from("country_scores")
            .select(
              "country_code,country_name,flag,total_score"
            )
            .order(
              "total_score",
              {
                ascending: false,
              }
            );

        if (error) {
          console.error(
            "Result leaderboard error:",
            error
          );

          return;
        }

        if (data) {
          const countries =
            data as CountryScore[];

          /* COUNTRY TOTAL */

          const myCountry =
            countries.find(
              (item) =>
                item.country_code ===
                currentCountry.code
            );

          if (myCountry) {
            setCountryTotal(
              Number(
                myCountry.total_score
              )
            );
          }

          /* GLOBAL RANK */

          const rank =
            countries.findIndex(
              (item) =>
                item.country_code ===
                currentCountry.code
            );

          if (rank !== -1) {
            setGlobalRank(
              rank + 1
            );
          }
        }
      } catch (error) {
        console.error(
          "Result page error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, []);

  const playAgain = () => {
    window.location.href =
      "/play";
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-white">

      {/* HEADER */}

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-2xl">
            🏀
          </div>

          <div>
            <h1 className="font-black tracking-wide">
              BASKET NATIONS
            </h1>

            <p className="text-xs text-gray-500">
              World Basketball Challenge
            </p>
          </div>
        </Link>

        <Link
          href="/leaderboard"
          className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-black transition hover:bg-white/[0.08]"
        >
          LEADERBOARD
        </Link>

      </header>


      {/* RESULT */}

      <section className="mx-auto flex min-h-[calc(100vh-90px)] max-w-4xl items-center justify-center px-6 py-12">

        <div className="w-full text-center">

          {/* TITLE */}

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">
            Game Complete
          </p>

          <h2 className="mt-3 text-5xl font-black md:text-7xl">
            GREAT SHOT!
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Your baskets have been added
            to your country&apos;s global
            score.
          </p>


          {/* COUNTRY */}

          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4">

            <span className="text-4xl">
              {country.flag}
            </span>

            <div className="text-left">

              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Playing For
              </p>

              <p className="text-xl font-black">
                {country.name}
              </p>

            </div>

          </div>


          {/* SCORE */}

          <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-orange-500/20 bg-orange-500/[0.05] p-8 shadow-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
              Your Score
            </p>

            <p className="mt-2 text-8xl font-black text-orange-500 md:text-9xl">
              {score}
            </p>

            <p className="mt-2 text-sm font-bold uppercase tracking-widest text-gray-600">
              Points This Game
            </p>

          </div>


          {/* STATS */}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            {/* COUNTRY TOTAL */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Country Total
              </p>

              <p className="mt-2 text-4xl font-black">

                {loading
                  ? "..."
                  : countryTotal.toLocaleString()}

              </p>

              <p className="mt-1 text-xs text-gray-600">
                {country.name}
              </p>

            </div>


            {/* GLOBAL RANK */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Global Rank
              </p>

              <p className="mt-2 text-4xl font-black text-orange-400">

                {loading
                  ? "..."
                  : globalRank > 0
                    ? `#${globalRank}`
                    : "-"}

              </p>

              <p className="mt-1 text-xs text-gray-600">
                Among all countries
              </p>

            </div>

          </div>


          {/* MESSAGE */}

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">

            <p className="text-sm text-gray-500">
              🌎 Every basket helps{" "}
              <span className="font-bold text-white">
                {country.name}
              </span>{" "}
              climb the world leaderboard.
            </p>

          </div>


          {/* BUTTONS */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <button
              onClick={playAgain}
              className="rounded-2xl bg-orange-500 px-6 py-4 font-black transition hover:bg-orange-400 active:scale-[0.98]"
            >
              🏀 PLAY AGAIN
            </button>

            <Link
              href="/leaderboard"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-black transition hover:bg-white/[0.08]"
            >
              🌎 VIEW LEADERBOARD
            </Link>

          </div>


          {/* HOME */}

          <Link
            href="/"
            className="mt-6 inline-block text-sm font-bold text-gray-600 transition hover:text-white"
          >
            ← Back to Home
          </Link>

        </div>

      </section>

    </main>
  );
}