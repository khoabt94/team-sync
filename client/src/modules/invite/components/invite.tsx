import { Loader } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@shared/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Button } from "@shared/components/ui/button";
import { Route } from "@routes/invite/workspace/$inviteCode/join";
import { useAuthStore } from "@shared/stores/auth.store";
import { getInviteUrl } from "@shared/util/member.util";
import { useJoinWorkspaceByInviteCode } from "@api/hooks/use-join-workspace-by-inviteCode";
import { toast } from "@shared/hooks/use-toast";
import { BaseError } from "@api/type";

export const InviteView = () => {
  const { inviteCode } = Route.useParams();
  const navigate = useNavigate();
  const { mutateAsync: joinWorkspace } = useJoinWorkspaceByInviteCode();

  const { user, isFetchingUser } = useAuthStore();

  const returnUrl = encodeURIComponent(getInviteUrl(inviteCode));

  const handleSubmit = () => {
    joinWorkspace(
      { inviteCode },
      {
        onSuccess: ({ workspaceId }) => {
          toast({
            title: "Success",
            description: "You have successfully joined the workspace",
          });
          navigate({ to: "/workspace/$workspaceId", params: { workspaceId } });
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
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <Logo />
          Team Sync.
        </Link>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Hey there! You're invited to join a TeamSync Workspace!</CardTitle>
              {!user && (
                <CardDescription>
                  Looks like you need to be logged into your TeamSync account to join this Workspace.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {isFetchingUser ? (
                <Loader className="!w-11 !h-11 animate-spin place-self-center flex" />
              ) : (
                <div>
                  {user ? (
                    <div className="flex items-center justify-center my-3">
                      <Button
                        //   disabled={isLoading}
                        onClick={handleSubmit}
                        className="!bg-green-500 !text-white text-base !h-auto"
                      >
                        {/* {isLoading && <Loader className="!w-6 !h-6 animate-spin" />} */}
                        Join the Workspace
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <Link className="flex-1 w-full text-base" to="/signup" search={{ returnUrl }}>
                        <Button className="w-full">Signup</Button>
                      </Link>
                      <Link className="flex-1 w-full text-base" to="/login" search={{ returnUrl }}>
                        <Button variant="secondary" className="w-full border">
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Cases:
// 1. User is not logged in
// 2. User is logged in but not in the workspace
// 3. User is logged in and in the workspace
// 4. User is newly registered
