import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for collaborations, conversations, or simply saying hello.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-14 md:pt-20 pb-24">
      <section className="container-editorial pb-14">
        <p className="text-xs tracking-wide text-muted mb-4">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight max-w-xl">
          Let&apos;s talk.
        </h1>
        <p className="mt-4 text-muted max-w-md leading-relaxed">
          For collaborations, conversations, ideas, or simply saying hello.
        </p>
      </section>

      <section className="container-editorial grid md:grid-cols-[1.3fr_1fr] gap-16">
        <ContactForm />

        <div>
          <p className="text-xs uppercase tracking-wide text-muted mb-3">
            Elsewhere
          </p>
          <ul className="space-y-3">
            {site.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink hover:text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs uppercase tracking-wide text-muted mt-8 mb-3">
            Email
          </p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline text-ink hover:text-navy break-all"
          >
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
