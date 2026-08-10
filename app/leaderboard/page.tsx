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
  const [leaderboard, setLeaderboard] = useState<CountryScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [myCountry, setMyCountry] = useState("ID");

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");

      const savedCountry = localStorage.getItem(
        "basket-nations-country"
      );

      if (savedCountry) {
        try {
          const country = JSON.parse(savedCountry);

          if (country?.code) {
            setMyCountry(country.code);
          }
        } catch {
          // Ignore invalid localStorage
        }
      }

      const response = await fetch("/api/leaderboard", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load leaderboard"
        );
      }

      setLeaderboard(data.countries || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load leaderboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080b11] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[120px]" />

        <div className="absolute -left-40 top-[45%] h-[350px] w-[350px] rounded-full bg-orange-500/[0.04] blur-[100px]" />

        <div className="absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-orange-500/[0.04] blur-[100px]" />
      </div>

      {/* HEADER */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xl shadow-lg shadow-orange-500/20 sm:h-11 sm:w-11 sm:text-2xl">
            🏀
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xs font-black tracking-[0.12em] sm:text-sm">
              BASKET NATIONS
            </h1>

            <p className="mt-0.5 truncate text-[9px] text-gray-500 sm:text-xs">
              World Basketball Challenge
            </p>
          </div>
        </Link>

        <Link
          href="/play"
          className="shrink-0 rounded-xl bg-orange-500 px-4 py-2.5 text-[11px] font-black tracking-wide shadow-lg shadow-orange-500/10 transition active:scale-95 hover:bg-orange-400 sm:px-5 sm:py-3 sm:text-sm"
        >
          🏀 PLAY NOW
        </Link>
      </header>

      {/* TITLE */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-12">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]">
            Global Competition
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl md:text-6xl">
            WORLD
            <span className="text-orange-500"> LEADERBOARD</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:mt-4 sm:text-base">
            Every basket scored by players around the world contributes to
            their country.
          </p>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="mx-auto w-full max-w-5xl px-3 pb-10 sm:px-6 sm:pb-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10141c] shadow-2xl sm:rounded-3xl">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-[52px_minmax(0,1fr)_82px] items-center border-b border-white/10 px-3 py-3 text-[9px] font-black uppercase tracking-[0.16em] text-gray-600 sm:grid-cols-[70px_minmax(0,1fr)_120px] sm:px-6 sm:py-4 sm:text-xs sm:tracking-widest">
            <div>Rank</div>

            <div>Country</div>

            <div className="text-right">Score</div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="px-4 py-16 text-center sm:px-6 sm:py-20">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-orange-500 sm:h-10 sm:w-10" />

              <p className="mt-4 text-xs text-gray-500 sm:text-sm">
                Loading world leaderboard...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="px-4 py-16 text-center sm:px-6 sm:py-20">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
                ⚠️
              </div>

              <p className="mt-4 text-sm font-bold text-red-400 sm:text-lg">
                {error}
              </p>

              <button
                onClick={loadLeaderboard}
                className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-xs font-black transition active:scale-95 hover:bg-orange-400 sm:text-sm"
              >
                TRY AGAIN
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            leaderboard.length === 0 && (
              <div className="px-4 py-16 text-center sm:px-6 sm:py-20">
                <div className="text-4xl">🌎</div>

                <p className="mt-4 text-base font-bold">
                  No countries found.
                </p>

                <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                  Please check your Supabase connection.
                </p>
              </div>
            )}

          {/* ROWS */}
          {!loading &&
            !error &&
            leaderboard.length > 0 && (
              <div>
                {leaderboard.map((country, index) => {
                  const rank = index + 1;

                  const isMine =
                    country.country_code === myCountry;

                  return (
                    <div
                      key={country.country_code}
                      className={`grid grid-cols-[52px_minmax(0,1fr)_82px] items-center border-b border-white/[0.06] px-3 py-4 transition last:border-b-0 sm:grid-cols-[70px_minmax(0,1fr)_120px] sm:px-6 sm:py-5 ${
                        isMine
                          ? "bg-orange-500/[0.08]"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* RANK */}
                      <div className="flex items-center">
                        {rank === 1 && (
                          <span className="text-xl sm:text-2xl">
                            🥇
                          </span>
                        )}

                        {rank === 2 && (
                          <span className="text-xl sm:text-2xl">
                            🥈
                          </span>
                        )}

                        {rank === 3 && (
                          <span className="text-xl sm:text-2xl">
                            🥉
                          </span>
                        )}

                        {rank > 3 && (
                          <span className="pl-1 text-sm font-black text-gray-500 sm:text-base">
                            {rank}
                          </span>
                        )}
                      </div>

                      {/* COUNTRY */}
                      <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
                        <span className="shrink-0 text-2xl sm:text-3xl">
                          {country.flag}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black sm:text-base">
                            {country.country_name}
                          </p>

                          {isMine && (
                            <p className="mt-0.5 truncate text-[8px] font-black uppercase tracking-[0.12em] text-orange-400 sm:mt-1 sm:text-xs sm:tracking-widest">
                              YOUR COUNTRY
                            </p>
                          )}
                        </div>
                      </div>

                      {/* SCORE */}
                      <div className="text-right">
                        <p
                          className={`text-base font-black sm:text-xl ${
                            isMine
                              ? "text-orange-400"
                              : "text-white"
                          }`}
                        >
                          {Number(
                            country.total_score
                          ).toLocaleString()}
                        </p>

                        <p className="text-[8px] uppercase tracking-[0.12em] text-gray-600 sm:text-[10px] sm:tracking-widest">
                          points
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {/* COUNTRY COUNT */}
        {!loading &&
          !error &&
          leaderboard.length > 0 && (
            <div className="mt-4 text-center text-[10px] text-gray-600 sm:text-xs">
              🌎 {leaderboard.length} countries competing
            </div>
          )}

        {/* MESSAGE */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-center sm:mt-6 sm:px-6 sm:py-5">
          <p className="text-xs leading-5 text-gray-500 sm:text-sm">
            🌎 Your score contributes to your country&apos;s total.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-12 pt-2 sm:px-6 sm:pb-16 sm:pt-6">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <Link
            href="/play"
            className="flex min-h-[52px] items-center justify-center rounded-2xl bg-orange-500 px-5 py-4 text-center text-xs font-black shadow-lg shadow-orange-500/10 transition active:scale-[0.98] hover:bg-orange-400 sm:text-sm"
          >
            🏀 SHOOT FOR YOUR COUNTRY
          </Link>

          <Link
            href="/"
            className="flex min-h-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center text-xs font-black transition active:scale-[0.98] hover:bg-white/[0.08] sm:text-sm"
          >
            🏠 BACK TO HOME
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-black tracking-[0.15em] sm:text-xs">
              BASKET NATIONS
            </p>

            <p className="mt-1 text-[9px] text-gray-600 sm:text-[10px]">
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
              href="/"
              className="transition hover:text-orange-400"
            >
              HOME
            </Link>

            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}