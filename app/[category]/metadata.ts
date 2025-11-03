import { Metadata } from "next";

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = params.category;
  const categoryName = category === "series" ? "TV Series" : category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `Vote on ${categoryName} - Rate It or Hate It`,
    description: `Vote on your favorite ${categoryName.toLowerCase()}! Rate or hate shows like Breaking Bad, Dark, Game of Thrones, Stranger Things, and more. See hilarious memes and real-time rankings. No login required!`,
    keywords: [
      `vote ${category}`,
      `rate ${category}`,
      `${category} voting`,
      `${category} ranking`,
      "breaking bad",
      "dark series",
      "game of thrones",
      "stranger things",
      "tv series memes",
      "no login voting"
    ],
    openGraph: {
      title: `Vote on ${categoryName} - Rate It or Hate It`,
      description: `Vote on your favorite ${categoryName.toLowerCase()}! No login required. See hilarious memes and real-time rankings.`,
      type: "website",
      url: `https://rate-it-or-hate-it.vercel.app/${category}`,
      images: [
        {
          url: `/og/${category}.png`,
          width: 1200,
          height: 630,
          alt: `Rate It or Hate It - ${categoryName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Vote on ${categoryName} - Rate It or Hate It`,
      description: `Vote on your favorite ${categoryName.toLowerCase()}! No login required.`,
      images: [`/og/${category}.png`],
    },
    alternates: {
      canonical: `https://rate-it-or-hate-it.vercel.app/${category}`,
    },
  };
}
