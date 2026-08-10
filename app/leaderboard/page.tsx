"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CountryScore = {
  country_code: string;
  country_name: string;
  flag: string;
  total_score: number;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] =
    useState<CountryScore[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [myCountry, setMyCountry] =
    useState("ID");

  useEffect(() => {
    const loadLeaderboard =
      async () => {
        try {
          setLoading(true);

          const savedCountry =
            localStorage.getItem(
              "basket-nations-country"
            );

          if (savedCountry) {
            try {
              const country =
                JSON.parse(
                  savedCountry
                );

              if (country?.code) {
                setMyCountry(
                  country.code
                );
              }
            } catch {
              // Ignore invalid localStorage
            }
          }

          const response =
            await fetch(
              "/api/leaderboard",
              {
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.error ||
                "Failed to load leaderboard"
            );
          }

          setLeaderboard(
            data.countries || []
          );
        } catch (err) {
          console.error(err);

          setError(
            "Unable to load leaderboard."
          );
        } finally {
          setLoading(false);
        }
      };

    loadLeaderboard();
  }, []);

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
          href="/play"
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-black transition hover:bg-orange-400"
        >
          PLAY NOW
        </Link>

      </header>


      {/* TITLE */}

      <section className="mx-auto max-w-5xl px-6 pb-6 pt-12">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">
            Global Competition
          </p>

          <h2 className="mt-3 text-5xl font-black md:text-6xl">
            WORLD LEADERBOARD
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Every basket scored by players
            around the world contributes to
            their country.
          </p>

        </div>

      </section>


      {/* LEADERBOARD */}

      <section className="mx-auto max-w-5xl px-6 py-8">

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#10141c]">

          {/* TABLE HEADER */}

          <div className="grid grid-cols-[70px_1fr_120px] border-b border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-600">

            <div>
              Rank
            </div>

            <div>
              Country
            </div>

            <div className="text-right">
              Score
            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="px-6 py-16 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-orange-500" />

              <p className="mt-4 text-sm text-gray-500">
                Loading world leaderboard...
              </p>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="px-6 py-16 text-center">

              <p className="text-lg font-bold text-red-400">
                {error}
              </p>

              <button
                onClick={() =>
                  window.location.reload()
                }
                className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-bold"
              >
                TRY AGAIN
              </button>

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            leaderboard.length === 0 && (
              <div className="px-6 py-16 text-center">

                <p className="text-lg font-bold">
                  No countries found.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Please check your Supabase
                  connection.
                </p>

              </div>
            )}


          {/* ROWS */}

          {!loading &&
            !error &&
            leaderboard.length > 0 && (
              <div>

                {leaderboard.map(
                  (
                    country,
                    index
                  ) => {

                    const rank =
                      index + 1;

                    const isMine =
                      country.country_code ===
                      myCountry;

                    return (
                      <div
                        key={
                          country.country_code
                        }
                        className={`grid grid-cols-[70px_1fr_120px] items-center border-b border-white/5 px-6 py-5 transition ${
                          isMine
                            ? "bg-orange-500/[0.08]"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >

                        {/* RANK */}

                        <div>

                          {rank === 1 && (
                            <span className="text-2xl">
                              🥇
                            </span>
                          )}

                          {rank === 2 && (
                            <span className="text-2xl">
                              🥈
                            </span>
                          )}

                          {rank === 3 && (
                            <span className="text-2xl">
                              🥉
                            </span>
                          )}

                          {rank > 3 && (
                            <span className="font-black text-gray-500">
                              {rank}
                            </span>
                          )}

                        </div>


                        {/* COUNTRY */}

                        <div className="flex items-center gap-4">

                          <span className="text-3xl">
                            {country.flag}
                          </span>

                          <div>

                            <p className="font-black">
                              {
                                country.country_name
                              }
                            </p>

                            {isMine && (
                              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-orange-400">
                                Your Country
                              </p>
                            )}

                          </div>

                        </div>


                        {/* SCORE */}

                        <div className="text-right">

                          <p className="text-xl font-black">
                            {Number(
                              country.total_score
                            ).toLocaleString()}
                          </p>

                          <p className="text-[10px] uppercase tracking-widest text-gray-600">
                            points
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

        </div>


        {/* COUNTRY COUNT */}

        {!loading &&
          !error &&
          leaderboard.length > 0 && (
            <div className="mt-4 text-center text-xs text-gray-600">
              🌎 {leaderboard.length} countries
              competing
            </div>
          )}


        {/* MESSAGE */}

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 text-center">

          <p className="text-sm text-gray-500">
            🌎 Your score contributes
            to your country&apos;s total.
          </p>

        </div>

      </section>


      {/* BOTTOM */}

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-6">

        <div className="grid gap-4 sm:grid-cols-2">

          <Link
            href="/play"
            className="rounded-2xl bg-orange-500 px-6 py-4 text-center font-black transition hover:bg-orange-400"
          >
            🏀 SHOOT FOR YOUR COUNTRY
          </Link>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center font-black transition hover:bg-white/[0.08]"
          >
            🏠 BACK TO HOME
          </Link>

        </div>

      </section>

    </main>
  );
}