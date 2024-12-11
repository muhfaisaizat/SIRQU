import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Logout as IconLogout} from 'iconsax-react';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/networt";

const Logout = () => {
    const navigate = useNavigate();
    const nama = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const foto = localStorage.getItem("foto");
    
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex gap-3 w-auto hover:bg-white">
                    <Avatar>
                        <AvatarImage src={foto && foto !== "null" ? `${API_URL}/images/${foto}` : "https://github.com/shadcn.png"}  />
                        <AvatarFallback>{nama}</AvatarFallback>
                    </Avatar>
                    <p className='text-[14px] font-medium pt-1 pb-1'>{nama}</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto mt-[10px]">
                <DropdownMenuLabel className='flex gap-3 items-center p-[16px] w-[310px]'>
                    <Avatar>
                        <AvatarImage src={foto && foto !== "null" ? `${API_URL}/images/${foto}` : "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='grid gap-[4px]'>
                    <h2 className='text-[14px] font-bold'>{nama}</h2>
                    <p className='text-[12px] font-normal'>{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem  onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  localStorage.removeItem("email");
                  localStorage.removeItem("foto");
                  localStorage.removeItem("syarat_ketentuan");
                  localStorage.removeItem("idTokoUtama");
                  localStorage.removeItem("tokenGeneratedTime");
                  localStorage.removeItem("role");
                  navigate("/");
                }} className="py-3 px-[19px] gap-[12px] text-[14px] font-semibold"> <IconLogout variant='Bold'/>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default Logout
