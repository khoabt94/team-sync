import { createProjectSchema } from "@/project/schemas/project.schema";
import { useCreateProject } from "@api/hooks/use-create-project";
import { BaseError } from "@api/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmojiPicker } from "@shared/components/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui//popover";
import { Button } from "@shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { toast } from "@shared/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateProjectFormType = z.infer<typeof createProjectSchema>;

type CreateProjectFormProps = {
  onSubmitSuccess?: () => void;
};

export function CreateProjectForm({ onSubmitSuccess }: CreateProjectFormProps) {
  const navigate = useNavigate();
  const workspaceId = useGetWorkspaceId();
  const { mutateAsync: createProject, isPending: isCreatingProject } = useCreateProject();
  const form = useForm<CreateProjectFormType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      emoji: "📊",
    },
  });

  const emoji = form.watch("emoji");

  const onSubmit = async (data: CreateProjectFormType) => {
    await createProject(
      { workspaceId, data },
      {
        onSuccess: (project) => {
          toast({
            title: "Project created!",
            description: "You will be redirected to new project shortly!",
          });
          navigate({
            to: "/workspace/$workspaceId/project/$projectId",
            params: { projectId: project._id, workspaceId },
          });
        },
        onError: (error: unknown) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: (error as BaseError).errors?.[0]?.message ?? (error as BaseError).message,
          });
        },
      },
    );
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
            Create Project
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Organize and manage tasks, resources, and team collaboration
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
                    <span className="text-4xl">{emoji}</span>
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
                      <Input placeholder="Website Redesign" className="!h-[48px]" {...field} />
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
              disabled={isCreatingProject}
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit"
            >
              {isCreatingProject && <Loader className="animate-spin" />}
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
