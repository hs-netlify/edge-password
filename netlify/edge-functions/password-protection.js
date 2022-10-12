import { HmacSha256 } from "https://deno.land/std/hash/sha256.ts";
import { decode } from "https://deno.land/std/encoding/base64url.ts";
import passwordPage from "../../pages/password-page.js";

const validateJWT = (token, secret) => {
  if (token) {
    const parts = token.split(".");
    if (parts.length !== 3) return;
    const calcSign = new HmacSha256(secret)
      .update(`${parts[0]}.${parts[1]}`)
      .toString();
    if (calcSign !== parts[2]) return;
    const pyld = JSON.parse(new TextDecoder().decode(decode(parts[1])));
    if (pyld.exp && Date.now() < pyld.exp) return;
    return pyld;
  } else {
    return;
  }
};

const handler = async (request, context) => {
  const password = Deno.env.get("password");
  if (password) {
    const jwtCookie = context.cookies.get("jwt");

    const secret =
      Deno.env.get("secret") ||
      "akldfgjsdflgkjfdlkgjsdflgkjsdfglkjdsfglkdjsgldskfgasdf";

    const valid = await validateJWT(jwtCookie, secret);

    if (jwtCookie && valid) {
      return context.next();
    } else {
      return new Response(passwordPage(), {
        headers: { "content-type": "text/html" },
      });
    }
  } else {
    return context.next();
  }
};

export default handler;
