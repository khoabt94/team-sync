import { Check, PlusCircle } from "lucide-react";

import { Badge } from "@shared/components/ui/badge";
import { Button } from "@shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@shared/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { Separator } from "@shared/components/ui/separator";
import { cn } from "@shared/util/cn.util";
import { ReactNode, useState } from "react";

type DataTableProjectFilterProps = {
  title?: string;
  options: {
    label: ReactNode;
    value: string;
    emoji: string;
  }[];
  disabled?: boolean;
  selectedValue: string; // New prop
  onFilterChange: (value: string) => void; // New callback prop
};

export function DataTableProjectFilter({
  title,
  options,
  selectedValue,
  disabled,
  onFilterChange,
}: DataTableProjectFilterProps) {
  const selectedOption = options.find((option) => option.value === selectedValue);

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button disabled={disabled} variant="outline" size="sm" className="h-8 border-dashed w-full lg:w-auto">
          <PlusCircle />
          {title}
          {selectedOption && (
            <>
              <Separator orientation="vertical" className="mx-0 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedOption.emoji}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Filter ${title}`} />
          <CommandList className="px-0">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="px-0">
              {options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    className={cn("cursor-pointer px-2 rounded-none")}
                    key={option.value}
                    onSelect={() => {
                      onFilterChange(option.value); // Single select
                      onClose();
                    }}
                  >
                    <div className={cn("flex items-center gap-1", {})}>
                      {isSelected ? <Check className="size-4" /> : <div className="size-4" />}
                      <span>{option.label}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup className="sticky bottom-0 align-bottom bg-white">
                  <CommandItem
                    onSelect={() => onFilterChange("")} // Clear all filters
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
