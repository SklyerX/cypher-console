import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const key = searchParams.get("key");

    if (key !== process.env.ADMIN_BYPASS_KEY!)
      return new Response(
        "01010101 01101110 01100001 01110101 01110100 01101000 01101111 01110010 01101001 01111010 01100101 01100100",
        { status: 401 }
      );

    const apps = await db.app.findMany({});

    for (const app of apps) {
      await db.app.update({
        where: {
          id: app.id,
        },
        data: {
          totalEvents: [
            {
              name: "Sunday",
              events: 0,
            },
            {
              name: "Monday",
              events: 0,
            },
            {
              name: "Tuesday",
              events: 0,
            },
            {
              name: "Wednesday",
              events: 0,
            },
            {
              name: "Thursdaay",
              events: 0,
            },
            {
              name: "Friday",
              events: 0,
            },
            {
              name: "Saturday",
              events: 0,
            },
          ],
        },
      });
    }

    return new Response("Successfully resetted all events", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
