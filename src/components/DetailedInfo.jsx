import { useTax } from "../Hooks/useTax";

const DetailedInfo = () => {
    //takes the tax calculations 
    const { taxBreakdown } = useTax()

    //calculates total tax 
    const totalTax = taxBreakdown.reduce((acc, item) => acc + item.amount, 0);
    return (
        <>
            {taxBreakdown.length>0 ? <div className="flex justify-center pt-[20px]">
                <div className="shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] w-[90vw] rounded-lg">
                    <div className="pl-[40px] pt-[30px] font-semibold text-[140%] text-gray-800 dark:text-gray-300"> Detailed Tax Summary</div>
                    <div className="overflow-x-auto">

                        <table >
                            <thead className=" pt-[10px]">
                                <tr className="text-gray-500 dark:text-gray-400">
                                    <th className="px-[7.25vw] py-2">Tax Bracket</th>
                                    <th className="px-[7.25vw] py-2">Income Range</th>
                                    <th className="px-[7.25vw] py-2">Tax Rate</th>
                                    <th className="px-[7.25vw] py-2">Taxable Income</th>
                                    <th className="px-[7.25vw] py-2">Tax Owed</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 dark:text-gray-200 ">
                                {taxBreakdown.map((item, idx) => (
                                    <tr key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                                        <td className="px-[7.25vw] py-2 font-semibold">{`Bracket ${idx + 1}`}</td>
                                        <td className="px-[7.25vw] py-2">{item.range}</td>
                                        <td className="px-[7.25vw] py-2 font-semibold">{item.rate}%</td>
                                        <td className="px-[7.25vw] py-2">₹{item.taxableIncome}</td>
                                        <td className="px-[7.25vw] py-2 font-semibold">₹{item.amount}</td>
                                    </tr>
                                ))}
                                <tr className="font-bold border-t dark:border-gray-700 ">

                                    <td colSpan={5} className="px-[60px] py-3 text-right">
                                        Total Tax Owed:<span className="text-blue-600 dark:text-blue-400"> ₹{totalTax}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                : <div></div>}
        </>
    );
}

export default DetailedInfo