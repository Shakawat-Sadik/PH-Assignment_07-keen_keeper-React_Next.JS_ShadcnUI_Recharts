import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import friends from "../../public/friends.json";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const onTrack = friends.filter((friend) => friend.status === "on-track");
  const needAttention = friends.filter(
    (friend) => friend.status !== "on-track",
  );
  const time = new Date();
  const interactionsThisMonth = friends.filter(
    (friend) => friend.days_since_contact < time.getDate(),
  );

  // const cacheBustUrl = (url) => {
  //   const version = Math.floor(Date.now() / 60000); // Refreshes every minute
  //   return `${url}${url.includes("?") ? "&" : "?"}cache=${version}`;
  // };

  return (
    <main className="flex flex-1 w-full flex-col sm:items-center items-start py-5 md:py-10 lg:py-20 px-5 sm:px-10 md:px-25 lg:px-40">
      <div className="flex flex-col items-center gap-4 my-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Friends to keep close in your life
        </h1>
        <p className="text-center text-sm md:text-lg lg:text-xl mt-4 text-muted-foreground">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
        <Button className="flex items-center text-secondary font-semibold rounded-sm p-4 mt-4">
          <PlusIcon size={32} />
          <span className="">Add a Friend</span>
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl font-semibold">
              {friends.length}
            </CardTitle>
          </CardHeader>
          <CardDescription>Total Friends</CardDescription>
        </Card>
        <Card className="flex flex-col justify-center items-center hover:-translate-y-2 transition-all duration-300">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl font-semibold">
              {onTrack.length}
            </CardTitle>
          </CardHeader>
          <CardDescription>On Track</CardDescription>
        </Card>
        <Card className="flex flex-col justify-center items-center hover:translate-y-2 transition-all duration-300">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl font-semibold">
              {needAttention.length}
            </CardTitle>
          </CardHeader>
          <CardDescription>Need Attention</CardDescription>
        </Card>
        <Card className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-300">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl font-semibold">
              {interactionsThisMonth.length}
            </CardTitle>
          </CardHeader>
          <CardDescription>Interactions This Month</CardDescription>
        </Card>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-2 md:gap-4 gap-6 my-10">
        {friends.map(
          ({
            id,
            name,
            picture,
            email,
            days_since_contact,
            status,
            tags,
            bio,
            goal,
            next_due_date,
          }) => (
            <Link href={`/friend/${id}`} className="w-full" key={id}>
              <Card
                key={id}
                className="flex flex-col flex-1 h-full justify-center items-center hover:scale-105 transition-all duration-300"
              >
                <CardContent>
                  <Image
                    loading="lazy"
                    src={cacheBustUrl(picture)}
                    alt={name}
                    width={100}
                    height={100}
                    className="rounded-full aspect-square shrink-0"
                  />
                </CardContent>
                <CardHeader className="flex flex-col items-center">
                  <CardTitle className="text-xl font-semibold text-center">
                    {name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-2">
                  <p>{days_since_contact}d ago</p>
                  <div className="flex gap-2">
                    {tags.map((t, i) => (
                      <span
                        key={id + t + i}
                        className="text-primary bg-(--hover-primary) p-2 rounded-3xl"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`${status === "on-track" ? "bg-green-100 text-green-800" : status === "overdue" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"} p-2 rounded-3xl`}
                  >
                    {status}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ),
        )}
      </div>
    </main>
  );
}

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
