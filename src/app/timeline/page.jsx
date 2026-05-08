"use client";
import { Card } from "@/components/ui/card";
import { ContactHistoryContext } from "@/lib/FuncyFriend";
import { Button } from "@base-ui/react";
import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  CaretDownIcon,
  ChatsIcon,
  PhoneCallIcon,
  VideoConferenceIcon,
} from "@phosphor-icons/react";
import { useContext, useMemo, useState } from "react";
import friends from "../../../public/friends.json";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TimelinePage = () => {
  const { contactHistory } = useContext(ContactHistoryContext);

  const [sort, setSort] = useState({ key: "time", direction: "desc" });
  const [typeFilter, setTypeFilter] = useState("all");

  const entries = Object.entries(contactHistory).flatMap(([friendId, items]) => {
    const friend = friends.find((f) => f.id === parseInt(friendId));
    return items.map(({ type, time, timeMs }, index) => ({
      friendId,
      friendName: friend?.name,
      type: type,
      time: time,
      timeMs: timeMs,
      entryId: timeMs ? `${friendId}-${timeMs}-${index}` : `${friendId}-${time}-${index}`,
    }));
  });

  const sortedEntries = useMemo(() => {
    const filtered = typeFilter === "all" ? entries : entries.filter((entry) => entry.type === typeFilter);
    const list = [...filtered];
    const compareText = (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" });
    const parseEliteTime = (value, valueMs) => {
      if (typeof valueMs === "number") return valueMs;
      if (!value) return 0;
      const parts = value.split(" | ");
      if (parts.length === 3) {
        const parsed = Date.parse(`${parts[2]} ${parts[0]}`);
        return Number.isNaN(parsed) ? 0 : parsed;
      }

      const parsed = Date.parse(value);
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    list.sort((a, b) => {
      if (sort.key === "name") {
        return compareText(a.friendName ?? "", b.friendName ?? "");
      }

      if (sort.key === "type") {
        return compareText(a.type ?? "", b.type ?? "");
      }

      return parseEliteTime(a.time, a.timeMs) - parseEliteTime(b.time, b.timeMs);
    });

    if (sort.direction === "desc") {
      list.reverse();
    }

    return list;
  }, [entries, sort, typeFilter]);

  const handleSort = (key, direction) => () => setSort({ key, direction });
  const handleTypeFilter = (value) => () => setTypeFilter(value);

  return (
    <Card className="flex flex-col items-center flex-1 w-full h-full">
      {entries.length === 0 ? (
        <h2 className="text-4xl text-center">No activity recorded yet</h2>
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-4">
          <div className="flex justify-end">
            <DropdownMenu className="relative">
              <DropdownMenuTrigger
                render={
                  <Button className="flex flex-row items-center cursor-pointer">
                    <span>Sort by</span>
                    <CaretDownIcon className="relative top-px ml-1 size-3 transition duration-300" aria-hidden="true" />
                  </Button>
                }
              ></DropdownMenuTrigger>
              <DropdownMenuPositioner className="left-0">
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Name</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={handleSort("name", "asc")} onClick={handleSort("name", "asc")}>
                      Ascending{" "}
                      <DropdownMenuShortcut>
                        <ArrowFatLineUpIcon size={16} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSort("name", "desc")} onClick={handleSort("name", "desc")}>
                      Descending{" "}
                      <DropdownMenuShortcut>
                        <ArrowFatLineDownIcon size={16} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Contact Type</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={handleTypeFilter("all")} onClick={handleTypeFilter("all")}>
                      All <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleTypeFilter("call")} onClick={handleTypeFilter("call")}>
                      Call{" "}
                      <DropdownMenuShortcut>
                        <PhoneCallIcon size={16} />
                      </DropdownMenuShortcut>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleTypeFilter("video")} onClick={handleTypeFilter("video")}>
                      Video Call{" "}
                      <DropdownMenuShortcut>
                        <VideoConferenceIcon size={16} />
                      </DropdownMenuShortcut>{" "}
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleTypeFilter("text")} onClick={handleTypeFilter("text")}>
                      Text{" "}
                      <DropdownMenuShortcut>
                        <ChatsIcon size={16} />
                      </DropdownMenuShortcut>{" "}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Time</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={handleSort("time", "asc")} onClick={handleSort("time", "asc")}>
                      Ascending{" "}
                      <DropdownMenuShortcut>
                        <ArrowFatLineUpIcon size={16} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSort("time", "desc")} onClick={handleSort("time", "desc")}>
                      Descending{" "}
                      <DropdownMenuShortcut>
                        <ArrowFatLineDownIcon size={16} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenuPositioner>
            </DropdownMenu>
          </div>
          <Card className="flex flex-col gap-3 p-4">
            {sortedEntries.map((entry) => (
              <div key={entry.entryId} className="flex items-center justify-between rounded-md border bg-card px-4 py-3">
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-base font-medium">
                    {(entry.type === "video" && `Video call with`) ||
                      (entry.type === "call" && `Call with`) ||
                      (entry.type === "text" && `Texted`)}{" "}
                    {entry.friendName}
                  </span>
                  <span className="text-sm text-muted-foreground">{entry.time}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}
    </Card>
  );
};

export default TimelinePage;
