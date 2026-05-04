"use client";
import { React } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";
import Navbar from "./Navbar";

const DarkS01 = () => {
  const [isDark, setIsDark] = React.useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
  React.useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
    darkMode.addEventListener("change", (c => setIsDark(c.matches)))
  }, []);
  return (
    <body
      className={`min-h-full min-w-full flex flex-col bg-background text-foreground ${isDark && "dark"}`}
    >
      <Navbar />
      {children}
    </body>
  );
};

export default DarkS01;

//Deprecated because of Client-only nature and unbendable to the server component `app layout`.