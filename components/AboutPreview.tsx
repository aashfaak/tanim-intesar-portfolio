import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";

export function AboutPreview() {
  return (
    <section className="container-editorial py-16 md:py-24 border-t border-line">
      <ScrollReveal className="max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
          More than a portfolio.
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted leading-relaxed">
          This is a space for the things that don&apos;t fit on a CV — the
          places I visit, the ideas I explore, the lessons I learn, and the
          moments I want to remember.
        </p>
        <Button href="/about" variant="ghost" className="mt-6">
          A little more about me
        </Button>
      </ScrollReveal>
    </section>
  );
}
