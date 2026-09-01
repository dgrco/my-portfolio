import { ImageResponse } from "next/og";

// Required by output: export, which has no runtime to render this on demand.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Dante Grieco, software engineer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f0ece3",
          color: "#141210",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#6b6154",
          }}
        >
          Software engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Dante Grieco
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#6b6154",
              marginTop: 24,
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Backends in Go and C, and writeups on how they actually work.
          </div>
        </div>
      </div>
    ),
    size
  );
}
