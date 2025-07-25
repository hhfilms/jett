import Head from "next/head";
import {client} from "@/sanity/lib/client";
import type {Stat, Article, Photo, Schedule} from "@/types/types";
import FullPageWrapper from "@/components/FullPageWrapper";
import {SanityDataProvider} from "@/context/SanityDataContext";
import SanityLiveUpdater from "@/components/SanityLiveUpdater";

const STATS_QUERY = `*[_type == "stat"] | order(gameDate asc)[0...12]{...}`;
const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc)[0...12]{...}`;
const SCHEDULE_QUERY = `*[_type == "schedule"] | order(publishedAt asc)[0...12]{...}`;
const PHOTOS_QUERY = `*[_type == "photo"] | order(featured desc, _createdAt desc) {
  _id,
  caption,
  featured,
  image {
    asset->{
      _id,
      url
    }
  }
}`;
const options = {next: {revalidate: 30}};

export const metadata = {
  title: "Jett Lopez | Quarterback Stats, Schedule, & Highlights",
  description: "Follow Jett Lopez's high school football journey: game stats, schedule, photos, & articles.",
  openGraph: {
    title: "Jett Lopez | High School Quarterback",
    description: "Get up-to-date stats, highlights, and game info.",
    url: "https://jettlopez.com",
    images: [
      {
        url: "https://jettlopez.com/og_image.png",
        width: 1200,
        height: 630,
        alt: "Jett Lopez QB Highlights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jett Lopez | High School QB",
    description: "Track the journey of standout QB Jett Lopez.",
    images: ["https://jettlopez.com/og_image.png"],
  },
};

export default async function Home() {
  const stats = await client.fetch<Stat[]>(STATS_QUERY, {}, options);
  const articles = await client.fetch<Article[]>(ARTICLES_QUERY, {}, options);
  const photos = await client.fetch<Photo[]>(PHOTOS_QUERY, {}, options);
  const schedule = await client.fetch<Schedule[]>(SCHEDULE_QUERY, {}, options);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jett Lopez",
    url: "https://jettlopez.com",
    jobTitle: "High School Quarterback",
    affiliation: {
      "@type": "SportsTeam",
      name: "Amarillo High School",
    },
    sameAs: [],
  };

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      </Head>
      <SanityDataProvider initialData={{stats, articles, photos, schedule}}>
        <SanityLiveUpdater />
        <FullPageWrapper />
      </SanityDataProvider>
    </>
  );
}
