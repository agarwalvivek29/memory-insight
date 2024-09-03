import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";
import { image, remote, request } from "@/lib/objects";
import { data } from "@/lib/data";
import DashBoardCard from "@/components/DashboardCard";

async function getAllRemotes(userId : string): Promise<remote[] | null> {
    try{
        const remotes = await fetch(`/api/remotes/${userId}`);
        const data = await remotes.json();
        return data.remotes;
    }
    catch(err){
        console.error(err);
        return null
    }
}

async function getAllImages(userId : string): Promise<image[] | null> {
    try{
        const images = await fetch(`/api/images/${userId}`);
        const data = await images.json();
        return data.images;
    }
    catch(err){
        console.error(err);
        return null
    }
}

async function getAllRequests(userId : string): Promise<request[] | null> {
    try{
        const requests = await fetch(`/api/requests/${userId}`);
        const data = await requests.json();
        return data.requests;
    }
    catch(err){
        console.error(err);
        return null
    }
}

export default async function Dashboard() {

    const session = await getServerSession(authOptions);
    // const remotes = await getAllRemotes(session.user.id);
    // const images = await getAllImages(session.user.id);
    // const requests = await getAllRequests(session.user.id);

    return  <main className="flex min-h-[calc(100vh_-_theme(spacing.14))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="max-w-6xl w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
                data.map((card)=>{
                    return <DashBoardCard
                        title={card.title}
                        description={card.description}
                        link={card.link}
                        menuOptions={card.menuOptions}
                        requests={[]}
                        data={card.data}
                        icon={card.icon}
                    />
                })
            }
        </div>
    </main>
}