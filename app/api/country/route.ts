import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const headers = request.headers;

  /*
  ==========================================
  COUNTRY DETECTION
  ==========================================

  Vercel akan memberikan negara pengunjung
  melalui header:

  x-vercel-ip-country

  Contoh:

  ID = Indonesia
  US = United States
  JP = Japan
  */

  const countryCode =
    headers.get(
      "x-vercel-ip-country"
    ) || "ID";

  /*
  ==========================================
  COUNTRY DATABASE SEMENTARA
  ==========================================
  */

  const countries: Record<
    string,
    {
      code: string;
      name: string;
      flag: string;
    }
  > = {
    ID: {
      code: "ID",
      name: "Indonesia",
      flag: "🇮🇩",
    },

    US: {
      code: "US",
      name: "United States",
      flag: "🇺🇸",
    },

    JP: {
      code: "JP",
      name: "Japan",
      flag: "🇯🇵",
    },

    PH: {
      code: "PH",
      name: "Philippines",
      flag: "🇵🇭",
    },

    ES: {
      code: "ES",
      name: "Spain",
      flag: "🇪🇸",
    },

    AU: {
      code: "AU",
      name: "Australia",
      flag: "🇦🇺",
    },

    FR: {
      code: "FR",
      name: "France",
      flag: "🇫🇷",
    },

    DE: {
      code: "DE",
      name: "Germany",
      flag: "🇩🇪",
    },

    CA: {
      code: "CA",
      name: "Canada",
      flag: "🇨🇦",
    },

    BR: {
      code: "BR",
      name: "Brazil",
      flag: "🇧🇷",
    },

    GB: {
      code: "GB",
      name: "United Kingdom",
      flag: "🇬🇧",
    },

    IT: {
      code: "IT",
      name: "Italy",
      flag: "🇮🇹",
    },

    NL: {
      code: "NL",
      name: "Netherlands",
      flag: "🇳🇱",
    },

    KR: {
      code: "KR",
      name: "South Korea",
      flag: "🇰🇷",
    },

    CN: {
      code: "CN",
      name: "China",
      flag: "🇨🇳",
    },

    IN: {
      code: "IN",
      name: "India",
      flag: "🇮🇳",
    },

    SG: {
      code: "SG",
      name: "Singapore",
      flag: "🇸🇬",
    },

    MY: {
      code: "MY",
      name: "Malaysia",
      flag: "🇲🇾",
    },

    TH: {
      code: "TH",
      name: "Thailand",
      flag: "🇹🇭",
    },

    VN: {
      code: "VN",
      name: "Vietnam",
      flag: "🇻🇳",
    },
  };

  const country =
    countries[
      countryCode.toUpperCase()
    ] || {
      code: countryCode.toUpperCase(),
      name: "International",
      flag: "🌎",
    };

  return NextResponse.json({
    country,
  });
}