import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { request } from "@/lib/objects"
import { MoveHorizontalIcon, LoaderIcon } from "@/components/Icons"
import ClientDropdownMenu, { menuOption } from "@/components/DropdownMenu"
import { SecondaryBtn } from "./Buttons"

export interface dashboardCardProps {
  title: string,
  description: string,
  link: string,
  menuOptions: menuOption[],
  requests : request[],
  data : any,
  icon : any
}

const DashBoardCard = ({ title, description, link, menuOptions, requests, data, icon: Icon} : dashboardCardProps ):React.ReactNode => {
  return <Card className="">
    <CardHeader className="flex flex-row items-center gap-4">
      <Icon />
      <div className="grid gap-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoveHorizontalIcon />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <ClientDropdownMenu menuOptions={menuOptions} />
      </DropdownMenu>
    </CardHeader>
    <CardContent className="grid gap-2 space-between">
      <div className="text-sm font-semibold">{data.length} {title}</div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <LoaderIcon />
          <span className="text-muted-foreground">{requests.length} Requests</span>
        </div>
      </div>
      <SecondaryBtn link={link}>View All</SecondaryBtn>
    </CardContent>
    
  </Card>
}

export default DashBoardCard;