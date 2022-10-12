import { encode } from "https://deno.land/std/encoding/base64url.ts";
import { HmacSha256 } from "https://deno.land/std/hash/sha256.ts";

const handler = async (request, context) => {
  const secret =
    Deno.env.get("secret") ||
    "akldfgjsdflgkjfdlkgjsdflgkjsdfglkjdsfglkdjsgldskfgasdf";

  const hdr = { alg: "HS256", typ: "JWT" };
  const data = { exp: Date.now(), a: "b", c: "d", e: 100000 };

  const password = await request.text();

  if (password === "password") {
    const bHdr = encode(new TextEncoder().encode(JSON.stringify(hdr)));
    const bPyld = encode(new TextEncoder().encode(JSON.stringify(data)));
    const oTkn = `${bHdr}.${bPyld}`;
    const authToken =
      oTkn + "." + new HmacSha256(secret).update(oTkn).toString();
    context.cookies.set({ name: "jwt", value: authToken });
    return context.json({ token: authToken });
  } else {
    return context.json({ error: "Incorrect Password" });
  }
};

export default handler;
