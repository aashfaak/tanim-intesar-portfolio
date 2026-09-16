"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDoc, updateDocById } from "@/lib/collections";
import type { JournalPost } from "@/lib/types";
import { journalCategories } from "@/lib/types";
import { FormField, fieldClass } from "@/components/admin/FormField";
import { ImageUpload } from "@/components/admin/ImageUpload";

type FormValues = Omit<JournalPost, "id">;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function JournalForm({
  initial,
  postId,
}: {
  initial?: JournalPost;
  postId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(
    initial ?? {
      title: "",
      slug: "",
      category: "Daily Life",
      date: new Date().toISOString().slice(0, 10),
      excerpt: "",
      image: "",
      readingTime: "3 min read",
      featured: false,
      content: [""],
    }
  );
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (!values.image.trim()) throw new Error("Upload a cover image or add its URL.");
      const payload: FormValues = {
        ...values,
        slug: values.slug.trim() ? slugify(values.slug) : slugify(values.title),
        content: values.content.filter((p) => p.trim() !== ""),
      };

      if (postId) {
        await updateDocById("journal", postId, payload);
      } else {
        await createDoc("journal", payload);
      }
      router.push("/admin/journal");
    } catch (err) {
      setError("Something went wrong saving this entry. Please try again.");
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
        hint="Used in the URL, e.g. /journal/a-slow-morning. Leave blank to generate from the title."
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
            {journalCategories.map((c) => (
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
          placeholder="3 min read"
        />
      </FormField>

      <ImageUpload
        label="Upload cover image"
        onUploaded={(url) => update("image", url)}
        onUploadingChange={setUploadingImage}
      />

      <FormField label="Cover image URL (optional)">
        <input
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
        Feature this entry at the top of the journal archive
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploadingImage}
          className="bg-navy text-paper px-5 py-2.5 text-sm hover:bg-navy-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : postId ? "Save changes" : "Create entry"}
        </button>
      </div>
    </form>
  );
}
