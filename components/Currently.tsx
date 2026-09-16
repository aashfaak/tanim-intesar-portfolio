import { site } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Currently() {
  return (
    <section className="container-editorial py-16 md:py-24 border-t border-line">
      <ScrollReveal>
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-10">
          Currently
        </h2>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {site.currently.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.05}>
            <p className="text-xs uppercase tracking-wide text-muted mb-2">
              {item.label}
            </p>
            <p className="text-ink font-medium leading-snug">{item.value}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
