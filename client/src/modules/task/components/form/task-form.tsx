/* eslint-disable @typescript-eslint/no-explicit-any */
import { taskSchema } from "@/task/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { Button } from "@shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import MultipleSelector from "@shared/components/ui/multiple-select";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";
import { Textarea } from "@shared/components/ui/textarea";
import { TaskPriorityConfig, TaskStatusConfig } from "@shared/constants/task.constant";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { cn } from "@shared/util/cn.util";
import { CalendarIcon, Loader } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import moment from "moment";
import { Calendar } from "@shared/components/ui/calendar";
import { useGetWorkspaceMembers } from "@api/hooks/use-get-workspace-members";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { Badge } from "@shared/components/ui/badge";
import { Task } from "@/task/types/task.type";

export type TaskFormType = z.infer<typeof taskSchema>;

type TaskFormProps = {
  onSubmit: (data: TaskFormType) => void;
  isPending: boolean;
  task?: Task;
  projectId?: string;
};

export function TaskForm({ onSubmit, isPending, task, projectId }: TaskFormProps) {
  console.log("🚀 ~ TaskForm ~ task:", task);
  const workspaceId = useGetWorkspaceId();
  const isEditting = !!task;
  const { data: workspaceMembers = [], isLoading: membersLoading } = useGetWorkspaceMembers({ input: { workspaceId } });
  const form = useForm<TaskFormType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      projectId: task ? task.project._id : (projectId ?? ""),
      assignedTo: task?.assignedTo.map((member) => member._id) ?? [],
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
      priority: task?.priority ?? TaskPriorityConfig.MEDIUM.value,
      status: task?.status ?? TaskStatusConfig.TODO.value,
    },
  });

  const statusOptions = useMemo(() => Object.values(TaskStatusConfig), []);
  const priorityOptions = useMemo(() => Object.values(TaskPriorityConfig), []);
  const membersOptions = useMemo(() => {
    return workspaceMembers?.map((member) => {
      const name = member.userId?.name || "Unknown";
      const initials = getAvatarFallbackText(name);
      const avatarColor = getAvatarColor(name);

      return {
        label: (
          <div className="flex items-center space-x-2">
            <Avatar className="size-5 text-[8px]">
              <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
              <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        ),
        value: member.userId._id,
      };
    });
  }, [workspaceMembers]);

  return (
    <div className="w-full h-auto max-w-full">
      <div className="mb-5 pb-2 border-b">
        <h1
          className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
       text-center sm:text-left"
        >
          Create Task
        </h1>
        <p className="text-muted-foreground text-sm leading-tight">
          Organize and manage tasks, resources, and team collaboration
        </p>
      </div>
      <Form {...form}>
        <form className="grid grid-cols-[2fr_1fr] w-full gap-y-10" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Left column */}
          <div className="space-y-3 border-r border-r-black/10 pr-4 pb-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">Task title</FormLabel>
                  <FormControl>
                    <Input placeholder="Website Redesign" className="!h-[48px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                    Task description
                    <span className="text-xs font-extralight ml-2">Optional</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right column */}
          <div className="space-y-3 pl-4">
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <MultipleSelector
                    options={membersOptions}
                    placeholder="Members"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={membersLoading}
                    emptyIndicator={<p className="italic text-xs text-black/50">No members found</p>}
                    badgeClassName="bg-black/5 text-primary shadow-none hover:bg-black/10 cursor-pointer py-1"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full flex-1 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? moment(field.value).format("MMM DD, YYYY") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        defaultMonth={new Date()}
                        fromMonth={new Date()}
                        disabled={
                          (date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) || // Disable past dates
                            date > new Date("2100-12-31") //Prevent selection beyond a far future date
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="!text-muted-foreground !capitalize" placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions?.map((status) => (
                        <SelectItem className="!capitalize" key={status.value} value={status.value}>
                          <Badge variant={status.value as any} className="rounded-sm">
                            {status.label}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorityOptions?.map((priority) => (
                        <SelectItem className="!capitalize" key={priority.value} value={priority.value}>
                          <Badge variant={priority.value as any} className="rounded-sm">
                            {priority.label}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="flex col-start-2 h-[40px] text-white font-semibold" type="submit" disabled={isPending}>
            {isPending && <Loader className="animate-spin" />}
            {isEditting ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
