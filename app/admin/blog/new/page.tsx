import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink mb-8">New blog article</h1>
      <BlogForm />
    </div>
  );
}
