import type { MetadataRoute } from "next"

const siteUrl = "https://sanatanmahaparishad.org"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/activities", priority: 0.8 },
    { path: "/officials", priority: 0.7 },
    { path: "/blogs", priority: 0.8 },
    { path: "/join", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 },
  ]

  const blogIds = ["1", "2", "3", "4", "5", "6"]

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...blogIds.map((id) => ({
      url: `${siteUrl}/blogs/${id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
