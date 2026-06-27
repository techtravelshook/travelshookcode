import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m"), // 5 requests every minute
  analytics: false,
});

const blockedAgents = [
  "curl",
  "wget",
  "python",
  "scrapy",
  "axios",
  "postman",
  "insomnia",
];

export function withSecurity(handler) {
  return async (req) => {
    try {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";
      const { success } = await ratelimit.limit(ip);
console.log("IP:", ip);

const result = await ratelimit.limit(ip);

console.log(result);

      if (!success) {
        return Response.json(
          {
            success: false,
            message: "Too many requests. Please try again later.",
          },
          { status: 429 }
        );
      }
      const userAgent = req.headers.get("user-agent") || "";

      if (!userAgent) {
        return Response.json(
          {
            success: false,
            message: "Forbidden",
          },
          { status: 403 }
        );
      }

      const ua = userAgent.toLowerCase();

      if (blockedAgents.some((bot) => ua.includes(bot))) {
        return Response.json(
          {
            success: false,
            message: "Bot detected.",
          },
          { status: 403 }
        );
      }
      const contentLength = Number(req.headers.get("content-length") || 0);

      if (contentLength > 10000) {
        return Response.json(
          {
            success: false,
            message: "Payload too large.",
          },
          { status: 413 }
        );
      }
      return handler(req);

    } catch (err) {
      console.error("Security Middleware:", err);

      return Response.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  };
}