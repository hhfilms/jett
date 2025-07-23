"use client";

import {useEffect} from "react";
import {client} from "@/sanity/lib/client";
import {useSanityData} from "@/context/SanityDataContext";

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

export default function SanityLiveUpdater() {
  const {setData} = useSanityData();

  useEffect(() => {
    const subStats = client.listen(STATS_QUERY).subscribe(() => {
      client.fetch(STATS_QUERY).then((newStats) => {
        setData((prev) => ({...prev, stats: newStats}));
      });
    });

    const subArticles = client.listen(ARTICLES_QUERY).subscribe(() => {
      client.fetch(ARTICLES_QUERY).then((newArticles) => {
        setData((prev) => ({...prev, articles: newArticles}));
      });
    });

    const subSchedule = client.listen(SCHEDULE_QUERY).subscribe(() => {
      client.fetch(ARTICLES_QUERY).then((newArticles) => {
        setData((prev) => ({...prev, articles: newArticles}));
      });
    });

    const subPhotos = client.listen(PHOTOS_QUERY).subscribe(() => {
      client.fetch(ARTICLES_QUERY).then((newArticles) => {
        setData((prev) => ({...prev, articles: newArticles}));
      });
    });

    // same for photos and schedule

    return () => {
      subStats.unsubscribe();
      subArticles.unsubscribe();
      subSchedule.unsubscribe();
      subPhotos.unsubscribe();
      subArticles.unsubscribe();
      // etc.
    };
  }, []);

  return null; // <-- You need this!
}
