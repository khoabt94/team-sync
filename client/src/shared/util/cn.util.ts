import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({});

export const cn = (...args: Array<ClassValue>) => twMerge(clsx(args));
