import axios, { AxiosRequestHeaders } from "axios";
import rateLimit from "express-rate-limit";
import { performance } from "perf_hooks";
import crypto from "crypto";
import { NextResponse } from "next/server";

async function parseRequestBody(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json();
    return body;
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await req.formData();
    const body: any = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });
    return body;
  }

  return null;
}

async function handler(req: Request) {
  const start = performance.now();
  const url = new URL(req.url);
  const slug = url.pathname.split("/api/proxy/")[1];
  const nonce = crypto.randomBytes(16).toString("base64");
  const reqBody = await parseRequestBody(req);

  console.log(
    req.headers.get("Authorization"),
    req.headers.get("authorization")
  );

  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.BACKEND_URL}/${slug}${url.search ? url.search : ""}`,
      headers: {
        ...(req.headers as any),
        "x-forwarded-for":
          req.headers.get("x-forwarded-for") || req.headers.get("host") || "",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Content-Security-Policy": `default-src 'self'; script-src 'nonce-${nonce}'`,
        Authorization:
          // req.headers.get("Authorization") ||
          // req.headers.get("authorization") ||
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYWZiYjk4Yi1hMzZlLTQ0YmUtYjM4MC00YmM4NWZkNTJjNmEiLCJlbWFpbCI6ImtheW9kZW90aXRvanVtaUB5b3BtYWlsLmNvbSIsImlhdCI6MTcyNzc5OTg4MiwiZXhwIjoxNzI3ODAzNDgyfQ.EhrkOBgQE5Hm5WySRxk1xpPIL9yNrV8J0jiUr94P_JQ",
      },
      data: reqBody,
      timeout: 5000,
    });

    console.log(
      `[PROXY] ${req.method} ${slug} - ${response.status} - ${
        performance.now() - start
      }ms`
    );

    const responseHeaders = new Headers(response.headers as any);
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
      headers: responseHeaders,
    });

    return nextResponse;
  } catch (error: any) {
    const status = error.response?.status || 500;

    console.error(
      `[PROXY ERROR] ${req.method} ${slug} - ${status} - ${
        performance.now() - start
      }ms: ${error.message}`
    );

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
