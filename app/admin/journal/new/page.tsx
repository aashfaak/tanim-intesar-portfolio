import { JournalForm } from "@/components/admin/JournalForm";

export default function NewJournalPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink mb-8">New journal entry</h1>
      <JournalForm />
    </div>
  );
}
