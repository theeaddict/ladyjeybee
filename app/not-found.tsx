import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", maxWidth: 640 }}>
        <p className="eyebrow">Page not found</p>
        <h1 className="display">
          We couldn&apos;t find <em>that page</em>
        </h1>
        <p style={{ margin: "20px 0 32px", color: "var(--muted)" }}>
          The page may have moved. You can return home or request care directly.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button href="/" variant="teal">
            Back to Home
          </Button>
          <Button href="/request-care" icon="calendar">
            Request Care
          </Button>
        </div>
      </div>
    </section>
  );
}
