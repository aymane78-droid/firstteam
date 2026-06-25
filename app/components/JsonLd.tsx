export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "First Team Group",
    "url": "https://firstteam-group.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://firstteam-group.com/icon.png",
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://www.youtube.com/@FIRSTTEAM",
      "https://www.instagram.com/firstteam101/",
      "https://x.com/FirstTeam101",
      "https://www.facebook.com/FirstTeam101/",
      "https://www.tiktok.com/@firstteam_tiktok",
      "https://www.twitch.tv/firstteam101"
    ]
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
