import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Play, GalleryAdd, Trash } from 'iconsax-react';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const Priview = ({isAnyChecked}) => {
    const [htmlContent, setHtmlContent] = useState('');
    const fetchHtml = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/setting-struk/view-struk`);
            if (response.data) {
                setHtmlContent(response.data); // Menyimpan HTML dalam state
            }
        } catch (error) {
            console.error('Error fetching HTML:', error);
        }
    };
    useEffect(() => {
        fetchHtml();
    }, []);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button  onClick={fetchHtml} disabled={!isAnyChecked} variant="secondary" className="text-[14px] h-[36px] gap-[8px]" > <Play size={16} />Priview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[636px] my-[20px] ">
                <div className='flex flex-col items-center justify-center '>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Priview
