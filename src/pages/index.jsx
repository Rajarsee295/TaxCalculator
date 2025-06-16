import Header from "../components/Header";
import SalaryEntry from "../components/SalaryEntry";
import TaxInfo from "../components/TaxInfo";
import Slabs from "../components/Slabs";
import DetailedInfo from "../components/DetailedInfo";


import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

//index page here all the components are loaded
const Index = () => {

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
      <div ref={contentRef} className="dark:bg-gray-800">
        <Header />
        <SalaryEntry />
        <TaxInfo />
        <Slabs />
        <DetailedInfo />
      </div>
      <div className="flex justify-end pt-[40px] pr-[70px] shadow-lg">
        <button
          onClick={downloadAsPDF}
          className="mt-6 bg-gray-800 text-gray-300 px-5 py-2 rounded hover:bg-black dark:bg-gray-300 dark:text-gray-800 dark:hover:bg-gray-400 transition"
        >
          Download as PDF
        </button>
      </div>

    </>
  );
}
export default Index;