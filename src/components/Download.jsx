import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Download = () => {
    const contentRef = useRef();

    const downloadAsPDF = async () => {
        const element = contentRef.current;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
    };
    return (
        <>
            <div className="p-8">
                <button
                    onClick={downloadAsPDF}
                    className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                >
                    Download as PDF
                </button>
            </div>
        </>
    );
}

export default Download