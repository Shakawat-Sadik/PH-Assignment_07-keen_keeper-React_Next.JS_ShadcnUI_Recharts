import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import xFriends from "../../public/friends.json";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import FriendsPageComponent from "@/components/Friends";

export default function Home() {

  const onTrack = xFriends.filter((friend) => friend.status === "on-track");

  const needAttention = xFriends.filter(
    (friend) => friend.status !== "on-track",
  );

  const time = new Date();
  const interactionsThisMonth = xFriends.filter(
    (friend) => friend.days_since_contact < time.getDate(),
  );


  // const cacheBustUrl = (url) => {
  //   const version = Math.floor(Date.now() / 60000); // Refreshes every minute
  //   return `${url}${url.includes("?") ? "&" : "?"}cache=${version}`;
  // };

  return (
    <main className="flex flex-1 w-full flex-col">
      <hr className="border w-full" />
      <div className="flex flex-1 flex-col sm:items-center items-start py-5 md:py-10 lg:py-20 px-5 sm:px-10 md:px-25 lg:px-40">
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
          <Card className="flex flex-col justify-center items-center hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-3xl font-semibold">
                {xFriends.length}
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
        <hr className="border border-accent w-full my-5" />
        <FriendsPageComponent />
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
