import { useGetWorkspaceTasks } from "@api/hooks/use-get-workspace-tasks";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { Badge } from "@shared/components/ui/badge";
import {
  TaskPriorityConfig,
  TaskPriorityEnum,
  TaskStatusConfig,
  TaskStatusEnum,
} from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { Loader } from "lucide-react";
import moment from "moment";

const RecentTasks = () => {
  const workspaceId = useGetWorkspaceId();

  const { data, isLoading } = useGetWorkspaceTasks({
    input: {
      workspaceId,
      filters: {
        sort: "-createdAt",
        page: 1,
        limit: 5,
      },
    },
    enabled: !!workspaceId,
  });

  const { tasks = [] } = data ?? {};

  return (
    <div className="flex flex-col space-y-6">
      {isLoading ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex
        "
        />
      ) : null}

      {tasks?.length === 0 && (
        <div
          className="font-semibold
         text-sm text-muted-foreground
          text-center py-5"
        >
          No Task created yet
        </div>
      )}

      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map(({ assignedTo, _id, taskCode, title, status, dueDate, priority }) => {
          return (
            <li
              key={_id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* Task Info */}
              <div className="flex flex-col space-y-1 flex-grow">
                <span className="text-sm capitalize text-gray-600 font-medium">{taskCode}</span>
                <p className="text-md font-semibold text-gray-800 truncate">{title}</p>
                <span className="text-sm text-gray-500">
                  Due: {dueDate ? moment(dueDate).format("MMM DD, YYYY") : null}
                </span>
              </div>

              {/* Task Status */}
              <div className="text-sm font-medium ">
                <Badge
                  variant={TaskStatusEnum[status]}
                  className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
                >
                  <span>{TaskStatusConfig[status].label}</span>
                </Badge>
              </div>

              {/* Task Priority */}
              <div className="text-sm ml-2">
                <Badge
                  variant={TaskPriorityEnum[priority]}
                  className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
                >
                  <span>{TaskPriorityConfig[priority].label}</span>
                </Badge>
              </div>

              {/* Assignee */}
              {assignedTo && (
                <div className="flex items-center space-x-2 ml-2">
                  {assignedTo.map(({ name, _id, profilePicture }) => {
                    const initials = getAvatarFallbackText(name);
                    const avatarColor = getAvatarColor(name);
                    return (
                      <Avatar className="h-8 w-8" key={_id}>
                        <AvatarImage src={profilePicture || ""} alt={name} />
                        <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTasks;

// const RecentTasks = () => {
//   const tasks = [
//     {
//       id: "Task-12",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-13",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-14",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-15",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-16",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//   ];
//   return (
//     <div className="flex flex-col pt-2">
//       <ul role="list" className="space-y-2">
//         {tasks.map((item, index) => (
//           <li
//             key={index}
//             role="listitem"
//             className="shadow-none border-0 py-2 hover:bg-[#fbfbfb] transition-colors ease-in-out "
//           >
//             <div className="grid grid-cols-7 gap-1 p-0">
//               <div className="shrink">
//                 <p>{item.id}</p>
//               </div>
//               <div className="col-span-2">
//                 <p className="text-sm font-medium leading-none">{item.title}</p>
//               </div>
//               <div>dueDate</div>
//               <div>Todo</div>
//               <div>High</div>
//               <div className="flex items-center gap-4 place-self-end">
//                 <span className="text-sm text-gray-500">Assigned To</span>
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                   <AvatarFallback>{item.assigneeTo}</AvatarFallback>
//                 </Avatar>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecentTasks;
