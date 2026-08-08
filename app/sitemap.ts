import type { MetadataRoute } from "next"

const siteUrl = "https://sanatanmahaparishad.org"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/activities", priority: 0.8 },
    { path: "/officials", priority: 0.7 },
    { path: "/blogs", priority: 0.8 },
    { path: "/join", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
  ]

  const blogIds = ["1", "2", "3", "4", "5", "6"]

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...blogIds.map((id) => ({
      url: `${siteUrl}/blogs/${id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
