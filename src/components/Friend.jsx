import React from "react";
import friends from "../../public/friends.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { formatDate} from "@/lib/utils";
import { HandleClick } from "@/lib/FuncyFriend";

const FriendPageComponent = ({ path }) => {
  // console.log(path);
  const num = friends?.find((f) => f?.id === parseInt(path));
  // const friend = friends?.find(fr => fr.id === parseInt(num));
  // console.log(num);
  const { id, name, picture, email, days_since_contact: days, status, tags, bio, goal, next_due_date: due } = num;

  return (
    <Card className="max-w-screen grid grid-cols-32 py-5 md:py-10 lg:py-20 px-5 sm:px-10 md:px-25 lg:px-40">
      <Card className="col-span-11 row-span-2">
        <div className="flex flex-col flex-1 items-center p-6">
          <CardContent className="w-full h-full flex flex-1 justify-center bg-linear-180 from-accent to-muted/50 rounded-t-md p-3 pt-6">
            <Image loading="eager" src={picture} alt={name} width={100} height={100} className="rounded-full aspect-square" />
          </CardContent>
          <CardFooter className="w-full flex-col flex-1 gap-3 rounded-b-md border-t-0">
            <div className="flex-1 flex flex-col items-center gap-2">
              <CardTitle className="text-xl font-semibold text-center">{name}</CardTitle>
              <Badge
                className={`${status === "on-track" ? "flex flex-col items-center bg-green-100 text-green-800 dark:text-green-100 dark:bg-green-800 font-medium" : status === "overdue" ? "flex flex-col items-center bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 font-medium" : "flex flex-col items-center bg-amber-500 text-gray-100 dark:bg-amber-700 dark:text-amber-100 font-medium"} w-fit p-1.5 rounded-3xl`}
              >
                {status.toUpperCase()}
              </Badge>
              <div className="flex justify-center flex-wrap gap-2">
                {tags.map((t, i) => (
                  <Badge key={id + t + i} className="text-secondary bg-primary p-2 rounded-3xl whitespace-nowrap">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <CardDescription className="font-italic font-medium leading-4 text-center">&ldquo;{bio}&rdquo;</CardDescription>
            <CardDescription className="font-italic font-medium leading-4 text-center">Preffered: {email}</CardDescription>
          </CardFooter>
        </div>
      </Card>
      <Card className="col-span-7 row-span-1 text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">{days < 10 && "0"}{days}</CardTitle>
        </CardHeader>
        <CardDescription>Days Since Contact</CardDescription>
      </Card>
      <Card className="col-span-7 row-span-1 text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">{goal < 10 && "0"}{goal}</CardTitle>
        </CardHeader>
        <CardDescription>Goal (Days)</CardDescription>
      </Card>
      <Card className="col-span-7 row-span-1 text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">{formatDate(due)}</CardTitle>
        </CardHeader>
        <CardDescription>Next Due</CardDescription>
      </Card>
      <Card className="col-span-21 row-span-1 p-3 md:p-6 items-between justify-center">
        <div className="flex justify-between">
          <h6 className="text-primary text-xl">Relationship Goal</h6>
          <Button className="p-2">
            <span>Edit</span>
          </Button>
        </div>
        <p className="opacity-80">Connect every <span className="font-bold">30 Days</span></p>
      </Card>
      <div className="col-span-11 row-span-3 w-full">
        
          <div className="flex flex-col gap-2 w-full py-5">
            <Button className="font-medium rounded-sm p-4">
              <span>Snooze 2 weeks</span>
            </Button>
            <Button className="font-medium rounded-sm p-4">
              <span>Archive</span>
            </Button>
            <Button className="text-red-700 dark:text-red-300 bg-red-300 dark:bg-red-700 font-medium rounded-sm p-4">
              <span>Delete</span>
            </Button>
          </div>
      </div>
      <Card className="col-span-21 p-5">
          <h6 className="text-primary text-xl">Quick Check-In</h6>
          <div className="grid grid-cols-3 h-full gap-4 w-full">
            <Button id="call" onClick={HandleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
              <span>Call</span>
              <span>Call</span>
            </Button>
            <Button id="text" onClick={HandleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
              <span>Text</span>
              <span>Text</span>
            </Button>
            <Button id="video" onClick={HandleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
              <span>video</span>
              <span>video</span>
            </Button>
          </div>
      </Card>
      <Card className="col-span-21 row-span-5">
        {
          /*contact.map((cont, i) => <Card key={i} className="flex flex-col items-between justify-center gap-2">{cont}</Card> )*/
        }
      </Card>
    </Card>
  );
};

export default FriendPageComponent;

/*
            <Card className="col-span-11 row-span-8"><FriendCardStr number={1} /></Card>
            <Card className="col-span-7 row-span-4"><FriendCardStr number={2} /></Card>
            <Card className="col-span-7 row-span-4"><FriendCardStr number={2} /></Card>
            <Card className="col-span-7 row-span-4"><FriendCardStr number={2} /></Card>
            <Card className="col-span-23 row-span-4"><FriendCardStr number={3} /></Card>
            <Card className="col-span-11 row-span-5"><FriendCardStr number={4} /></Card>
            <Card className="col-span-23 row-span-6"><FriendCardStr number={5} /></Card>

            <Card className="row-span-11 col-span-8"><FriendCardStr number={1} /></Card>
            <Card className="row-span-7 col-span-4"><FriendCardStr number={2} /></Card>
            <Card className="row-span-7 col-span-4"><FriendCardStr number={2} /></Card>
            <Card className="row-span-7 col-span-4"><FriendCardStr number={2} /></Card>
            <Card className="row-span-23 col-span-4"><FriendCardStr number={3} /></Card>
            <Card className="row-span-11 col-span-5"><FriendCardStr number={4} /></Card>
            <Card className="row-span-23 col-span-6"><FriendCardStr number={5} /></Card>
            */
