export type EventCalendar<T> = {
  id: string;
  start: Date;
  end: Date;
} & T;
