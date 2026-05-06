"use client"
import { Card } from "@/components/ui/card";
import { ContactHistoryContext } from "@/lib/FuncyFriend";
import { Button } from "@base-ui/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useContext } from "react";

const TimelinePage = () => {
  const { contactHistory } = useContext(ContactHistoryContext);
  console.log(contactHistory);
  return (
    <Card className="flex flex-col items-center flex-1 w-full h-full">
        {
            Object.keys(contactHistory).length === 0 ? 
            <h2 className="text-4xl text-center">
                No activity recorded yet
            </h2> : 
            <div>
                <Button className="">
                    <CaretDownIcon
                    className="relative top-px ml-1 size-3 transition duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180"
                    aria-hidden="true" />
                </Button>
                <Card>
                    {
                        Object.entries(contactHistory).map(hist => console.log(hist))
                    }
                </Card>
            
            </div>
            
        }
    </Card>
);
};

export default TimelinePage;
