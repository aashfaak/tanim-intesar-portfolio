"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch {
      setError("That email or password wasn't recognized. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-editorial min-h-[70vh] flex items-center justify-center py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-line p-8"
      >
        <h1 className="font-serif text-2xl text-ink mb-1">Admin sign in</h1>
        <p className="text-sm text-muted mb-6">
          Manage journal, travel, blog, and gallery content.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-ink mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-ink/25 px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-ink mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-ink/25 px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full bg-navy text-paper px-5 py-2.5 text-sm hover:bg-navy-light transition-colors disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
