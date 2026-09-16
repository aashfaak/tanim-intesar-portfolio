"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createDoc, updateDocById } from "@/lib/collections";
import type { TravelPost } from "@/lib/types";
import { FormField, fieldClass } from "@/components/admin/FormField";

type FormValues = Omit<TravelPost, "id">;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Images are edited as plain lines of "url | caption" to keep the form
// simple — no separate repeating-field UI needed.
function imagesToText(images: TravelPost["images"]) {
  return images.map((img) => `${img.src} | ${img.caption}`).join("\n");
}

function textToImages(text: string): TravelPost["images"] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [src, ...rest] = line.split("|");
      return { src: src.trim(), caption: rest.join("|").trim() };
    });
}

export function TravelForm({
  initial,
  postId,
}: {
  initial?: TravelPost;
  postId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(
    initial ?? {
      title: "",
      slug: "",
      location: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      coverImage: "",
      images: [],
      content: [""],
      featured: false,
    }
  );
  const [imagesText, setImagesText] = useState(
    initial ? imagesToText(initial.images) : ""
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
        images: textToImages(imagesText),
      };

      if (postId) {
        await updateDocById("travel", postId, payload);
      } else {
        await createDoc("travel", payload);
      }
      router.push("/admin/travel");
    } catch (err) {
      setError("Something went wrong saving this story. Please try again.");
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
        hint="Used in the URL, e.g. /travel/cox-s-bazar-off-season. Leave blank to generate from the title."
      >
        <input
          className={fieldClass}
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder={slugify(values.title) || "auto-generated-from-title"}
        />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormField label="Location">
          <input
            required
            className={fieldClass}
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
          />
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

      <FormField label="Cover image URL">
        <input
          required
          className={fieldClass}
          value={values.coverImage}
          onChange={(e) => update("coverImage", e.target.value)}
          placeholder="https://…"
        />
      </FormField>

      <FormField
        label="Short description"
        hint="Shown on cards and archive listings."
      >
        <textarea
          required
          rows={2}
          className={fieldClass}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </FormField>

      <FormField
        label="Story content"
        hint="One paragraph per line. Blank lines are ignored."
      >
        <textarea
          required
          rows={8}
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

      <FormField
        label="Additional photos"
        hint="One per line, formatted as: image URL | caption"
      >
        <textarea
          rows={5}
          className={fieldClass}
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          placeholder="https://example.com/photo.jpg | Morning light on the water"
        />
      </FormField>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={Boolean(values.featured)}
          onChange={(e) => update("featured", e.target.checked)}
        />
        Feature this story at the top of the travel archive
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-navy text-paper px-5 py-2.5 text-sm hover:bg-navy-light transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : postId ? "Save changes" : "Publish story"}
        </button>
      </div>
    </form>
  );
}
