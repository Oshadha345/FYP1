import { NextResponse } from "next/server";

function getClientId() {
  return process.env.OAUTH_CLIENT_ID ?? process.env.GITHUB_CLIENT_ID;
}

function errorResponse(message: string) {
  return new NextResponse(
    `<!doctype html><html><body><p>${message}</p></body></html>`,
    {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

export function GET(request: Request) {
  const clientId = getClientId();
  if (!clientId) {
    return errorResponse("Missing OAUTH_CLIENT_ID environment variable.");
  }

  const requestUrl = new URL(request.url);
  const callbackUrl = new URL("/api/callback", requestUrl.origin);
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  const state = requestUrl.searchParams.get("state");

  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", callbackUrl.toString());
  authUrl.searchParams.set("scope", "repo user");
  if (state) {
    authUrl.searchParams.set("state", state);
  }

  return NextResponse.redirect(authUrl);
}
