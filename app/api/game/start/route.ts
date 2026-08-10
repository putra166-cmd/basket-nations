import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const countryCode = String(body.countryCode || "")
      .trim()
      .toUpperCase();

    // Pastikan kode negara terdiri dari 2 huruf
    if (!/^[A-Z]{2}$/.test(countryCode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid country code",
        },
        { status: 400 }
      );
    }

    // Membuat pertandingan baru
    const { data, error } = await supabase
      .from("games")
      .insert({
        country_code: countryCode,
        score: 0,
        status: "playing",
      })
      .select(
        "id, country_code, score, started_at, status"
      )
      .single();

    if (error) {
      console.error("START GAME ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to create game",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      game: data,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}