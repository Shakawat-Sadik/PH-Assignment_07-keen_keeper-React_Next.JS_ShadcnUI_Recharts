import React from "react";
import friends from "../../public/friends.json";
import { Card } from "./ui/card";
import FriendCardStr from "./FriendCardStr";
import Image from "next/image";

const FriendPageComponent = ({ path }) => {
  const num = friends.find((f) => String(f.id) === path.includes(f.id));
  const friend = friends?.find(fr => fr.id === parseInt(num));
  console.log(friend);
  console.log(parseInt(path));
  const {
    id,
    name,
    picture,
    email,
    days_since_contact: days,
    status,
    tags,
    bio,
    goal,
    next_due_date: due,
  } = friend;

  return (
    <Card className="grid grid-cols-32 grid-rows-14 py-5 md:py-10 lg:py-20 px-5 sm:px-10 md:px-25 lg:px-40">
      <Card className="col-span-11 row-span-4">
        <div className="flex flex-col items-center gap-3 p-6">
          <FriendCardStr number="One"/>
        </div>
      </Card>
      <Card className="col-span-7 row-span-2">
        <FriendCardStr number={"Two"} />
      </Card>
      <Card className="col-span-7 row-span-2">
        <FriendCardStr number={"Two"} />
      </Card>
      <Card className="col-span-7 row-span-2">
        <FriendCardStr number={"Two"} />
      </Card>
      <Card className="col-span-21 row-span-2">
        <FriendCardStr number={"Three"} />
      </Card>
      <Card className="col-span-11 row-span-3">
        <FriendCardStr number={"Four"} />
      </Card>
      <Card className="col-span-21 row-span-3">
        <FriendCardStr number={"Five"} />
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
