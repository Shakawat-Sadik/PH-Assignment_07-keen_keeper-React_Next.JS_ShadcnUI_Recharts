"use client";

import React, { useContext } from "react";
import friends from "../../public/friends.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { eliteDateFormat, formatDate } from "@/lib/utils";
import { ContactHistoryContext } from "@/lib/FuncyFriend";
import { ChatDotsIcon, PhoneCallIcon, TrashIcon, VideoConferenceIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

const FriendPageComponent = ({ path }) => {
  const { contactHistory, setContactHistory } = useContext(ContactHistoryContext);

  const num = friends?.find((f) => f?.id === parseInt(path));
  if (!num) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <p className="text-lg text-muted-foreground">Wrong Address, Wrong Amigos</p>
      </div>
    );
  }
  const { id, name, picture, email, days_since_contact: days, status, tags, bio, goal, next_due_date: due } = num ?? {};
  const history = contactHistory[path] || [];

  const sonnerFunctionality = {
    description: eliteDateFormat(),
    action: {
      label: <TrashIcon size={16} />,
      onClick: () => {},
    },
  };
  const handleClick = (e) => {
    const fallbackLabel = e?.currentTarget?.innerText?.split("\n")[0] || "";
    const type = (e?.currentTarget?.id || fallbackLabel).toLowerCase();
    const newEntry = { type, time: eliteDateFormat(), timeMs: Date.now() }; //`type` is the shorthand of `type: type`
    setContactHistory((prev) => ({
      ...prev,
      [path]: [...(prev[path] || []), newEntry],
    }));
    (type === "call" &&
      toast.success(`You called ${name}`, sonnerFunctionality)) ||
      (type === "text" &&
        toast.success(`You texted ${name}`, sonnerFunctionality)) ||
      (type === "video" &&
        toast.success(`You video called ${name}`, sonnerFunctionality));
  };

  const cardInside = ({ type, time }) => (
    <Card className="flex flex-row justify-between p-6">
      <div className="bg-card">
        {(type === "call" && `You called ${name}`) ||
          (type === "text" && `You texted ${name}`) ||
          (type === "video" && `You video called ${name}`)}
      </div>
      <p>{time}</p>
    </Card>
  );

  return (
    <Card className="min-w-screen grid grid-cols-1 md:grid-cols-7 lg:grid-cols-32 py-5 md:py-10 lg:py-20 px-5 sm:px-10 md:px-25 lg:px-40">
      <Card className="md:col-span-4 lg:col-span-11 md:row-span-3 lg:row-span-2">
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
            <CardDescription className="font-italic font-medium leading-4 text-center">Preferred: {email}</CardDescription>
          </CardFooter>
        </div>
      </Card>
      <Card className="md:col-span-3 lg:col-span-7 md:row-span-1 lg:row-span-1 justify-center text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">
            {days < 10 && "0"}
            {days}
          </CardTitle>
        </CardHeader>
        <CardDescription>Days Since Contact</CardDescription>
      </Card>
      <Card className="md:col-span-3 lg:col-span-7 md:row-span-1 lg:row-span-1 justify-center text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">
            {goal < 10 && "0"}
            {goal}
          </CardTitle>
        </CardHeader>
        <CardDescription>Goal (Days)</CardDescription>
      </Card>
      <Card className="md:col-span-3 lg:col-span-7 md:row-span-1 lg:row-span-1 justify-center text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">{formatDate(due)}</CardTitle>
        </CardHeader>
        <CardDescription>Next Due</CardDescription>
      </Card>
      <Card className="md:col-span-7 lg:col-span-21 lg:row-span-1 p-3 md:p-6 items-between justify-center">
        <div className="flex justify-between">
          <h6 className="text-primary text-xl">Relationship Goal</h6>
          <Button className="p-2">
            <span>Edit</span>
          </Button>
        </div>
        <p className="opacity-80">
          Connect every <span className="font-bold">30 Days</span>
        </p>
      </Card>
      <div className="md:col-span-7 lg:col-span-11 lg:row-span-3 flex items-center justify-center w-full">
        <div className="flex flex-col gap-2 md:w-fit lg:w-full py-5 items-center justify-center">
          <Button className="font-medium rounded-sm p-4 w-48">
            <span>Snooze 2 weeks</span>
          </Button>
          <Button className="font-medium rounded-sm p-4 w-48">
            <span>Archive</span>
          </Button>
          <Button className="text-red-700 dark:text-red-300 bg-red-300 dark:bg-red-700 font-medium rounded-sm p-4 w-48">
            <span>Delete</span>
          </Button>
        </div>
      </div>
      <Card className="md:col-span-7 lg:col-span-21 p-5">
        <h6 className="text-primary text-xl">Quick Check-In</h6>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 h-full gap-4 w-full">
          <Button
            id="call"
            onClick={handleClick}
            className="col-span-1 flex flex-col-reverse h-full items-center text-xl font-medium rounded-sm p-4"
          >
            <span>Call</span>
            <span>
              <PhoneCallIcon size={32} className="size-" />
            </span>
          </Button>
          <Button
            id="text"
            onClick={handleClick}
            className="col-span-1 flex flex-col-reverse h-full items-center text-xl font-medium rounded-sm p-4"
          >
            <span>Text</span>
            <span>
              <ChatDotsIcon size={32} className="size-" />
            </span>
          </Button>
          <Button
            id="video"
            onClick={handleClick}
            className="col-span-1 flex flex-col-reverse h-full items-center text-xl font-medium rounded-sm p-4"
          >
            <span>video</span>
            <span>
              <VideoConferenceIcon size={32} className="size-" />
            </span>
          </Button>
        </div>
      </Card>
      <Card className="md:col-span-7 lg:col-span-21 row-span-5 justify-center h-full p-6">
        {history.length === 0 ? (
          <Card key="-1" className="flex flex-col items-center bg-zinc-100 dark:bg-zinc-800">
            <CardHeader>No activity yet</CardHeader>
          </Card>
        ) : (
          history.map((entry, i) => (
            <div key={`${entry.type}-${entry.time}-${i}`} className="flex flex-col items-between justify-center gap-2">
              {cardInside(entry)}
            </div>
          ))
        )}
        {}
      </Card>
      <div className="md:col-span-7 lg:col-span-21 row-span-1 p-8" />
    </Card>
  );
};

export default FriendPageComponent;

/*
const FriendPageComponent = ({ path }) => {
  const num = friends?.find((f) => f?.id === parseInt(path));

  const { id, name, picture, email, days_since_contact: days, status, tags, bio, goal, next_due_date: due } = num;

  const [contact, setContact] = useState([]);
  const [time, setTime] = useState([]);

  const contactHistory = {
    path: {
      contact: [...contact],
      time: [...time]
    }
  };

  contacyHistory[{path}] = {};

  const handleClick = (e) => {
    let inside = e?.currentTarget?.innerText?.toLowerCase()?.split("\n")[0];
    let newTime = eliteDateFormat();
    setContact([...contact, inside]);
    setTime([...time, newTime]);
  };

  console.log(contactHistory);
  // console.log(contactHistory[{path}.time]);

  const cardInside = (cont, i) => (
    <Card className="flex flex-row justify-between p-6">
      <div className="bg-card">
        {(cont === "call" && `You called ${name}`) ||
          (cont === "text" && `You texted ${name}`) ||
          (cont === "video" && `You video called ${name}`)}
      </div>
      <p>{time[i]}</p>
    </Card>
  );
  // const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  // const y = {f: 15};
  // const z = {...x, ...y};
  // console.log(z);

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
          <CardTitle className="text-primary text-3xl">
            {days < 10 && "0"}
            {days}
          </CardTitle>
        </CardHeader>
        <CardDescription>Days Since Contact</CardDescription>
      </Card>
      <Card className="col-span-7 row-span-1 text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">
            {goal < 10 && "0"}
            {goal}
          </CardTitle>
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
        <p className="opacity-80">
          Connect every <span className="font-bold">30 Days</span>
        </p>
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
          <Button id="call" onClick={handleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
            <span>Call</span>
            <span>Call</span>
          </Button>
          <Button id="text" onClick={handleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
            <span>Text</span>
            <span>Text</span>
          </Button>
          <Button id="video" onClick={handleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
            <span>video</span>
            <span>video</span>
          </Button>
        </div>
      </Card>
      <Card className="col-span-21 row-span-5 p-6">
        {contact.map((cont, i) => (
          <div key={i} className="flex flex-col items-between justify-center gap-2">
            {cardInside(cont, i)}
          </div>
        ))}
        {}
      </Card>
    </Card>
  );
};
*/

/*
const FriendPageComponent = ({ path }) => {
  const num = friends?.find((f) => f?.id === parseInt(path));
  const { id, name, picture, email, days_since_contact: days, status, tags, bio, goal, next_due_date: due } = num;

  // Initialize state from global store
  const [contacts, setContacts] = useState(() => contactHistory[path] || []);

  // Sync local state to global store whenever it changes
  useEffect(() => {
    contactHistory[path] = contacts;
  }, [contacts, path]);

  const handleClick = (e) => {
    const type = e?.currentTarget?.innerText?.toLowerCase()?.split("\n")[0];
    const time = eliteDateFormat();
    setContacts([...contacts, { type, time }]);
  };

  const cardInside = (entry) => (
    <Card className="flex flex-row justify-between p-6">
      <div className="bg-card">
        {(entry.type === "call" && `You called ${name}`) ||
          (entry.type === "text" && `You texted ${name}`) ||
          (entry.type === "video" && `You video called ${name}`)}
      </div>
      <p>{entry.time}</p>
    </Card>
  );

  console.log(contactHistory);
  // const x = {a: 1, b: 2, c: 3, d: 4, e: 5};
  // const y = {f: 15};
  // const z = {...x, ...y};
  // console.log(z);

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
          <CardTitle className="text-primary text-3xl">
            {days < 10 && "0"}
            {days}
          </CardTitle>
        </CardHeader>
        <CardDescription>Days Since Contact</CardDescription>
      </Card>
      <Card className="col-span-7 row-span-1 text-center">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">
            {goal < 10 && "0"}
            {goal}
          </CardTitle>
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
        <p className="opacity-80">
          Connect every <span className="font-bold">30 Days</span>
        </p>
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
          <Button id="call" onClick={handleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
            <span>Call</span>
            <span>Call</span>
          </Button>
          <Button id="text" onClick={handleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
            <span>Text</span>
            <span>Text</span>
          </Button>
          <Button id="video" onClick={handleClick} className="flex flex-col h-full items-center font-medium rounded-sm p-4">
            <span>video</span>
            <span>video</span>
          </Button>
        </div>
      </Card>
      <Card className="col-span-21 row-span-5 p-6">
        {contacts.map((entry) => (
          <div key={entry.type + entry.time} className="flex flex-col items-between justify-center gap-2">
            {cardInside(entry)}
          </div>
        ))}
      </Card>
    </Card>
  );
};
*/
