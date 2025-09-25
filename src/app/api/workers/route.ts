// import { NextResponse } from 'next/server'
// import workersData from '../../../../workers.json'

// export async function GET() {
//   try {
//     return NextResponse.json({
//       success: true,
//       data: workersData
//     })
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to fetch workers data'
//     }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server";
import workersData from "../../../../workers.json";

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: workersData,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch workers data",
      },
      { status: 500 }
    );
  }
}
