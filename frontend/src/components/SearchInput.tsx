"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui";

type SearchInputProps = {
  delay?: number;
  onSearch: (query: string) => void;
} & React.ComponentProps<"input">;

export function SearchInput({
  className,
  delay = 300,
  onSearch,
  ...props
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce(inputValue, delay);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={cn("relative w-full", className)}>
      <Input
        className="pl-8"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        {...props}
      />
      <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
