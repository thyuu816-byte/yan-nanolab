const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store",
    },
  });

const cleanText = (value, maxLength) =>
  String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);

const createMessageId = () => {
  const random = new Uint8Array(8);
  crypto.getRandomValues(random);
  const suffix = Array.from(random, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `message_${Date.now()}_${suffix}`;
};

export async function onRequest({ request, env }) {
  try {
    if (request.method !== "POST") {
      return jsonResponse({ error: "METHOD_NOT_ALLOWED" }, 405);
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return jsonResponse({ error: "UNSUPPORTED_CONTENT_TYPE" }, 415);
    }

    const body = await request.json();
    if (cleanText(body.website, 200)) {
      return jsonResponse({ ok: true });
    }

    const name = cleanText(body.name, 40);
    const email = cleanText(body.email, 100);
    const message = cleanText(body.message, 1000);

    if (!name || !message) {
      return jsonResponse({ error: "NAME_AND_MESSAGE_REQUIRED" }, 400);
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "INVALID_EMAIL" }, 400);
    }

    if (!env?.guestbook_messages) {
      return jsonResponse({ error: "MESSAGE_STORAGE_NOT_CONFIGURED" }, 503);
    }

    const id = createMessageId();
    const createdAt = new Date().toISOString();

    await env.guestbook_messages
      .prepare(
        `INSERT INTO guestbook_messages
          (id, name, email, message, created_at, status)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(id, name, email || null, message, createdAt, "unread")
      .run();

    return jsonResponse({ ok: true, id }, 201);
  } catch (error) {
    console.error("Guestbook submission failed", error);
    const storageMissing =
      /not defined|database|no such table|storage|binding/i.test(String(error?.message || error));

    return jsonResponse(
      { error: storageMissing ? "MESSAGE_STORAGE_NOT_CONFIGURED" : "MESSAGE_SUBMISSION_FAILED" },
      storageMissing ? 503 : 500
    );
  }
}
