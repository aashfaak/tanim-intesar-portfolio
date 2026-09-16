import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Post detail pages are now stored in Firestore rather than static files,
// so they aren't available at build time here. This lists the static
// routes; if you'd like post URLs included too, this can be upgraded to
// fetch from Firestore server-side (with the firebase-admin SDK) or to
// call it as a dynamic route.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/journal",
    "/travel",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  return staticRoutes;
}
