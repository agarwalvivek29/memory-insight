import { dashboardCardProps } from "@/components/DashboardCard";
import { ServerIcon, LayersIcon, CpuIcon, BarChart2Icon, ClockIcon } from "@/components/Icons";
import { Server } from "http";

export const data : dashboardCardProps[] = [
    {
        title: "Remote Machines",
        description: "View and manage your remote machines.",
        link: "/remotes",
        menuOptions: [
            {
                title: "Add New",
                link: ""
            }
        ],
        requests: [],
        data: [],
        icon: ServerIcon
    },
    {
        title: "Memory Snapshots",
        description: "View and manage your memory snapshots.",
        link: "/images",
        menuOptions: [
            {
                title: "Capture New",
                link: ""
            }
        ],
        requests: [],
        data: [],
        icon: LayersIcon
    },
    {
        title: "Analysis Commands",
        description: "Select and run analysis commands.",
        link: "/commands",
        menuOptions: [
            {
                title: "Request Analysis",
                link: ""
            }
        ],
        requests: [],
        data: [],
        icon: CpuIcon
    },
    {
        title: "Snapshot Analysis",
        description: "View the result of your analysis.",
        link: "/analysis",
        menuOptions: [
            {
                title: "View All",
                link: ""
            }
        ],
        requests: [],
        data: [],
        icon: BarChart2Icon
    },
    {
        title: "Async Requests Tracking",
        description: "View and manage all your requests.",
        link: "/requests",
        menuOptions: [
            {
                title: "Refresh",
                link: ""
            }
        ],
        requests: [],
        data: [],
        icon: ClockIcon
    },
]