import { useState } from "react"
import { useTax } from "../Hooks/useTax"

const SalaryEntry = () => {
    //takes the calculateTax function from custom hook
    const {  calculateTax } = useTax()
    const [ inc , setInc ] = useState(0)
    const [ year, setYear ] = useState(2025)
    const [ country , setCountry ] = useState("India")

    const handleEntry = (newIncome,yearValue,count) => {
        calculateTax(newIncome,yearValue,count)
    }

    return (
        <>
            <div className="w-full flex justify-center items-center pt-[20px]">
                <div className="shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] w-[90vw] h-[300px] rounded-lg dark:bg-gray-700 md:w-[400px]">
                    <div className="flex justify-start pl-[40px] pt-[20px] text-gray-800 dark:text-gray-300 font-semibold text-[150%]">₹ &nbsp; Annual Income</div>
                    <div className="pl-[45px] pt-[20px] text-gray-800 dark:text-gray-300"> Enter your annual income</div>
                    <div className=" flex flex-col pl-[45px] pt-[10px]">
                        <input type="text" placeholder="Income" className="w-[90%] border border-gray-300 dark:bg-gray-600 dark:text-gray-300 rounded-lg pl-[10px] py-[10px] focus:outline-none focus:border-gray-800 focus:dark:border-gray-300"
                            onChange={(e) => {setInc(Number(e.target.value)); handleEntry(Number(e.target.value),year,country); }}
                        />
                        <select
                            className="w-[50%] mt-3 border border-gray-300 outline:none focus:outline-none dark:bg-gray-600 dark:text-gray-300 rounded-lg pl-[10px] py-[10px] focus:outline-none focus:border-gray-800 focus:dark:border-gray-300"
                            onChange={(e) => {setYear(e.target.value); handleEntry(inc,e.target.value,country);}}
                        >
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                        </select>
                        <select
                            className="w-[50%] mt-3 border border-gray-300 outline:none focus:outline-none dark:bg-gray-600 dark:text-gray-300 rounded-lg pl-[10px] py-[10px] focus:outline-none focus:border-gray-800 focus:dark:border-gray-300"
                            onChange={(e) => {setCountry(e.target.value); handleEntry(inc,year,e.target.value);}}
                        >
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Australia">Australia</option>
                            <option value="France">France</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalaryEntry