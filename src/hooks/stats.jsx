"use client";
import { useContext } from "react";
import { ContactHistoryContext } from "../lib/FuncyFriend";

const UseStats = () => {
  const { entries } = useContext(ContactHistoryContext);

  console.log(entries);

  const call = entries.filter(({ type }) => type === "call");
  const video = entries.filter(({ type }) => type === "video");
  const text = entries.filter(({ type }) => type === "text");

  const statsByContact = [
    { type: "call", value: call.length, fill: "var(--chart-1)" },
    { type: "text", value: text.length, fill: "var(--chart-3)" },
    { type: "video", value: video.length, fill: "var(--chart-5)" },
  ];
  //   console.log(nameStats);

  const statsByName = 0;
  return { contactStats };
};

export default UseStats;
