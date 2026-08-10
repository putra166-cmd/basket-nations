import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } =
      await supabaseAdmin
        .from("country_scores")
        .select(
          "country_code, country_name, flag, total_score"
        )
        .order("total_score", {
          ascending: false,
        })
        .order("country_name", {
          ascending: true,
        });

    if (error) {
      console.error(
        "Leaderboard error:",
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
      countries: data || [],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to load leaderboard",
      },
      { status: 500 }
    );
  }
}