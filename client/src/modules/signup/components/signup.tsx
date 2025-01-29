import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form";
import { Input } from "@shared/components/ui/input";
import { signupFormSchema } from "@/signup/schemas/signup.schema";
import { Logo } from "@shared/components/logo";
import { Link } from "@tanstack/react-router";
import { GoogleOauthButton } from "@shared/components/ui/google-button";
import { useSignup } from "@api/hooks/useSignup";
import { toast } from "@shared/hooks/use-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export type SignUpFormType = z.infer<typeof signupFormSchema>;

export const SignUp = () => {
  const navigate = useNavigate();
  const { mutateAsync: signup, isPending } = useSignup();
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
      await signup(values);
      toast({
        description: "Account created successfully. Please login to continue.",
      });
      navigate({ to: "/" });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.errors?.[0]?.message ?? error.message,
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
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">Name</FormLabel>
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
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
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
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">Password</FormLabel>
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
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">Confirm password</FormLabel>
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
                      <Button type="submit" disabled={isPending} className="w-full mt-3">
                        {isPending && <Loader className="animate-spin" />}
                        Sign up
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/login" className="underline underline-offset-4">
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
};
