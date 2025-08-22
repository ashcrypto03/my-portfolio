export default async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const body = JSON.parse(event.body || "{}");
    const key = String(body.key || "");
    const expected = process.env.ADMIN_KEY || process.env.VITE_ADMIN_KEY || "";
    if (!expected) {
      return { statusCode: 500, body: "Missing ADMIN_KEY" };
    }
    if (key === expected) {
      // Optionally mint a short-lived token here
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
    return { statusCode: 401, body: "Unauthorized" };
  } catch (e) {
    return { statusCode: 400, body: "Bad Request" };
  }
}
