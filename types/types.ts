export type Stat = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "stat";
  gameDate: string; // ISO date like '2024-06-07'
  opponent: string;
  homeOrAway: "home" | "away";
  passingYards: number;
  rushingYards: number;
  rushingTds: number;
  touchdowns: number;
  attempts: number;
  completions: number;
  interceptions: number;
};

export type Article = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "article";
  publishedAt: string; // ISO date like '2024-06-07'
  title: string;
  description: string;
  imageUrl: string;
  url: string;
};


export type Photo = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "photo";
  image: string;
  caption: string;
};

export type ArticlesArray = Article[];
export type StatArray = Stat[];
export type PhotoArray = Photo[];
