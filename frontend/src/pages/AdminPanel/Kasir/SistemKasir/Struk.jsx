import React, { useState, useEffect, useRef } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TickCircle, Printer } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import dayjs from "dayjs";

const Struk = ({ setIsOpen, setcontenstep, idDaftarOrder }) => {



    const [htmlContent, setHtmlContent] = useState('');
    const iframeRef = useRef(null);
    const fetchHtml = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/transaksi/view-struk/${idDaftarOrder}`);
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



    const handlePrint = () => {
        if (htmlContent) {
            // Membuat iframe untuk mencetak konten tanpa membuka window baru
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write('<html><head>');
            iframeDoc.write('<script src="https://cdn.tailwindcss.com"></script>');
            iframeDoc.write('<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />');
            iframeDoc.write('<style>');
            iframeDoc.write('@page { size: auto; margin: 0mm; }');  // Mengatur margin halaman menjadi 0
            iframeDoc.write('.content {');
            iframeDoc.write('  margin: auto;'); // Margin auto untuk center
            iframeDoc.write('  width: 15%;');  // Atur lebar konten sesuai kebutuhan
            iframeDoc.write('  transform: scale(0.6);'); // Atur skala konten
            iframeDoc.write('  transform-origin: 0 0;'); // Set titik asal transformasi
            iframeDoc.write('}');
            iframeDoc.write('</style>');
            iframeDoc.write('</head><body>');
            iframeDoc.write('<div class="content">'); // Pembungkus untuk konten
            iframeDoc.write(htmlContent); // Isi HTML yang sudah Anda ambil dari API
            iframeDoc.write('</div>');
            iframeDoc.write('</body></html>');
            iframeDoc.close();

            // Menunggu konten iframe selesai dimuat
            iframe.onload = () => {
                // Setelah iframe selesai dimuat, panggil print
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                document.body.removeChild(iframe); // Menghapus iframe setelah cetak
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
                <div style={{ width: '100%' }}>
                    <iframe
                        ref={iframeRef}
                        srcDoc={htmlContent}
                        title="HTML Content Preview"
                        style={{
                            width: '100%',
                            border: 'none',
                            overflow: 'hidden',
                        }}
                        onLoad={adjustIframeHeight} // Menyesuaikan tinggi saat konten dimuat
                    />
                </div>
            </div>
        </DialogContent>
    );
};

export default Struk;
