import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="container-editorial py-32 text-center">
      <p className="text-xs tracking-wide text-muted mb-4">404</p>
      <h1 className="font-serif text-3xl md:text-4xl text-ink">
        This page hasn&apos;t been written yet.
      </h1>
      <p className="mt-4 text-muted max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved.
      </p>
      <Button href="/" variant="secondary" className="mt-8 mx-auto w-fit">
        Back to the homepage
      </Button>
    </div>
  );
}
