export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-ink mb-2">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export const fieldClass =
  "w-full bg-transparent border border-ink/25 px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2";
