import { getAuthSession } from "@/lib/auth";
import { NextRequest } from "next/server";
import { DBOutput } from "../route";
import { db } from "@/lib/db";

import jwt from "jsonwebtoken";
import crypto from "node:crypto";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const session = (await getAuthSession()) as DBOutput | null;

    if (!session?.user?.email)
      return new Response("Unauthorized", { status: 400 });

    const _app = await db.app.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!_app) return new Response("App not found", { status: 401 });

    return new Response(
      JSON.stringify({
        success: 1,
        appId: _app.appId,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response("Something went wrong while creating a new app!", {
      status: 500,
    });
  }
}

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const session = (await getAuthSession()) as DBOutput | null;

    if (!session?.user?.email)
      return new Response("Unauthorized", { status: 400 });

    let key = crypto.randomBytes(32).toString("hex");
    const app_secret = `pss:v1:` + jwt.sign(key, process.env.JWT_SECRET!);

    await db.app.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        appSecret: app_secret,
        updatedAt: new Date(),
      },
    });

    return new Response(
      JSON.stringify({
        success: 1,
        app_secret,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response("Something went wrong while creating a new app!", {
      status: 500,
    });
  }
}
