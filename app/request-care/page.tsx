import type { Metadata } from "next";
import { Suspense } from "react";
import { CareRequestWizard } from "@/components/forms/CareRequestWizard";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Request Care — Home Care Enquiry",
  description:
    "Request home care in Diani or anywhere in Kwale County. Tell us who needs care and the support required, and our team will get back to you.",
  alternates: { canonical: "/request-care" },
};

export default function RequestCarePage() {
  return (
    <>
      <PageHero
        eyebrow="Request Care"
        title={
          <>
            Let&apos;s Talk About <em>Your Loved One</em>
          </>
        }
        text="Five short steps. No account needed. Tell us about the support you're looking for and we'll get back to you to discuss it."
        path="/request-care"
        crumbs={[{ label: "Request Care" }]}
      />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <Suspense fallback={<div className="form-shell" style={{ minHeight: 520 }} />}>
            <CareRequestWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
