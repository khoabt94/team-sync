import { AudioWaveform } from "lucide-react";

import { Link } from "@tanstack/react-router";
import { cn } from "@shared/util/cn.util";

type LogoProps = {
  url?: string;
  logoClassname?: string;
  wrapperClassname?: string;
};

export function Logo({ url = "/", logoClassname = "", wrapperClassname = "" }: LogoProps) {
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <div
          className={cn(
            "flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground",
            wrapperClassname,
          )}
        >
          <AudioWaveform className={cn("size-4", logoClassname)} />
        </div>
      </Link>
    </div>
  );
}
