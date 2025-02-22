import { Button } from "@shared/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";

type CalendarToolbarProps = {
  value: Date;
  onNavigate: (action: "PREV" | "TODAY" | "NEXT") => void;
};

export function CalendarToolbar({ value, onNavigate }: CalendarToolbarProps) {
  return (
    <div className="flex mb-4 gap-x-2 items-center w-full md:w-auto justify-center md:justify-start">
      <Button onClick={() => onNavigate("PREV")} variant="outline" size="icon" className="size-8 p-0">
        <ChevronLeft className="size-4" />
      </Button>
      <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full md:w-auto">
        <Calendar className="size-4 mr-2" />
        <p className="text-sm">{moment(value).format("MMMM yyyy")}</p>
      </div>
      <Button onClick={() => onNavigate("NEXT")} variant="outline" size="icon" className="size-8 p-0">
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
