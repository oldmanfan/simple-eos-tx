import fetch from "cross-fetch";

(async function main() {
  let p = {digest: '123456789abcdef0',public_key_type: "EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA"};
  // let resp  = await fetch(`http://127.0.0.1:8900/v1/wallet/sign_digest`, {method: 'POST', body: '["123456789abcdef0","EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA"]'});
  // let resp  = await fetch(`http://127.0.0.1:8900/v1/wallet/sign_digest`, {method: 'POST', body: JSON.stringify(p)});
  let resp  = await fetch("http://127.0.0.1:8900/v1/wallet/sign_digest", {
    body: '["123456789abcdef0","EOS5nVrXNHqP87qdtMsXgyTBFpCQXWvcqKtyaBtp4gQztXro4TiuA"]',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })

  console.log(JSON.stringify(await resp.json()))
})();