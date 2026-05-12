import { NextResponse } from "next/server";

function getClientId() {
  return process.env.OAUTH_CLIENT_ID ?? process.env.GITHUB_CLIENT_ID;
}

function getClientSecret() {
  return process.env.OAUTH_CLIENT_SECRET ?? process.env.GITHUB_CLIENT_SECRET;
}

function escapeScriptValue(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function callbackHtml(status: "success" | "error", content: Record<string, unknown>) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>GitHub Authentication</title>
  </head>
  <body>
    <p>Completing GitHub authentication...</p>
    <script>
      (function() {
        var message = ${escapeScriptValue(message)};

        function receiveMessage(event) {
          if (window.opener) {
            window.opener.postMessage(message, event.origin || "*");
          }
          window.removeEventListener("message", receiveMessage, false);
          window.close();
        }

        window.addEventListener("message", receiveMessage, false);

        if (window.opener) {
          window.opener.postMessage("authorizing:github", "*");
        } else {
          document.body.innerHTML = "<p>This window can now be closed.</p>";
        }
      })();
    </script>
  </body>
</html>`;
}

export async function GET(request: Request) {
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!clientId || !clientSecret) {
    return new NextResponse(
      callbackHtml("error", {
        error: "missing_oauth_environment",
        error_description: "Missing OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET environment variable.",
        provider: "github",
      }),
      { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  if (!code) {
    return new NextResponse(
      callbackHtml("error", {
        error: "missing_code",
        error_description: "GitHub did not return an authorization code.",
        provider: "github",
      }),
      { status: 400, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    return new NextResponse(
      callbackHtml("error", {
        error: tokenData.error ?? "token_exchange_failed",
        error_description: tokenData.error_description ?? "GitHub token exchange failed.",
        provider: "github",
      }),
      { status: 502, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  return new NextResponse(
    callbackHtml("success", {
      token: tokenData.access_token,
      provider: "github",
    }),
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
