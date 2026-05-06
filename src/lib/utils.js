import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (jsonDate) => {
  return new Date(jsonDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const eliteDateFormat = () => {
  const time = new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      second: "2-digit",
      minute: "2-digit",
    })
    .toLocaleLowerCase()
    .replace(" ", "");

  const weekDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const theDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${time} | ${weekDay} | ${theDate}`;
};



/*
const now = new Date();

const year = now.getFullYear();   // e.g., 2026
const month = now.getMonth();     // 0-11 (January is 0)
const date = now.getDate();       // 1-31
const day = now.getDay();         // 0-6 (Sunday is 0)
const hour = now.getHours();      // 0-23
const minute = now.getMinutes();  // 0-59
const second = now.getSeconds();  // 0-59
const ms = now.getMilliseconds(); // 0-999
*/
