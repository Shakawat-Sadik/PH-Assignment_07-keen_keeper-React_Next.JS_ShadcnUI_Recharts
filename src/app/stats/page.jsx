"use client";
import { Card } from "@/components/ui/card";
import UseStats from "@/hooks/stats";

const StatsPage = () => {
    const { contactStats } = UseStats();
      console.log(contactStats);

  return (
    <div>
      <Card>x</Card>
    </div>
  );
};

export default StatsPage;
