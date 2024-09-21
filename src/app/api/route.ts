import axios, { AxiosRequestHeaders } from "axios";
import rateLimit from "express-rate-limit";
import { performance } from "perf_hooks";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  limiter(req, res, async () => {
    const start = performance.now();

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );

    const nonce = crypto.randomBytes(16).toString("base64");
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self'; script-src 'nonce-${nonce}'`
    );

    try {
      const response = await axios({
        method: req.method,
        url: `${process.env.BACKEND_URL}/${req.url}`,
        headers: {
          ...(req.headers as AxiosRequestHeaders),
          "x-forwarded-for":
            req.headers["x-forwarded-for"] || req.socket.remoteAddress || "",
        },
        data: req.body,
        timeout: 5000,
      });

      console.log(
        `[PROXY] ${req.method} ${req.url} - ${response.status} - ${
          performance.now() - start
        }ms`
      );

      res.status(response.status).json(response.data);
    } catch (error: any) {
      const status = error.response?.status || 500;

      console.error(
        `[PROXY ERROR] ${req.method} ${req.url} - ${status} - ${
          performance.now() - start
        }ms: ${error.message}`
      );

      res.status(status).json({
        error:
          "An error occurred while processing your request. Please try again later.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  });
}
