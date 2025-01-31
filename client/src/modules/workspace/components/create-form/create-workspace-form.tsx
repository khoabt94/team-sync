import { workspaceCreateSchema } from "@/workspace/schemas/workspace.schema";
import { useCreateWorkspace } from "@api/hooks/use-create-workspace";
import { BaseError } from "@api/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Textarea } from "@shared/components/ui/textarea";
import { toast } from "@shared/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateWorkspaceFormType = z.infer<typeof workspaceCreateSchema>;

type CreateWorkspaceFormProps = {
  onSubmitSuccess?: () => void;
};

export function CreateWorkspaceForm({ onSubmitSuccess }: CreateWorkspaceFormProps) {
  const { mutateAsync: createWorkspace, isPending: isCreatingWorkspace } = useCreateWorkspace();
  const navigate = useNavigate();
  const form = useForm<CreateWorkspaceFormType>({
    resolver: zodResolver(workspaceCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: CreateWorkspaceFormType) => {
    await createWorkspace(values, {
      onSuccess: (workspace) => {
        toast({
          title: "Workspace created!",
          description: "You will be redirected to new workspace shortly!",
        });
        navigate({ to: "/workspace/$workspaceId", params: { workspaceId: workspace._id } });
      },
      onError: (error: unknown) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: (error as BaseError).errors?.[0]?.message ?? (error as BaseError).message,
        });
      },
    });
    onSubmitSuccess?.();
  };

  return (
    <main className="w-full flex flex-row min-h-[590px] h-auto max-w-full">
      <div className="h-full px-10 py-10 flex-1">
        <div className="mb-5">
          <h1
            className="text-2xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left"
          >
            Let's build a Workspace
          </h1>
          <p className="text-muted-foreground text-lg leading-tight">
            Boost your productivity by making it easier for everyone to access projects in one location.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Workspace name</FormLabel>
                    <FormControl>
                      <Input placeholder="Taco's Co." className="!h-[48px]" {...field} />
                    </FormControl>
                    <FormDescription>This is the name of your company, team or organization.</FormDescription>
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
                      Workspace description
                      <span className="text-xs font-extralight ml-2">Optional</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Our team organizes marketing projects and tasks here."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Get your members on board with a few words about your Workspace.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isCreatingWorkspace} className="w-full h-[40px] text-white font-semibold" type="submit">
              {isCreatingWorkspace && <Loader className="animate-spin" />}
              Create Workspace
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="relative flex-1 shrink-0 hidden bg-muted md:block
      bg-[url('/images/workspace.jpg')] bg-cover bg-center h-full
      "
      />
    </main>
  );
}
