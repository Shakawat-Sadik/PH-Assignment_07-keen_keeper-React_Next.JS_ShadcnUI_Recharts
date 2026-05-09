"use client";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import useStats from "@/hooks/stats";
import { Pie, PieChart } from "recharts";

const StatsPage = () => {
    const { contactStats } = useStats();

    const chartConfig = {
      call: {
        label: "Call",
        color: "var(--chart-4)",
      },
      text: {
        label: "Text",
        color: "var(--chart-3)",
      },
      video: {
        label: "Video",
        color: "var(--chart-5)",
      },
    };

  const hasData = contactStats.some((stat) => stat.value > 0);

  return (
    <div className="flex flex-col flex-1 w-full max-w-3xl self-center px-4 py-8 lg:px-0">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Friendship Analytics</h2>
      </div>
      {!hasData ? (
        <div className="flex items-center justify-center mt-6 h-80 text-muted-foreground">
          No contact data available to chart.
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="mt-6 h-80 w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            <Pie
              data={contactStats}
              dataKey="value"
              nameKey="name"
              innerRadius={90}
              outerRadius={120}
              cornerRadius={20}
              paddingAngle={4}
              strokeWidth={2}
            />
            <ChartLegend />
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default StatsPage;
