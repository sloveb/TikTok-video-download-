import { instagramGetUrl } from "instagram-url-direct";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Instagram URL is required" });
  }

  try {
    const result = await instagramGetUrl(url);

    if (!result || !result.url_list || result.url_list.length === 0) {
      return res.status(404).json({ error: "No video found at this URL" });
    }

    return res.status(200).json({ videoUrl: result.url_list[0] });
  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({
      error: "Failed to fetch Instagram video: " + err.message,
    });
  }
  }
    
