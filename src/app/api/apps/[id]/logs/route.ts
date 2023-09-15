import { getAuthSession } from "@/lib/auth";
import { NextRequest } from "next/server";
import { DBOutput } from "../route";
import { db } from "@/lib/db";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const session = (await getAuthSession()) as DBOutput | null;
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const per_page = Number(searchParams.get("per_page")) || 10;

    let limit: number = per_page;

    if (limit > 25) limit = 25;

    const skip = Math.max((page - 1) * limit, 0);

    const totalCount = await db.auditLog.count({
      where: {
        userId: session.user.id,
        appId: params.id,
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    const logs = await db.auditLog.findMany({
      skip,
      take: limit,
      where: {
        userId: session.user.id,
        appId: params.id,
      },
      select: {
        id: true,
        city: true,
        userId: false,
        appId: false,
        createdAt: true,
        eventType: true,
        ipAddress: true,
        location: true,
        byteLength: true,
        SDK: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return new Response(
      JSON.stringify({
        logs,
        totalPages,
        totalCount,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
