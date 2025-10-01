import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideo = async () => {
    if (!url) {
      alert("Please enter an Instagram video URL");
      return;
    }

    setLoading(true);
    setVideoUrl("");

    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok && data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        alert(data.error || "Failed to fetch video");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching video. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0015, #1a0033)",
        backgroundAttachment: "fixed", // background fix
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          maxHeight: "95vh", // 👈 Card height fixed
          overflowY: "auto", // 👈 Card ke andar scroll enable
          padding: "25px",
          borderRadius: "20px",
          background: "#0d001a",
          boxShadow: "0 0 25px rgba(0, 207, 255, 0.7)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            margin: "0 auto 15px",
            overflow: "hidden",
            border: "2px solid #00cfff",
            boxShadow: "0 0 20px #00cfff",
          }}
        >
          <img
            src="https://i.postimg.cc/dVWsQpKw/IMG-20250913-WA0039.jpg"
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <h1 style={{ color: "#00cfff", fontSize: "22px", marginBottom: "10px" }}>
          SBL Instagram Video Downloader
        </h1>

        <label
          style={{ display: "block", color: "#00cfff", marginTop: "15px" }}
        >
          Paste Insta URL
        </label>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.instagram.com/reel/..."
          style={{
            width: "90%",
            padding: "12px",
            margin: "12px 0",
            borderRadius: "10px",
            border: "2px solid #00cfff",
            background: "#000",
            color: "#fff",
            textAlign: "center",
            fontSize: "15px",
          }}
        />

        <button
          onClick={fetchVideo}
          disabled={loading}
          style={{
            width: "90%",
            padding: "14px",
            margin: "12px auto",
            borderRadius: "30px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            background: loading ? "#009fbb" : "#00cfff",
            color: "#fff",
            transition: "0.3s",
          }}
        >
          {loading ? "Fetching..." : "🎬 Fetch Video"}
        </button>

        {videoUrl && (
          <>
            <video
              src={videoUrl}
              controls
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "12px",
                boxShadow: "0 0 15px #00cfff",
              }}
            />
            <a
              href={videoUrl}
              download="instagram-video.mp4"
              style={{
                display: "block",
                marginTop: "12px",
                padding: "12px",
                borderRadius: "30px",
                border: "2px solid #00cfff",
                color: "#00cfff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              ⬇ Download Video
            </a>
          </>
        )}

        <div style={{ marginTop: "20px", fontSize: "13px", color: "gray" }}>
          <span style={{ color: "#00cfff", fontWeight: "bold" }}>
            Developed By ⚜️SBL HACKER⚜️
          </span>
        </div>
      </div>
    </div>
  );
    }
