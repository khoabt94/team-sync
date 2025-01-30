import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import { Textarea } from "@shared/components/ui/textarea";
import { z } from "zod";
import { workspaceEditSchema } from "@/workspace/schemas/workspace-edit.schema";
import { Permissions } from "@shared/constants/task.constant";
import { useWorkspaceContext } from "@/workspace/providers/workspace.provider";

type EditWorkspaceForm = z.infer<typeof workspaceEditSchema>;

export function EditWorkspaceForm() {
  const { workspace, hasPermission } = useWorkspaceContext();
  const canEditWorkspace = hasPermission(Permissions.EDIT_WORKSPACE);

  const form = useForm<EditWorkspaceForm>({
    resolver: zodResolver(workspaceEditSchema),
    defaultValues: {
      name: workspace?.name ?? "",
      description: workspace?.description ?? "",
    },
  });

  const onSubmit = (values: EditWorkspaceForm) => {
    console.log("🚀 ~ EditWorkspaceForm ~ values:", values);
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 border-b">
          <h1
            className="text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left"
          >
            Edit Workspace
          </h1>
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
                      <Input
                        placeholder="Taco's Co."
                        className="!h-[48px] disabled:opacity-90 disabled:pointer-events-none"
                        disabled={!canEditWorkspace}
                        {...field}
                      />
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
                      Workspace description
                      <span className="text-xs font-extralight ml-2">Optional</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        disabled={!canEditWorkspace}
                        className="disabled:opacity-90 disabled:pointer-events-none"
                        placeholder="Our team organizes marketing projects and tasks here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {canEditWorkspace && (
              <Button
                className="flex place-self-end  h-[40px] text-white font-semibold"
                // disabled={isPending}
                type="submit"
              >
                {/* {isPending && <Loader className="animate-spin" />} */}
                Update Workspace
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
