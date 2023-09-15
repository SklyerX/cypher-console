import { db } from "@/lib/db";
import { AuditLogValidator } from "@/lib/validators/audit-log";
import { DaysOfTheWeek } from "@/types";
import { getIpInfo } from "@/utils/api";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

type Days = "0" | "1" | "2" | "3" | "4" | "5" | "6";

const days = {
  "0": "Sunday",
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
};

export async function POST(req: NextRequest) {
  try {
    const appId = req.headers.get("x-app-id");
    const appSecret = req.headers.get("x-app-secret");
    const ip = req.ip;

    const AppIdPattern = /^cyApp:v1:[A-Za-z0-9\-_.]+$/;
    const appSecretPattern = /^pss:v1:[A-Za-z0-9\-_.]+$/;

    if (
      !appId ||
      !appSecret ||
      AppIdPattern.test(appId) === false ||
      appSecretPattern.test(appSecret) === false
    )
      return new Response("Invalid Credentials", { status: 400 });

    const body = await req.json();
    const { SDK, eventType, byteLength } = AuditLogValidator.parse(body);

    const _app = await db.app.findFirst({
      where: {
        appId,
        appSecret,
      },
    });

    const ip_info = await getIpInfo(ip);
    let country = ip_info.country;

    if (country === "United States") country = "United States of America";

    if (!_app)
      return new Response("An app with these credentials was not found", {
        status: 404,
      });

    await db.user.update({
      where: {
        id: _app?.userId,
      },
      data: {
        AuditLog: {
          create: {
            SDK: SDK as "NODEJS_SDK" | "WEB_PLATFORM",
            eventType: eventType as "ENCRYPT" | "DECRYPT",
            ipAddress: ip_info.ip || "Not Found",
            location: country || "Not Found",
            city: ip_info.city || "Not Found",
            appId: _app.id,
            byteLength,
          },
        },
      },
    });

    const newEventData = _app.totalEvents as DaysOfTheWeek[];

    const currentDay = new Date().getDay().toString() as Days;

    const dayOfTheWeekIndex = newEventData.findIndex(
      (event) => event.name === days[currentDay]
    );

    newEventData[dayOfTheWeekIndex] = {
      name: days[currentDay],
      events: newEventData[dayOfTheWeekIndex].events + 1,
    };

    await db.app.update({
      where: {
        id: _app.id,
        userId: _app.userId,
      },
      data: {
        totalEncrypts:
          eventType === "ENCRYPT" ? _app.totalEncrypts + 1 : _app.totalEncrypts,
        totalDecrypts:
          eventType === "DECRYPT" ? _app.totalDecrypts + 1 : _app.totalDecrypts,
        totalEvents: {
          set: [...newEventData],
        },
      },
    });

    return new Response("New audit log entry created", { status: 200 });
  } catch (err) {
    if (err instanceof ZodError)
      return new Response(JSON.stringify(err), { status: 400 });
    console.error(err);
    return new Response("Something went wrong while creating a new audit!", {
      status: 500,
    });
  }
}
