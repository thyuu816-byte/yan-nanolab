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

export async function onRequestPost({ request }) {
  try {
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

    const id = createMessageId();
    const record = {
      id,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    await guestbook_messages.put(id, JSON.stringify(record));
    return jsonResponse({ ok: true, id }, 201);
  } catch (error) {
    console.error("Guestbook submission failed", error);
    const storageMissing =
      typeof guestbook_messages === "undefined" ||
      /not defined|namespace|storage|binding/i.test(String(error?.message || error));

    return jsonResponse(
      { error: storageMissing ? "MESSAGE_STORAGE_NOT_CONFIGURED" : "MESSAGE_SUBMISSION_FAILED" },
      storageMissing ? 503 : 500
    );
  }
}

export function onRequest() {
  return jsonResponse({ error: "METHOD_NOT_ALLOWED" }, 405);
}
