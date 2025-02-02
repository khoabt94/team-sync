import { projectFormSchema } from "@/project/schemas/project.schema";
import { Project } from "@/project/types/project.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmojiPicker } from "@shared/components/emoji-picker";
import { Button } from "@shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Textarea } from "@shared/components/ui/textarea";
import { Loader } from "lucide-react";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type ProjectFormType = z.infer<typeof projectFormSchema>;

type ProjectFormProps = {
  project?: Project;
  isPending?: boolean;
  onSubmit: (data: ProjectFormType) => void;
};

export const ProjectForm = forwardRef(({ project, isPending, onSubmit }: ProjectFormProps, _ref) => {
  const form = useForm<ProjectFormType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      emoji: project?.emoji ?? "📊",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Emoji</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="font-normal size-[60px] !p-2 !shadow-none mt-2 items-center rounded-full "
              >
                <span className="text-4xl">{form.watch("emoji")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className=" !p-0">
              <EmojiPicker onSelectEmoji={(emo) => form.setValue("emoji", emo)} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#f1f7feb5] text-sm">Project title</FormLabel>
                <FormControl>
                  <Input placeholder="" className="!h-[48px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                  Project description
                  <span className="text-xs font-extralight ml-2">Optional</span>
                </FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Projects description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isPending} className="flex place-self-end  h-[40px] text-white font-semibold" type="submit">
          {isPending && <Loader className="animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  );
});
