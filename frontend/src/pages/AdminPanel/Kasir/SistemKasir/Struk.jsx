import React, { useState, useEffect, useRef } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TickCircle, Printer } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import dayjs from "dayjs";

const Struk = ({ setIsOpen, setcontenstep, idDaftarOrder }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true); // State untuk loading
    const iframeRef = useRef(null);

    // Fungsi untuk mengambil HTML dari API
    const fetchHtml = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/transaksi/view-struk/${idDaftarOrder}`);
            if (response.data) {
                setHtmlContent(response.data); // Menyimpan HTML dalam state
                setLoading(false); // Set loading ke false setelah data diterima
            }
        } catch (error) {
            console.error('Error fetching HTML:', error);
            setLoading(false); // Jika ada error, set loading ke false
        }
    };

    // Memanggil fetchHtml saat komponen pertama kali dimuat
    useEffect(() => {
        fetchHtml();
    }, [idDaftarOrder]);

    // Fungsi untuk menyesuaikan tinggi iframe setelah konten dimuat
    const adjustIframeHeight = () => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }
    };

    // Fungsi untuk mencetak struk
    const handlePrint = () => {
        if (htmlContent) {
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentWindow.document;
            iframeDoc.open();
            // iframeDoc.write('<html><head>');
            // iframeDoc.write('<script src="https://cdn.tailwindcss.com"></script>');
            // iframeDoc.write('<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />');
            // iframeDoc.write('<style>');
            // iframeDoc.write('@page { size: auto; margin: 0mm; }');
            // iframeDoc.write('.content { margin: auto; width: 15%; transform: scale(0.6); transform-origin: 0 0; }');
            // iframeDoc.write('</style>');
            // iframeDoc.write('</head><body>');
            // iframeDoc.write('<div class="content">');
            iframeDoc.write(htmlContent);
            // iframeDoc.write('</div>');
            // iframeDoc.write('</body></html>');
            iframeDoc.close();

            iframe.onload = () => {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                document.body.removeChild(iframe);
            };
        } else {
            console.log("HTML content kosong");
        }
    };

    return (
        <DialogContent className="sm:max-w-[638px] my-[20px] grid gap-[16px]">
            <DialogHeader className='grid gap-[16px] justify-items-center items-center py-[16px]'>
                <TickCircle size="40" variant="Bold" />
                <DialogTitle className='text-[16px] font-semibold'>Order Sukses !</DialogTitle>
                <p className='text-[14px] text-slate-500'>Selesaikan order atau cetak struk</p>
                <Button
                    onClick={() => {
                        setIsOpen(false);
                        setcontenstep(0);
                    }}
                    className="w-[232px] h-[36px] text-[14px]"
                >Selesai</Button>
                <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="w-[232px] h-[36px] text-[14px] flex gap-[12px]">
                    <Printer size={20} /> Cetak Struk
                </Button>
            </DialogHeader>
            <div className='flex flex-col items-center justify-center bg-gray-100 py-[20px]'>
                {loading ? (
                    <div className="loading">Loading...</div> // Indikator loading
                ) : (
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
                            onLoad={adjustIframeHeight}
                        />
                    </div>
                )}
            </div>
        </DialogContent>
    );
};

export default Struk;
