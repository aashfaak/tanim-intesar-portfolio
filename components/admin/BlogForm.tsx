"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDoc, updateDocById } from "@/lib/collections";
import type { BlogPost } from "@/lib/types";
import { blogCategories } from "@/lib/types";
import { FormField, fieldClass } from "@/components/admin/FormField";

type FormValues = Omit<BlogPost, "id">;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function BlogForm({
  initial,
  postId,
}: {
  initial?: BlogPost;
  postId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(
    initial ?? {
      title: "",
      slug: "",
      category: "Business",
      date: new Date().toISOString().slice(0, 10),
      excerpt: "",
      image: "",
      readingTime: "5 min read",
      featured: false,
      content: [""],
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: FormValues = {
        ...values,
        slug: values.slug.trim() ? slugify(values.slug) : slugify(values.title),
        content: values.content.filter((p) => p.trim() !== ""),
      };

      if (postId) {
        await updateDocById("blog", postId, payload);
      } else {
        await createDoc("blog", payload);
      }
      router.push("/admin/blog");
    } catch (err) {
      setError("Something went wrong saving this article. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <FormField label="Title">
        <input
          required
          className={fieldClass}
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </FormField>

      <FormField
        label="Slug"
        hint="Used in the URL, e.g. /blog/why-starting-small-matters. Leave blank to generate from the title."
      >
        <input
          className={fieldClass}
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder={slugify(values.title) || "auto-generated-from-title"}
        />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormField label="Category">
          <select
            className={fieldClass}
            value={values.category}
            onChange={(e) =>
              update("category", e.target.value as FormValues["category"])
            }
          >
            {blogCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Date">
          <input
            type="date"
            required
            className={fieldClass}
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Reading time">
        <input
          className={fieldClass}
          value={values.readingTime}
          onChange={(e) => update("readingTime", e.target.value)}
          placeholder="5 min read"
        />
      </FormField>

      <FormField label="Cover image URL">
        <input
          required
          className={fieldClass}
          value={values.image}
          onChange={(e) => update("image", e.target.value)}
          placeholder="https://…"
        />
      </FormField>

      <FormField label="Excerpt" hint="Shown on cards and archive listings.">
        <textarea
          required
          rows={2}
          className={fieldClass}
          value={values.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
        />
      </FormField>

      <FormField
        label="Content"
        hint="One paragraph per line. Blank lines are ignored."
      >
        <textarea
          required
          rows={10}
          className={fieldClass}
          value={values.content.join("\n\n")}
          onChange={(e) =>
            update(
              "content",
              e.target.value.split(/\n\s*\n/).map((p) => p.trim())
            )
          }
        />
      </FormField>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={Boolean(values.featured)}
          onChange={(e) => update("featured", e.target.checked)}
        />
        Feature this article at the top of the blog archive
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-navy text-paper px-5 py-2.5 text-sm hover:bg-navy-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : postId ? "Save changes" : "Publish article"}
        </button>
      </div>
    </form>
  );
}
