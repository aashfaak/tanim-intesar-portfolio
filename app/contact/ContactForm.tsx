"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(values: FormState): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Please share your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Please write a little more — at least 10 characters.";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length === 0) {
      // TODO(integration): send `form` to Resend / Supabase / Formspree here.
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  }

  if (submitted) {
    return (
      <div className="border border-line p-8 max-w-lg" role="status">
        <p className="font-serif text-xl text-ink">Message sent.</p>
        <p className="mt-2 text-muted">
          Thank you for reaching out — I&apos;ll get back to you as soon as I
          can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm text-ink mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-transparent border border-ink/25 px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-red-700">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-ink mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-transparent border border-ink/25 px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-ink mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-transparent border border-ink/25 px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2 bg-navy text-paper px-5 py-3 text-sm hover:bg-navy-light transition-colors"
      >
        Send message
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
