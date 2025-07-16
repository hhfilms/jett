"use client";

import {createContext, useContext} from "react";
import type {Stat, Article, Photo, Schedule} from "@/types/types";

type SanityData = {
  stats: Stat[];
  articles: Article[];
  photos: Photo[];
  schedule: Schedule[];
};

const SanityDataContext = createContext<SanityData | undefined>(undefined);

export const useSanityData = () => {
  const context = useContext(SanityDataContext);
  if (!context) throw new Error("useSanityData must be used inside <SanityDataProvider>");
  return context;
};

export const SanityDataProvider = ({children, value}: {children: React.ReactNode; value: SanityData}) => {
  return <SanityDataContext.Provider value={value}>{children}</SanityDataContext.Provider>;
};
