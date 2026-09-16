"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function ImageUpload({
  label = "Upload image",
  onUploaded,
  onUploadingChange,
}: {
  label?: string;
  onUploaded: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setMessage("Choose an image smaller than 5 MB.");
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      setMessage("Cloudinary isn't configured yet.");
      return;
    }

    setUploading(true);
    onUploadingChange?.(true);
    setMessage(null);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", uploadPreset);
      uploadData.append("folder", "portfolio/content");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: uploadData }
      );
      const result = (await response.json()) as {
        secure_url?: string;
        error?: { message?: string };
      };

      if (!response.ok || !result.secure_url) {
        throw new Error(result.error?.message || "Image upload failed.");
      }

      onUploaded(result.secure_url);
      setMessage("Image uploaded successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  return (
    <div>
      <label className="block text-sm text-ink mb-2">{label}</label>
      <label className="inline-flex cursor-pointer items-center gap-2 border border-ink/25 px-4 py-2.5 text-sm text-ink hover:bg-surface">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? "Uploading…" : "Choose image"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          disabled={uploading}
          onChange={handleChange}
        />
      </label>
      <p className="mt-2 text-xs text-muted">JPG, PNG, WebP, or GIF — maximum 5 MB.</p>
      {message && <p className="mt-2 text-xs text-muted">{message}</p>}
    </div>
  );
}
