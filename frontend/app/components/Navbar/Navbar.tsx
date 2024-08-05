import AuthBtn from "./AuthBtn";
import ProfileBtn from "./ProfileBtn";

export default function Navbar(){
    
    return <nav className="flex justify-between items-center p-5 border-b border-black">
        <div className="font-bold text-2xl">
            Memory Insight
        </div>
        <div className="flex gap-5 text-black">
            <ProfileBtn />
            <AuthBtn />
        </div>
    </nav>
}