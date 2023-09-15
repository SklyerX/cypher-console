import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export interface DBOutput {
  user?: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const session = (await getAuthSession()) as DBOutput | null;

    if (!session?.user?.email)
      return new Response("Unauthorized", { status: 401 });

    const app = await db.app.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      select: {
        appSecret: false,
        appId: false,
        createdAt: true,
        name: true,
        totalEvents: true,
        updatedAt: true,
        totalDecrypts: true,
        totalEncrypts: true,
      },
    });

    if (!app) return new Response("App not found!", { status: 404 });

    return new Response(
      JSON.stringify({
        ...app,
        totalDecrypts: app.totalDecrypts,
        totalEncrypts: app.totalEncrypts,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong getting app info!", {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const session = (await getAuthSession()) as DBOutput | null;

    if (!session?.user?.email)
      return new Response("Unauthorized", { status: 401 });

    await db.app.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return new Response("Successfully deleted app", { status: 200 });
  } catch (err) {
    return new Response("Something went wrong while creating a new app!", {
      status: 500,
    });
  }
}
