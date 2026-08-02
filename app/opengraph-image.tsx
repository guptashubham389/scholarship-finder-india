import { ImageResponse } from "next/og";

export const alt =
  "Scholarship Finder India — find out what you already qualify for";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time. Without this a shared WhatsApp link is a bare URL,
// which reads as spam and kills the forwarding loop the product depends on.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0d0f12",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#fbbf24",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          For engineering students in India
        </div>
        <div
          style={{
            color: "white",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 32,
          }}
        >
          You could already qualify for thousands in scholarships — and never
          know it.
        </div>
        <div style={{ color: "#9ca3af", fontSize: 32 }}>
          5 questions · free · scholarships-india.vercel.app
        </div>
      </div>
    ),
    size
  );
}
