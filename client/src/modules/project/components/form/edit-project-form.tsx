import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import { Textarea } from "@shared/components/ui/textarea";
import { Project } from "@/project/types/project.type";
import { editProjectSchema } from "@/project/schemas/project.schema";
import { EmojiPicker } from "@shared/components/emoji-picker";
import { useUpdateProject } from "@api/hooks/use-update-project";
import { Loader } from "lucide-react";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useGetProjectId } from "@shared/hooks/use-get-projectId";
import { toast } from "@shared/hooks/use-toast";
import { BaseError } from "@api/type";

type EditProjectFormProps = {
  onSubmitSuccess?: () => void;
  project?: Project;
};

type EditProjectFormType = z.infer<typeof editProjectSchema>;

export function EditProjectForm({ onSubmitSuccess, project }: EditProjectFormProps) {
  const { mutateAsync: updateProject, isPending: isUpdatingProject } = useUpdateProject();
  const workspaceId = useGetWorkspaceId();
  const projectId = useGetProjectId();
  const form = useForm<EditProjectFormType>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      emoji: project?.emoji ?? "",
    },
  });

  const onSubmit = (data: EditProjectFormType) => {
    updateProject(
      { workspaceId, projectId, data },
      {
        onError: (error: unknown) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: (error as BaseError).errors?.[0]?.message ?? (error as BaseError).message,
          });
        },
      },
    );
    toast({
      title: "Project updated!",
    });
    onSubmitSuccess?.();
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
           text-center sm:text-left"
          >
            Edit Project
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Update the project details to refine task management
          </p>
        </div>
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

            <Button
              disabled={isUpdatingProject}
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit"
            >
              {isUpdatingProject && <Loader className="animate-spin" />}
              Update
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
