"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Frontend-only validation for now. Structured so the submit handler
// below can later POST to Resend, Supabase, or a Formspree endpoint
// without changing the surrounding UI.
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      setStatus("error");
      return;
    }

    // TODO(integration): send `email` to Resend / Supabase / Formspree here.
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="border-t border-line bg-surface">
      <div className="container-editorial py-16 md:py-20">
        <div className="max-w-xl">
          <h2 className="font-serif text-2xl md:text-3xl text-ink">
            Stay in the loop.
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            Occasional notes about life, ideas, travels, and things I&apos;m
            learning.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Your email
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="Your email"
              className="flex-1 bg-paper border border-ink/25 px-4 py-3 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-invalid={status === "error"}
              aria-describedby="newsletter-status"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 bg-navy text-paper px-5 py-3 text-sm hover:bg-navy-light transition-colors"
            >
              Subscribe
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </form>

          <p id="newsletter-status" role="status" className="mt-3 text-sm min-h-[1.25rem]">
            {status === "success" && (
              <span className="text-navy">You&apos;re on the list — thank you.</span>
            )}
            {status === "error" && (
              <span className="text-red-700">
                That doesn&apos;t look like a valid email — mind checking it?
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
