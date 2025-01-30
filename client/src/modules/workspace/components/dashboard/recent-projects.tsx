import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { Loader } from "lucide-react";
import moment from "moment";
import { Link } from "@tanstack/react-router";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { useGetProjectsInWorkspace } from "@api/hooks/use-get-projects-in-workspace";

export const RecentProjects = () => {
  const workspaceId = useGetWorkspaceId();

  const { data: projects = [], isLoading: isLoadingProject } = useGetProjectsInWorkspace({
    input: { workspaceId },
  });

  const sortProjects = projects.sort((a, b) => moment(b.updatedAt).diff(moment(a.updatedAt))).slice(0, 10);

  return (
    <div className="flex flex-col pt-2">
      {isLoadingProject ? (
        <Loader
          className="w-8 h-8
         animate-spin
         place-self-center
         flex"
        />
      ) : null}
      {sortProjects?.length === 0 && (
        <div
          className="font-semibold
         text-sm text-muted-foreground
          text-center py-5"
        >
          No Project created yet
        </div>
      )}

      <ul role="list" className="space-y-2">
        {sortProjects.map((project) => {
          const name = project.createdBy.name;
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            <li
              key={project._id}
              role="listitem"
              className="shadow-none cursor-pointer border-0 py-2 hover:bg-gray-50 transition-colors ease-in-out "
            >
              <Link
                to="/workspace/$workspaceId/$projectId"
                params={{
                  workspaceId: workspaceId,
                  projectId: project._id,
                }}
                className="grid gap-8 p-0"
              >
                <div className="flex items-start gap-2">
                  <div className="text-xl !leading-[1.4rem]">{project.emoji}</div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.createdAt ? moment(project.createdAt).format("MMM DD, YYYY") : null}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-4">
                    <span className="text-sm text-gray-500">Created by</span>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={project.createdBy.profilePicture || ""} alt="Avatar" />
                      <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
