import { HTMLInputTypeAttribute } from "react";

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const animeStatus: {[key: string]: { name: string, color: string }} = {
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

export const animeUserStatus: {[key: string]: { type: HTMLInputTypeAttribute }} = {
  Score: {
    type: "number",
  },
  Progress: {
    type: "number",
  },
  Rewatches: {
    type: "number",
  },
  "Start Date": {
    type: "date",
  },
  "Finish Date": {
    type: "date",
  },
}
