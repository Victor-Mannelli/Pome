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
    cursor: string;
    title: string;
    min?: number;
    max?: number;
  }
} = {
  score: {
    title: "Score",
    type: "number",
    cursor: "text",
    min: 0,
    max: 10,
  },
  progress: {
    title: "Progress",
    type: "number",
    cursor: "text",
    min: 0,
  },
  rewatches: {
    title: "Rewatches",
    type: "number",
    cursor: "text",
    min: 0,
  },
  start_date: {
    title: "Start Date",
    type: "date",
    cursor: "default",
  },
  finish_date: {
    title: "Finish Date",
    type: "date",
    cursor: "default",
  },
}
