import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const countryCode = String(
      body.countryCode || ""
    ).toUpperCase();

    const score = Number(body.score);

    if (!countryCode) {
      return NextResponse.json(
        {
          error: "Country code is required",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(score) ||
      score < 0
    ) {
      return NextResponse.json(
        {
          error: "Invalid score",
        },
        { status: 400 }
      );
    }

    if (score === 0) {
      return NextResponse.json({
        success: true,
        message: "No score to add",
      });
    }

    const { error } =
      await supabaseAdmin.rpc(
        "add_country_score",
        {
          p_country_code: countryCode,
          p_score: score,
        }
      );

    if (error) {
      console.error(
        "Supabase score error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      countryCode,
      score,
    });
  } catch (error) {
    console.error(
      "Score API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to submit score",
      },
      { status: 500 }
    );
  }
}