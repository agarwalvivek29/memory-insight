"use client";

import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface menuOption {
    title : string,
    link : string
}

export default function ClientDropdownMenu({menuOptions} : {menuOptions : menuOption[]}):React.ReactNode {

  const router = useRouter();

    return <DropdownMenuContent align="end">
    {
      menuOptions.map((option)=>{
        return <DropdownMenuItem onClick={()=>{
          router.push(option.link)
        }}>{option.title}</DropdownMenuItem>
      })
    }
  </DropdownMenuContent>
}