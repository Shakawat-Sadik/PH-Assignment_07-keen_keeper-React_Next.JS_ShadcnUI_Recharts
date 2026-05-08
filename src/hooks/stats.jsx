"use client";
import { useContext, useMemo } from "react";
import { ContactHistoryContext } from "../lib/FuncyFriend";

const UseStats = () => {
  const { contactHistory } = useContext(ContactHistoryContext);

  const contactStats = useMemo(() => {
    const counts = { call: 0, text: 0, video: 0 };

    // console.log(contactHistory);
    // console.log(Object.values(contactHistory));
    
      Object.values(contactHistory)
        .flatMap((items) => items)
      .reduce((acc, { type }) => {
        if (type in acc) {
          acc[type] += 1;
        }
        return acc;
      }, counts);

    return [
        { type: "call", name: "Call", value: counts.call, fill: "var(--chart-1)" },
        { type: "text", name: "Text", value: counts.text, fill: "var(--chart-3)" },
        { type: "video", name: "Video", value: counts.video, fill: "var(--chart-5)" },
    ];
  }, [contactHistory]);

  return { contactStats };
};

export default UseStats;
