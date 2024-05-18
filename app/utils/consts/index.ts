import { getDateAsYYYYMMDD } from "@/utils/functions"
import { HTMLInputTypeAttribute } from "react";

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const animeStatus: { [key: string]: { name: string, color: string } } = {
  Watching: {
    name: "Watching",
    color: "text-[#00ffff]"
  },
  Dropped: {
    name: "Dropped",
    color: "text-orange-500"
  },
  Finished: {
    name: "Finished",
    color: "text-green-500"
  },
  Rewatching: {
    name: "Re-Watching",
    color: "text-purple-400"
  },
}

export const animeUserStatus: {
  [key: string]: {
    type: HTMLInputTypeAttribute;
    defaultValue: any;
    cursor: string;
    title: string;
    min?: number;
    max?: number;
  }
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
}
