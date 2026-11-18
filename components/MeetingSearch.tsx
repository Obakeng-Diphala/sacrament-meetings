"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
   
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
      
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
      
    push(`${pathname}?${params.toString()}`);
    }, 300);

    return (
      <input
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search meetings"
        className="mb-6 w-full max-w-md rounded-md border border-slate-300 px-3 py-2"
      />    
    );
}   