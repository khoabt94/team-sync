import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginFormSchema } from "@/login/schemas/login.schema";
import { useLogin } from "@api/hooks/use-login";
import { BaseError } from "@api/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "@routes/_auth/login";
import { Logo } from "@shared/components/logo";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { GoogleOauthButton } from "@shared/components/ui/google-button";
import { Input } from "@shared/components/ui/input";
import { toast } from "@shared/hooks/use-toast";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@shared/stores/auth.store";

export type LoginFormType = z.infer<typeof loginFormSchema>;

export function Login() {
  const navigate = useNavigate();
  const { returnUrl = "" } = Route.useSearch();
  const { setUser } = useAuthStore();
  const { mutateAsync: login, isPending } = useLogin();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    try {
      const { user } = await login(values);
      toast({
        description: "Login succesfully, Welcome back!",
      });
      setUser(user);
      const redirectUrl = returnUrl ? decodeURIComponent(returnUrl) : "/workspace/$workspaceId";
      navigate({ to: redirectUrl, params: { workspaceId: user.currentWorkspace } });
    } catch (error: unknown) {
      toast({
        title: "Error",
        variant: "destructive",
        description: (error as BaseError).errors?.[0]?.message ?? (error as BaseError).message,
      });
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium">
          <Logo />
          Team Sync.
        </Link>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Login with your Email or Google account</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <GoogleOauthButton label="Login" />
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                    <div className="grid gap-3">
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm dark:text-[#f1f7feb5]">Email</FormLabel>
                              <FormControl>
                                <Input placeholder="m@example.com" className="!h-[48px]" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2" tabIndex={-1}>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem tabIndex={-1}>
                              <div className="flex items-center" tabIndex={-1}>
                                <FormLabel className="text-sm dark:text-[#f1f7feb5]">Password</FormLabel>
                                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                  Forgot your password?
                                </a>
                              </div>
                              <FormControl>
                                <Input type="password" placeholder="Your password" className="!h-[48px]" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button disabled={isPending} type="submit" className="mt-3 w-full">
                        {isPending && <Loader className="animate-spin" />}
                        Login
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link to="/signup" className="underline underline-offset-4">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
