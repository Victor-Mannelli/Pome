import { getDateAsYYYYMMDD } from "@/utils/functions";
import { HTMLInputTypeAttribute } from "react";

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const animeUserStatus: { [key: string]: { name: string; color: string; }; } = {
  Watching: {
    name: "Watching",
    color: "text-[#00ffff]",
  },
  Dropped: {
    name: "Dropped",
    color: "text-orange-500",
  },
  Finished: {
    name: "Finished",
    color: "text-green-500",
  },
  Rewatching: {
    name: "Re-Watching",
    color: "text-purple-400",
  },
};

export const airingStatusOptions: { [key: string]: string; } = {
  "FINISHED": "Finished",
  "RELEASING": "Releasing",
  "NOT_YET_RELEASED": "Not yet Released",
  // "CANCELLED": "Cancelled",
  // "HIATUS": "Hiatus"
};

export const animeUserData: {
  [key: string]: {
    type: HTMLInputTypeAttribute;
    defaultValue: string | number | null;
    cursor: string;
    title: string;
    min?: number;
    max?: number;
  };
} = {
  score: {
    defaultValue: 0,
    title: "Score",
    type: "number",
    cursor: "text",
    min: 0,
    max: 10,
  },
  progress: {
    defaultValue: 0,
    title: "Progress",
    type: "number",
    cursor: "text",
    min: 0,
  },
  rewatches: {
    defaultValue: 0,
    title: "Rewatches",
    type: "number",
    cursor: "text",
    min: 0,
  },
  start_date: {
    defaultValue: getDateAsYYYYMMDD(),
    title: "Start Date",
    type: "date",
    cursor: "default",
  },
  finish_date: {
    defaultValue: null,
    title: "Finish Date",
    type: "date",
    cursor: "default",
  },
};

export const titlesFilterParser = {
  "RELEASING": "New Animes!",
  "FINISHED": "Finished Animes!",
  "NOT_YET_RELEASED": "Comming soon!",
};

export const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export const animeYearOptions: number[] = Array.from(
  { length: new Date().getFullYear() - 1904 + 1 },
  (_, index) => 1904 + index,
).reverse();