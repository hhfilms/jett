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

export default async function Home() {
  const stats = await client.fetch<Stat[]>(STATS_QUERY, {}, options);
  const articles = await client.fetch<Article[]>(ARTICLES_QUERY, {}, options);
  const photos = await client.fetch<Photo[]>(PHOTOS_QUERY, {}, options);
  const schedule = await client.fetch<Schedule[]>(SCHEDULE_QUERY, {}, options);

  return (
    <SanityDataProvider initialData={{stats, articles, photos, schedule}}>
      <SanityLiveUpdater />
      <FullPageWrapper />
    </SanityDataProvider>
  );
}
