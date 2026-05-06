import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import friends from "../../public/friends.json";

const FriendsPageComponent = () => {

  console.log(friends);

  const onTrack = friends.filter((friend) => friend.status === "on-track");

  const needAttention = friends.filter(
    (friend) => friend.status !== "on-track",
  );

  const time = new Date();
  const interactionsThisMonth = friends.filter(
    (friend) => friend.days_since_contact < time.getDate(),
  );

  return (
    <div className="flex flex-col flex-1 h-full my-10 gap-4">
      <h4 className="text-2xl font-semibold">Your Friends</h4>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-2 md:gap-4 lg:gap-6">
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
            <Link href={`/friends/${id}`} className="w-full" key={id}>
              <Card
                key={id}
                className="flex flex-col flex-1 h-full justify-center items-center hover:scale-105 transition-all duration-300"
              >
                <CardContent>
                  <Image
                    loading="lazy"
                    src={picture}
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
                <CardContent className="flex flex-col items-center gap-3">
                  <p>{days_since_contact}d ago</p>
                  <div className="flex justify-center flex-wrap gap-2">
                    {tags.map((t, i) => (
                      <span
                        key={id + t + i}
                        className="text-(--hover-primary) bg-primary p-2 rounded-3xl whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`${status === "on-track" ? "flex flex-col items-center bg-green-100 text-green-800 dark:text-green-100 dark:bg-green-800 font-medium" : status === "overdue" ? "flex flex-col items-center bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 font-medium" : "flex flex-col items-center bg-amber-500 text-gray-100 dark:bg-amber-700 dark:text-amber-100 font-medium"} p-1.5 rounded-3xl`}
                  >
                    {status.toUpperCase()}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default FriendsPageComponent;
