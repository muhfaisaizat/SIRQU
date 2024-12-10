import React, { useState, useEffect, useRef  } from 'react'
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
    const iframeRef = useRef(null);
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
    const adjustIframeHeight = () => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button  onClick={fetchHtml} disabled={!isAnyChecked} variant="secondary" className="text-[14px] h-[36px] gap-[8px]" > <Play size={16} />Priview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[636px] my-[20px] bg-gray-100">
                <div className='flex flex-col items-center justify-center '>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div style={{ width: '390px' }}>
                        <iframe
                            ref={iframeRef}
                            srcDoc={htmlContent}
                            title="HTML Content Preview"
                            style={{
                                width: '390px',
                                border: 'none',
                                overflow: 'hidden',
                            }}
                            onLoad={adjustIframeHeight} // Menyesuaikan tinggi saat konten dimuat
                        />
                        </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Priview
