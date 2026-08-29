import type { APIRoute } from "astro";

// Served on demand by the Node adapter (opt out of static prerendering).
export const prerender = false;

const isEmail = (v: unknown): v is string =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const nonEmpty = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

function reference(): string {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SN-${stamp}-${rand}`;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, message: "リクエスト形式が不正です。" });
  }

  const errors: Record<string, string> = {};
  if (!nonEmpty(payload.company)) errors.company = "会社名は必須です。";
  if (!nonEmpty(payload.name)) errors.name = "ご担当者名は必須です。";
  if (!isEmail(payload.email)) errors.email = "メールアドレスの形式が正しくありません。";
  if (!nonEmpty(payload.message)) errors.message = "ご相談内容は必須です。";

  if (Object.keys(errors).length > 0) {
    return json(422, {
      ok: false,
      message: "入力内容をご確認ください。",
      errors,
    });
  }

  const ref = reference();
  // In production this would enqueue a notification / persist the inquiry.
  console.log(
    `[consult] received inquiry ${ref} from ${String(payload.company)} <${String(
      payload.email,
    )}>`,
  );

  return json(200, {
    ok: true,
    reference: ref,
    message: "担当者より2営業日以内にご連絡いたします。",
  });
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
