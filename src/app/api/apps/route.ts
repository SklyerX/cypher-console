import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AppValidator } from "@/lib/validators/app";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { DBOutput } from "./[id]/route";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email)
      return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = AppValidator.parse(body);

    let iv = crypto.randomBytes(16).toString("hex");
    let key = crypto.randomBytes(32).toString("hex");

    const JWT_SECRET = nanoid(19);

    const app_id = `cyApp:v1:` + jwt.sign(iv, JWT_SECRET);
    const app_secret = `pss:v1:` + jwt.sign(key, JWT_SECRET);

    await db.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        Apps: {
          create: {
            appId: app_id,
            appSecret: app_secret,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
            totalDecrypts: 0,
            totalEncrypts: 0,
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
        },
      },
    });

    return new Response(
      JSON.stringify({
        success: 1,
        app_credentials: {
          app_id,
          app_secret,
          jwt_secret: JWT_SECRET,
        },
      })
    );
  } catch (err) {
    if (err instanceof ZodError)
      return new Response(JSON.stringify(err), { status: 400 });
    console.error(err);
    return new Response("Something went wrong while creating a new app!", {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = (await getAuthSession()) as DBOutput | null;
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const per_page = Number(searchParams.get("per_page")) || 10;

    let limit: number = per_page;

    if (limit > 25) limit = 25;

    const skip = Math.max((page - 1) * limit, 0);

    const totalCount = (
      await db.app.findMany({
        where: {
          userId: session.user.id,
        },
      })
    ).length;

    const totalPages = Math.ceil(totalCount / limit);

    const apps = await db.app.findMany({
      skip,
      take: limit,
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        totalEvents: true,
      },
    });

    return new Response(
      JSON.stringify({
        apps,
        totalPages,
        totalCount,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
