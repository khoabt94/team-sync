import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signupFormSchema } from "@/signup/schemas/signup.schema";
import { useSignup } from "@api/hooks/use-signup";
import { BaseError } from "@api/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@shared/components/logo";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { GoogleOauthButton } from "@shared/components/ui/google-button";
import { Input } from "@shared/components/ui/input";
import { toast } from "@shared/hooks/use-toast";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@shared/stores/auth.store";
import { Route } from "@routes/_auth/signup";

export type SignUpFormType = z.infer<typeof signupFormSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const { returnUrl = "" } = Route.useSearch();
  const { mutateAsync: signup, isPending } = useSignup();
  const { setUser } = useAuthStore();
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormType) => {
    try {
      const { user } = await signup(values);
      toast({
        description: "Account created successfully. Please login to continue.",
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
              <CardTitle className="text-xl">Create an account</CardTitle>
              <CardDescription>Signup with your Email or Google account</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                      <GoogleOauthButton label="Signup" />
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm dark:text-[#f1f7feb5]">Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name..." className="h-10" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm dark:text-[#f1f7feb5]">Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email..." className="h-10" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm dark:text-[#f1f7feb5]">Password</FormLabel>
                              <FormControl>
                                <Input type="password" className="h-10" placeholder="Your password..." {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm dark:text-[#f1f7feb5]">Confirm password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  className="h-10"
                                  placeholder="Confirm your password"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" disabled={isPending} className="mt-3 w-full">
                        {isPending && <Loader className="animate-spin" />}
                        Sign up
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/login" className="underline underline-offset-4" search={{ returnUrl }}>
                        Sign in
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
