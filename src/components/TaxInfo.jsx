import { useTax } from "../Hooks/useTax"

const TaxInfo = () => {

    //calling infos from custom hook useTax() and rendering them whenever available
    const { totalTax, afterTaxIncome, effectiveTaxRate } = useTax()
    return (
        <>
            {totalTax ? <div className="flex flex-col items-center justify-center md:flex-row" >
                <div className="shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] text-gray-800 mt-[20px] w-[90vw] h-[100px] rounded-lg pt-[19px] pl-[20px] dark:bg-gray-700 dark:text-gray-300 m-[10px] md:ml-[8vw]  ">
                    <div > Total Tax Owed</div>
                    <div className="font-bold text-[30px]"> ₹ {totalTax}</div>
                </div>
                <div className="shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] text-gray-800 mt-[20px] w-[90vw] h-[100px] rounded-lg pt-[19px] pl-[20px] dark:bg-gray-700 dark:text-gray-300 m-[10px]  ">
                    <div > Effective Tax Rate</div>
                    <div className="font-bold text-[30px]"> {effectiveTaxRate}%</div>
                </div>
                <div className="shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] text-gray-800 mt-[20px] w-[90vw] h-[100px] rounded-lg pt-[19px] pl-[20px] dark:bg-gray-700 dark:text-gray-300  m-[10px]  md:mr-[8vw]">
                    <div > After-Tax Income</div>
                    <div className="font-bold text-[30px] text-green-600">₹{afterTaxIncome} </div>
                </div>
            </div>
            :<div></div>}

        </>
    )
}

export default TaxInfo