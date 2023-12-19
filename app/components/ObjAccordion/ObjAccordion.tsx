import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Skeleton } from "@/components/ui/skeleton";

import { LocationDateType } from "@/helpers/types";
import { LocationCard } from "../LocationCard/LocationCard";

type ObjAccordionType = {
  accordion_obj: LocationDateType;
};

export function ObjAccordion({ accordion_obj }: ObjAccordionType) {
  if (Object.keys(accordion_obj).length === 0) {
    return PlaceHolder;
  }
  return (
    <Accordion type="single" collapsible defaultValue={"item-0"}>
      {Object.entries(accordion_obj).map(([date, locations], index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{date}</AccordionTrigger>
          <AccordionContent>
            <LocationCard locations={locations} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const PlaceHolder = (
  <Accordion type="single" collapsible defaultValue={"item-0"}>
    <AccordionItem value={`item-0`}>
      <AccordionTrigger>
        <Skeleton className="w-[50%] h-6" />
      </AccordionTrigger>
      <AccordionContent>
        <LocationCard locations={null} />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
