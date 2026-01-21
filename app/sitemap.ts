import type { MetadataRoute } from "next";
import { portfolioStaticPaths, siteMetadata } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return portfolioStaticPaths.map((path: string) => ({
    url: new URL(path, siteMetadata.baseUrl).toString(),
    lastModified,
  }));
}
