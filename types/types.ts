export type Stat = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "stat";
  season: string;
  games: {
    _key: string;
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
  }[];
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

export type Game = {
  _key: string;
  gameDate: string;
  homeOrAway: "home" | "away";
  opponent: string;
  time: string;
  result: "win" | "loss" | "tie";
  score: string;
};

export type Schedule = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "schedule";
  year: string;
  games: Game[];
};

export type Video = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "schedule";
  videoUrl: string;
  caption: string;
};

export type Bio = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "bio";
  name: string;
  school?: string;
  jersyNumber?: number;
  position?: string;
  graduationYear?: string;
  nickname?: string;
  heightFeet?: number;
  heightInches?: number;
  weight?: number;
  statement?: string;
  gpa?: number;
};

export type ArticlesArray = Article[];
export type StatArray = Stat[];
export type PhotoArray = Photo[];
