import { Ghost } from "lucide-react";
import { Button } from "@shared/components/ui/button";
import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <Ghost className="size-20 animate-bounce text-muted-foreground" />
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 - Page Not Found</h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Oops! The page you&apos;re looking for has vanished into thin air.
        <br />
        Let&apos;s get you back on track.
      </p>
      <Button asChild className="mt-4">
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
}
