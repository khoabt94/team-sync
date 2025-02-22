/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Task } from "@/task/types/task.type";
import { UniqueIdentifier } from "@dnd-kit/core";
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";

import { useMemo, useState } from "react";
import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "@/task/components/calendar/task-calendar.styles.css";
import { EventCalendar } from "@/task/types/calendar.type";
import { EventCard } from "@/task/components/calendar/event-card";
import { CalendarToolbar } from "@/task/components/calendar/calendar-toolbar";

const localizer = momentLocalizer(moment);

type TaskCalendarProps = {
  projectId?: string;
  onChangeFilter?: () => void;
  isLoadingTasks?: boolean;
  totalCount?: number;
  tasks: Task[];
  columns: UniqueIdentifier[];
};

export function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [value, setValue] = useState(new Date());

  const events: EventCalendar<Task>[] = useMemo(() => {
    return tasks.map((task) => ({
      id: task._id,
      start: task.dueDate ? new Date(task.dueDate) : new Date(),
      end: task.dueDate ? new Date(task.dueDate) : new Date(),
      ...task,
    }));
  }, [tasks]);

  const handleNavigate = (action: "PREV" | "TODAY" | "NEXT") => {
    switch (action) {
      case "PREV":
        setValue(moment(value).subtract(1, "month").toDate());
        break;
      case "NEXT":
        setValue(moment(value).add(1, "month").toDate());
        break;
      case "TODAY":
        setValue(new Date());
        break;
      default:
        setValue(new Date());
        break;
    }
  };

  return (
    <div className="w-full p-4">
      {/* @ts-expect-error */}
      <BigCalendar
        localizer={localizer}
        events={events}
        date={value}
        views={["month"]}
        defaultView="month"
        toolbar
        showAllEvents={false}
        className=""
        max={moment().add(1, "years").toDate()}
        formats={{
          weekdayFormat: (date, culture, localizer) => localizer?.format(date, "ddd", culture) ?? "",
        }}
        components={{
          eventWrapper: ({ event }) => <EventCard event={event} />,
          toolbar: () => <CalendarToolbar value={value} onNavigate={handleNavigate} />,
        }}
      />
    </div>
  );
}
