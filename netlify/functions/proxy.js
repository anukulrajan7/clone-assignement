import { Buffer } from "buffer";

export default async (req, res) => {
  const endpoint = req.path.replace("/.netlify/functions/proxy", "");
  const targetUrl = `https://apis.ccbp.in${endpoint}`;

  try {
    const apiRes = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? req.body : undefined,
    });

    // Pass through headers
    for (const [key, value] of apiRes.headers.entries()) {
      res.setHeader(key, value);
    }

    // Stream body back
    const buffer = await apiRes.arrayBuffer();
    res.status(apiRes.status).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).send("Proxy error");
  }
};
