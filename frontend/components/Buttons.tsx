import Link from "next/link"

export function PrimaryBtn({ children, link } : {
    children : React.ReactNode,
    link : string
}){
        
    return <button 
    className="border w-min whitespace-nowrap rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <Link href={link}>{children}</Link>
    </button> 
}

export function PrimaryBtn_Fn({ children, onClick } : {
    children : React.ReactNode,
    onClick : () => void
}){
    return <button 
    onClick={onClick}
    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        {children}
    </button> 
}

export function SecondaryBtn({ children, link } : {
    children : React.ReactNode,
    link : string
}){
        
    return <button 
    className="border w-min mt-2 whitespace-nowrap rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <Link href={link}>{children}</Link>
    </button> 
}