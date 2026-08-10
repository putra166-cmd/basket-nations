"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Point = {
  x: number;
  y: number;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

type Country = {
  code: string;
  name: string;
  flag: string;
};

export default function PlayPage() {
  const courtRef = useRef<HTMLDivElement | null>(null);

  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const ballRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });

  const draggingRef = useRef(false);

  const dragStartRef = useRef({
    x: 0,
    y: 0,
  });

  const lastTimeRef = useRef(0);

  const shotActiveRef = useRef(false);
  const scoredRef = useRef(false);
  const particleIdRef = useRef(0);

  /* =========================
     GAME STATE
  ========================= */

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [ballPosition, setBallPosition] = useState({
    x: 50,
    y: 80,
  });

  const [trajectory, setTrajectory] = useState<Point[]>([]);
  const [feedback, setFeedback] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [flash, setFlash] = useState(false);

  /* =========================
     COUNTRY
  ========================= */

  const [country, setCountry] = useState<Country>({
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
  });

  const [countryLoading, setCountryLoading] = useState(true);

  /* =========================
     DETECT COUNTRY
  ========================= */

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("/api/country", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Country API error");
        }

        const data = await response.json();

        if (data.country) {
          setCountry(data.country);
        }
      } catch (error) {
        console.error("Country detection failed:", error);
      } finally {
        setCountryLoading(false);
      }
    };

    detectCountry();
  }, []);

  /* =========================
     AUDIO
  ========================= */

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    return audioContextRef.current;
  };

  const playScoreSound = () => {
    try {
      const audio = getAudioContext();

      if (audio.state === "suspended") {
        audio.resume();
      }

      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        520,
        audio.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        880,
        audio.currentTime + 0.12
      );

      gain.gain.setValueAtTime(
        0.0001,
        audio.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.25,
        audio.currentTime + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 0.3
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start();
      oscillator.stop(audio.currentTime + 0.3);
    } catch {
      // Audio tidak wajib
    }
  };

  const playMissSound = () => {
    try {
      const audio = getAudioContext();

      if (audio.state === "suspended") {
        audio.resume();
      }

      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = "triangle";

      oscillator.frequency.setValueAtTime(
        180,
        audio.currentTime
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        90,
        audio.currentTime + 0.18
      );

      gain.gain.setValueAtTime(
        0.0001,
        audio.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.12,
        audio.currentTime + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 0.22
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start();
      oscillator.stop(audio.currentTime + 0.22);
    } catch {
      // Audio tidak wajib
    }
  };

  /* =========================
     FORMAT TIME
  ========================= */

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsOnly = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secondsOnly
    ).padStart(2, "0")}`;
  };

  /* =========================
     RESET BALL
  ========================= */

  const resetBall = useCallback(() => {
    const court = courtRef.current;

    if (!court) {
      return;
    }

    const width = court.clientWidth;
    const height = court.clientHeight;

    ballRef.current = {
      x: width / 2,
      y: height - 125,
      vx: 0,
      vy: 0,
    };

    setBallPosition({
      x: 50,
      y: ((height - 125) / height) * 100,
    });

    shotActiveRef.current = false;
    scoredRef.current = false;

    setTrajectory([]);
  }, []);

  /* =========================
     INITIALIZE BALL
  ========================= */

  useEffect(() => {
    resetBall();

    const resize = () => {
      if (!draggingRef.current) {
        resetBall();
      }
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resetBall]);

  /* =========================
     TIMER
  ========================= */

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          setGameOver(true);
          setTrajectory([]);

          shotActiveRef.current = false;

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [gameStarted, gameOver]);

  /* =========================
     PARTICLES
  ========================= */

  const createParticles = (x: number, y: number) => {
    const newParticles: Particle[] = [];

    for (let i = 0; i < 18; i++) {
      const angle = (Math.PI * 2 * i) / 18;

      const speed = 35 + Math.random() * 55;

      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
      });
    }

    setParticles(newParticles);

    window.setTimeout(() => {
      setParticles([]);
    }, 700);
  };

  /* =========================
     SCORE
  ========================= */

  const scoreBasket = () => {
    if (scoredRef.current) {
      return;
    }

    scoredRef.current = true;
    shotActiveRef.current = false;

    setScore((previous) => previous + 1);

    setStreak((previous) => previous + 1);

    setFeedback("+1");
    setFlash(true);

    playScoreSound();

    const court = courtRef.current;

    if (court) {
      createParticles(
        court.clientWidth / 2,
        205
      );
    }

    window.setTimeout(() => {
      setFeedback("");
      setFlash(false);
    }, 650);

    window.setTimeout(() => {
      resetBall();
    }, 700);
  };

  /* =========================
     GAME PHYSICS
  ========================= */

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    const gravity = 900;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const delta = Math.min(
        (timestamp - lastTimeRef.current) / 1000,
        0.03
      );

      lastTimeRef.current = timestamp;

      const court = courtRef.current;

      if (!court) {
        animationRef.current =
          requestAnimationFrame(animate);

        return;
      }

      const ball = ballRef.current;

      if (!draggingRef.current) {
        ball.vy += gravity * delta;

        ball.x += ball.vx * delta;
        ball.y += ball.vy * delta;
      }

      const width = court.clientWidth;
      const height = court.clientHeight;

      /* =========================
         RING
      ========================= */

      const ringX = width / 2;
      const ringY = 205;
      const ringWidth = 110;

      const previousY =
        ball.y - ball.vy * delta;

      const crossedRing =
        previousY < ringY &&
        ball.y >= ringY;

      const insideRing =
        ball.x >
          ringX -
            ringWidth / 2 -
            25 &&
        ball.x <
          ringX +
            ringWidth / 2 +
            25;

      const falling = ball.vy > 0;

      if (
        shotActiveRef.current &&
        crossedRing &&
        insideRing &&
        falling &&
        !scoredRef.current
      ) {
        scoreBasket();
      }

      /* =========================
         WALLS
      ========================= */

      const radius = 32;

      if (ball.x - radius < 0) {
        ball.x = radius;
        ball.vx *= -0.65;
      }

      if (ball.x + radius > width) {
        ball.x = width - radius;
        ball.vx *= -0.65;
      }

      /* =========================
         FLOOR
      ========================= */

      const floorY = height - 95;

      if (ball.y + radius > floorY) {
        ball.y = floorY - radius;

        if (Math.abs(ball.vy) > 150) {
          ball.vy *= -0.55;
        } else {
          ball.vy = 0;
        }

        ball.vx *= 0.92;
      }

      /* =========================
         MISS
      ========================= */

      if (
        shotActiveRef.current &&
        !scoredRef.current &&
        ball.y > floorY - 5 &&
        Math.abs(ball.vy) < 120
      ) {
        shotActiveRef.current = false;

        setStreak(0);
        setFeedback("MISS");

        playMissSound();

        window.setTimeout(() => {
          setFeedback("");
        }, 500);

        window.setTimeout(() => {
          resetBall();
        }, 600);
      }

      /* =========================
         TOO FAR
      ========================= */

      if (ball.y > height + 200) {
        shotActiveRef.current = false;

        setStreak(0);
        setFeedback("MISS");

        playMissSound();

        window.setTimeout(() => {
          setFeedback("");
        }, 500);

        resetBall();
      }

      /* =========================
         UPDATE BALL
      ========================= */

      setBallPosition({
        x: (ball.x / width) * 100,
        y: (ball.y / height) * 100,
      });

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      lastTimeRef.current = 0;
    };
  }, [
    gameStarted,
    gameOver,
    resetBall,
  ]);

  /* =========================
     POINTER DOWN
  ========================= */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (gameOver || submitting) {
      return;
    }

    const court = courtRef.current;

    if (!court) {
      return;
    }

    const rect =
      court.getBoundingClientRect();

    const pointerX =
      event.clientX - rect.left;

    const pointerY =
      event.clientY - rect.top;

    const ball = ballRef.current;

    const distance = Math.sqrt(
      Math.pow(pointerX - ball.x, 2) +
        Math.pow(pointerY - ball.y, 2)
    );

    if (distance > 75) {
      return;
    }

    draggingRef.current = true;

    dragStartRef.current = {
      x: pointerX,
      y: pointerY,
    };

    ball.vx = 0;
    ball.vy = 0;

    setGameStarted(true);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  /* =========================
     POINTER MOVE
  ========================= */

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!draggingRef.current) {
      return;
    }

    const court = courtRef.current;

    if (!court) {
      return;
    }

    const rect =
      court.getBoundingClientRect();

    const pointerX =
      event.clientX - rect.left;

    const pointerY =
      event.clientY - rect.top;

    const start = dragStartRef.current;

    let dx = pointerX - start.x;
    let dy = pointerY - start.y;

    const maxDistance = 170;

    const distance = Math.sqrt(
      dx * dx + dy * dy
    );

    if (distance > maxDistance) {
      const ratio =
        maxDistance / distance;

      dx *= ratio;
      dy *= ratio;
    }

    ballRef.current.x = Math.max(
      40,
      Math.min(
        court.clientWidth - 40,
        start.x + dx
      )
    );

    ballRef.current.y = Math.max(
      60,
      Math.min(
        court.clientHeight - 100,
        start.y + dy
      )
    );

    setBallPosition({
      x:
        (ballRef.current.x /
          court.clientWidth) *
        100,

      y:
        (ballRef.current.y /
          court.clientHeight) *
        100,
    });

    /* =========================
       TRAJECTORY
    ========================= */

    const power = 7;

    const velocityX = dx * power;
    const velocityY = dy * power;

    const gravity = 900;

    const points: Point[] = [];

    const numberOfDots = 18;
    const timeStep = 0.055;

    for (
      let i = 1;
      i <= numberOfDots;
      i++
    ) {
      const time = i * timeStep;

      const predictedX =
        ballRef.current.x +
        velocityX * time;

      const predictedY =
        ballRef.current.y +
        velocityY * time +
        0.5 *
          gravity *
          time *
          time;

      if (
        predictedX < 0 ||
        predictedX >
          court.clientWidth ||
        predictedY < 0 ||
        predictedY >
          court.clientHeight
      ) {
        break;
      }

      points.push({
        x: predictedX,
        y: predictedY,
      });
    }

    setTrajectory(points);
  };

  /* =========================
     POINTER UP
  ========================= */

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!draggingRef.current) {
      return;
    }

    draggingRef.current = false;

    setTrajectory([]);

    const start = dragStartRef.current;
    const ball = ballRef.current;

    const dx = ball.x - start.x;
    const dy = ball.y - start.y;

    const power = 7;

    ball.vx = dx * power;
    ball.vy = dy * power;

    shotActiveRef.current = true;
    scoredRef.current = false;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer sudah dilepas
    }
  };

  /* =========================
     RESTART
  ========================= */

  const restartGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(120);

    setGameStarted(false);
    setGameOver(false);
    setSubmitting(false);

    setTrajectory([]);
    setFeedback("");
    setParticles([]);
    setFlash(false);

    lastTimeRef.current = 0;

    resetBall();
  };

  /* =========================
     SUBMIT SCORE
  ========================= */

  const submitScore = async () => {
    if (submitting) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/score",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            countryCode: country.code,
            score: score,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to submit score"
        );
      }

      localStorage.setItem(
        "basket-nations-score",
        String(score)
      );

      localStorage.setItem(
        "basket-nations-country",
        JSON.stringify(country)
      );

      window.location.href =
        "/leaderboard";
    } catch (error) {
      console.error(
        "Submit score error:",
        error
      );

      alert(
        "Gagal mengirim skor. Silakan coba lagi."
      );

      setSubmitting(false);
    }
  };

  /* =========================
     PAGE
  ========================= */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080b10] text-white">

      {/* =========================
          HEADER
      ========================= */}

      <header className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xl sm:h-11 sm:w-11 sm:text-2xl">
            🏀
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xs font-black tracking-wide sm:text-sm">
              BASKET NATIONS
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              World Basketball Challenge
            </p>
          </div>
        </Link>

        <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:px-4">

          <p className="text-[8px] uppercase tracking-widest text-gray-500 sm:text-[10px]">
            Your Country
          </p>

          <p className="mt-0.5 text-xs font-bold sm:text-sm">
            {countryLoading
              ? "Detecting..."
              : `${country.flag} ${country.name}`}
          </p>

        </div>

      </header>


      {/* =========================
          TITLE
      ========================= */}

      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-8">

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400 sm:text-sm sm:tracking-[0.25em]">
          World Basketball Challenge
        </p>

        <h2 className="mt-2 text-2xl font-black sm:text-4xl">
          SHOOT FOR YOUR COUNTRY
        </h2>

      </section>


      {/* =========================
          GAME
      ========================= */}

      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#10141c] shadow-2xl sm:rounded-3xl">

          {/* =========================
              SCORE BAR
          ========================= */}

          <div className="grid grid-cols-2 border-b border-white/10 md:grid-cols-3">

            <div className="border-r border-white/10 px-4 py-3 sm:px-6 sm:py-5">

              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 sm:text-xs">
                Score
              </p>

              <p className="mt-1 text-3xl font-black text-orange-500 sm:text-4xl">
                {score}
              </p>

            </div>


            <div className="border-r border-white/10 px-4 py-3 text-center sm:px-6 sm:py-5">

              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 sm:text-xs">
                Time
              </p>

              <p
                className={`mt-1 text-3xl font-black sm:text-4xl ${
                  timeLeft <= 10
                    ? "text-red-500"
                    : "text-white"
                }`}
              >
                {formatTime(timeLeft)}
              </p>

            </div>


            <div className="hidden px-6 py-5 text-right md:block">

              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Playing For
              </p>

              <p className="mt-1 text-xl font-black">
                {country.flag} {country.name}
              </p>

            </div>

          </div>


          {/* =========================
              COURT
          ========================= */}

          <div
            ref={courtRef}
            className={`relative min-h-[520px] select-none overflow-hidden bg-[#171b23] touch-pan-y transition-all duration-150 sm:min-h-[600px] ${
              flash
                ? "scale-[1.01] brightness-125"
                : ""
            }`}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >

            {/* LIGHT */}

            <div className="pointer-events-none absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-500/5 blur-3xl sm:top-20 sm:h-72 sm:w-72" />


            {/* FLOOR */}

            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full border-t-4 border-orange-500 bg-[#11151d] sm:h-28" />


            {/* COURT ARC */}

            <div className="pointer-events-none absolute bottom-12 left-1/2 h-32 w-64 -translate-x-1/2 rounded-t-full border-2 border-white/5 border-b-0 sm:bottom-16 sm:h-40 sm:w-80" />


            {/* =========================
                BACKBOARD
            ========================= */}

            <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 sm:top-24">

              <div className="h-24 w-40 rounded-lg border-4 border-white/70 bg-white/5 sm:h-32 sm:w-52">

                <div className="absolute left-1/2 top-1/2 h-12 w-20 -translate-x-1/2 -translate-y-1/2 border-4 border-orange-500 sm:h-16 sm:w-24" />

              </div>


              {/* RING */}

              <div
                className={`absolute left-1/2 top-[5.5rem] h-4 w-28 -translate-x-1/2 rounded-full border-4 border-orange-500 bg-orange-500/10 transition-all duration-150 sm:top-28 sm:h-5 sm:w-36 ${
                  flash
                    ? "scale-125 shadow-[0_0_40px_rgba(249,115,22,0.9)]"
                    : "shadow-[0_0_20px_rgba(249,115,22,0.25)]"
                }`}
              />


              {/* NET */}

              <div className="absolute left-1/2 top-[6.8rem] h-16 w-24 -translate-x-1/2 border-x-2 border-b-2 border-dashed border-white/40 sm:top-32 sm:h-20 sm:w-28" />

            </div>


            {/* =========================
                TRAJECTORY
            ========================= */}

            {trajectory.map(
              (point, index) => (
                <div
                  key={index}
                  className="pointer-events-none absolute rounded-full bg-orange-400"
                  style={{
                    left: point.x,
                    top: point.y,

                    width:
                      index < 4
                        ? "9px"
                        : "7px",

                    height:
                      index < 4
                        ? "9px"
                        : "7px",

                    transform:
                      "translate(-50%, -50%)",

                    opacity: Math.max(
                      0.25,
                      1 - index * 0.04
                    ),

                    boxShadow:
                      "0 0 10px rgba(249,115,22,0.8)",
                  }}
                />
              )
            )}


            {/* =========================
                PARTICLES
            ========================= */}

            {particles.map(
              (particle) => (
                <div
                  key={particle.id}
                  className="pointer-events-none absolute h-3 w-3 animate-ping rounded-full bg-orange-400"
                  style={{
                    left: particle.x,
                    top: particle.y,

                    transform:
                      `translate(-50%, -50%) translate(${particle.dx}px, ${particle.dy}px)`,
                  }}
                />
              )
            )}


            {/* =========================
                FEEDBACK
            ========================= */}

            {feedback && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">

                <div
                  className={`animate-bounce text-6xl font-black sm:text-7xl ${
                    feedback === "+1"
                      ? "text-orange-400"
                      : "text-white/60"
                  }`}
                  style={{
                    textShadow:
                      "0 0 30px rgba(249,115,22,0.8)",
                  }}
                >
                  {feedback}
                </div>

              </div>
            )}


            {/* =========================
                STREAK
            ========================= */}

            {streak >= 2 &&
              !gameOver && (
                <div className="pointer-events-none absolute right-3 top-3 z-20 sm:right-6 sm:top-6">

                  <div className="rounded-xl border border-orange-500/20 bg-black/40 px-3 py-2 text-right backdrop-blur sm:rounded-2xl sm:px-5 sm:py-3">

                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 sm:text-xs">
                      Streak
                    </p>

                    <p className="text-lg font-black text-orange-400 sm:text-2xl">
                      🔥 {streak}
                    </p>

                  </div>

                </div>
              )}


            {/* =========================
                BALL
            ========================= */}

            <div
              className="absolute flex h-14 w-14 cursor-grab touch-none items-center justify-center rounded-full bg-orange-500 text-3xl shadow-2xl shadow-orange-500/30 active:cursor-grabbing sm:h-16 sm:w-16 sm:text-4xl"
              style={{
                left: `${ballPosition.x}%`,
                top: `${ballPosition.y}%`,
                transform:
                  "translate(-50%, -50%)",
              }}
              onPointerDown={
                handlePointerDown
              }
            >
              🏀
            </div>


            {/* =========================
                INSTRUCTION
            ========================= */}

            {!gameStarted &&
              !gameOver && (
                <div className="pointer-events-none absolute bottom-3 left-1/2 w-full -translate-x-1/2 px-4 text-center sm:bottom-5">

                  <p className="text-xs font-black sm:text-sm">
                    DRAG THE BALL TO SHOOT
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                    Aim at the ring and release.
                  </p>

                </div>
              )}


            {/* =========================
                GAME OVER
            ========================= */}

            {gameOver && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/85 px-4 backdrop-blur-md sm:px-6">

                <div className="w-full max-w-md text-center">

                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400 sm:text-sm">
                    TIME&apos;S UP
                  </p>

                  <h3 className="mt-2 text-4xl font-black sm:mt-3 sm:text-5xl">
                    GAME OVER
                  </h3>


                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:mt-8 sm:rounded-3xl sm:p-8">

                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:text-xs">
                      YOUR SCORE
                    </p>

                    <p className="mt-2 text-6xl font-black text-orange-500 sm:text-7xl">
                      {score}
                    </p>

                    <p className="mt-2 text-sm text-gray-400 sm:mt-3">
                      points for {country.flag}{" "}
                      {country.name}
                    </p>

                  </div>


                  {/* BUTTONS */}

                  <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2">

                    <button
                      onClick={submitScore}
                      disabled={submitting}
                      className="rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-black transition hover:bg-orange-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-2xl sm:px-6 sm:py-4"
                    >
                      {submitting
                        ? "SUBMITTING..."
                        : "SUBMIT SCORE"}
                    </button>


                    <button
                      onClick={restartGame}
                      disabled={submitting}
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3.5 text-sm font-black transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-2xl sm:px-6 sm:py-4"
                    >
                      PLAY AGAIN
                    </button>

                  </div>

                </div>

              </div>
            )}

          </div>


          {/* =========================
              INSTRUCTIONS
          ========================= */}

          <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-bold sm:text-base">
                How to play
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                Pull the ball away from the
                direction you want to shoot.
                Release to launch.
              </p>

            </div>

            <div className="w-fit rounded-xl bg-orange-500/10 px-3 py-2 text-xs font-bold text-orange-400 sm:px-4 sm:py-3 sm:text-sm">
              🏀 Every basket = +1 point
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER INFO
      ========================= */}

      <p className="px-4 pb-8 text-center text-[10px] text-gray-600 sm:text-xs">
        Your score contributes to{" "}
        {country.name}&apos;s leaderboard.
      </p>

    </main>
  );
}