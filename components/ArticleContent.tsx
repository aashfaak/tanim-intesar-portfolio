export function ArticleContent({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="container-editorial py-12 md:py-16">
      <div className="prose-article mx-auto">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
