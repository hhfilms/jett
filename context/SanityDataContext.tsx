"use client";

import {createContext, useContext} from "react";
import type {Stat, Article, Photo, Schedule} from "@/types/types";
import {useState} from "react";

type SanityData = {
  data: {
    stats: Stat[];
    articles: Article[];
    photos: Photo[];
    schedule: Schedule[];
  };
  setData: React.Dispatch<React.SetStateAction<SanityData["data"]>>;
};

const SanityDataContext = createContext<SanityData | undefined>(undefined);

export const useSanityData = () => {
  const context = useContext(SanityDataContext);
  if (!context) throw new Error("useSanityData must be used inside <SanityDataProvider>");
  return context;
};

export const SanityDataProvider = ({children, initialData}: {children: React.ReactNode; initialData: SanityData["data"]}) => {
  const [data, setData] = useState(initialData);

  return <SanityDataContext.Provider value={{data, setData}}>{children}</SanityDataContext.Provider>;
};
