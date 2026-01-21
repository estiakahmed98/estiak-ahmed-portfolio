import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/auth", "/user"],
      },
    ],
    sitemap: [`${siteMetadata.baseUrl}/sitemap.xml`],
    host: new URL(siteMetadata.baseUrl).host,
  };
}
