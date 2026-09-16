"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  getAllGalleryDocs,
  createDoc,
  deleteDocById,
} from "@/lib/collections";
import type { GalleryImage } from "@/lib/types";
import { galleryCategories } from "@/lib/types";
import { FormField, fieldClass } from "@/components/admin/FormField";

type FormValues = Omit<GalleryImage, "id">;

const emptyForm: FormValues = {
  src: "",
  alt: "",
  category: "University",
  span: "normal",
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[] | null>(null);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const data = await getAllGalleryDocs<GalleryImage>();
    setImages(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createDoc("gallery", form);
      setForm(emptyForm);
      load();
    } catch (err) {
      setError("Couldn't add that photo — please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo? This can't be undone.")) return;
    await deleteDocById("gallery", id);
    load();
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink mb-8">Gallery photos</h1>

      <form
        onSubmit={handleAdd}
        className="max-w-2xl space-y-6 mb-14 border border-line p-6"
      >
        <h2 className="font-serif text-xl text-ink">Add a photo</h2>

        <FormField label="Image URL">
          <input
            required
            className={fieldClass}
            value={form.src}
            onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))}
            placeholder="https://…"
          />
        </FormField>

        <FormField label="Alt text" hint="A short description, for accessibility.">
          <input
            required
            className={fieldClass}
            value={form.alt}
            onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
          />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-6">
          <FormField label="Category">
            <select
              className={fieldClass}
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value as FormValues["category"],
                }))
              }
            >
              {galleryCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Grid size">
            <select
              className={fieldClass}
              value={form.span}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  span: e.target.value as FormValues["span"],
                }))
              }
            >
              <option value="normal">Normal</option>
              <option value="tall">Tall</option>
              <option value="wide">Wide</option>
            </select>
          </FormField>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-navy text-paper px-5 py-2.5 text-sm hover:bg-navy-light transition-colors disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add photo"}
        </button>
      </form>

      {images === null ? (
        <p className="text-muted">Loading…</p>
      ) : images.length === 0 ? (
        <p className="text-muted">No photos yet — add the first one above.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative">
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs text-muted truncate">{img.category}</p>
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                aria-label={`Delete ${img.alt}`}
                className="absolute top-2 right-2 bg-ink/70 text-paper p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
