import { createContext, useState } from "react";
export const TaxContext = createContext();

const TaxProvider = ({ children }) => {

    //useful data for calculation
    const [income, setIncome] = useState(0);
    const [taxBreakdown, setTaxBreakdown] = useState([]);
    const [totalTax, setTotalTax] = useState(0);
    const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
    const [afterTaxIncome, setAfterTaxIncome] = useState(0);

    const calculateTax = (newIncome, year, country) => {
        //only calculate tax if income is greater than 250000
        if (newIncome >= 250000) {
            setIncome(newIncome);
            let brackets = [];
            switch (country) {
                case "India": {
                    if (year < 2019) {
                        brackets = [
                            { limit: 250000, rate: 0 },
                            { limit: 500000, rate: 10 },
                            { limit: 1000000, rate: 20 },
                            { limit: Infinity, rate: 30 },
                        ];
                    }
                    else {
                        //Tax brackets
                        brackets = [
                            { limit: 250000, rate: 0 },
                            { limit: 500000, rate: 5 },
                            { limit: 1000000, rate: 20 },
                            { limit: Infinity, rate: 30 },
                        ];
                    }
                    break;
                }
                case "France": {
                    const franceYearHandlers = {
                        2025: () => {
                            brackets = [
                                { limit: 11497 * 90, rate: 0 },        // ₹1,034,730
                                { limit: 29315 * 90, rate: 11 },       // ₹2,638,350
                                { limit: 83823 * 90, rate: 30 },       // ₹7,544,070
                                { limit: 180294 * 90, rate: 41 },      // ₹16,226,460
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2024: () => {
                            brackets = [
                                { limit: 11497 * 90, rate: 0 },
                                { limit: 29315 * 90, rate: 11 },
                                { limit: 83823 * 90, rate: 30 },
                                { limit: 180294 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2023: () => {
                            brackets = [
                                { limit: 10777 * 90, rate: 0 },
                                { limit: 27478 * 90, rate: 11 },
                                { limit: 78570 * 90, rate: 30 },
                                { limit: 168994 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2022: () => {
                            brackets = [
                                { limit: 10225 * 90, rate: 0 },
                                { limit: 26070 * 90, rate: 11 },
                                { limit: 74545 * 90, rate: 30 },
                                { limit: 160336 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2021: () => {
                            brackets = [
                                { limit: 10084 * 90, rate: 0 },
                                { limit: 25659 * 90, rate: 11 },
                                { limit: 73369 * 90, rate: 30 },
                                { limit: 157806 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2020: () => {
                            brackets = [
                                { limit: 10064 * 90, rate: 0 },
                                { limit: 25659 * 90, rate: 11 },
                                { limit: 73369 * 90, rate: 30 },
                                { limit: 157806 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2019: () => {
                            brackets = [
                                { limit: 9964 * 90, rate: 0 },
                                { limit: 27519 * 90, rate: 14 },
                                { limit: 73779 * 90, rate: 30 },
                                { limit: 156244 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2018: () => {
                            brackets = [
                                { limit: 9807 * 90, rate: 0 },
                                { limit: 27086 * 90, rate: 14 },
                                { limit: 72617 * 90, rate: 30 },
                                { limit: 153783 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2017: () => {
                            brackets = [
                                { limit: 9690 * 90, rate: 0 },
                                { limit: 26764 * 90, rate: 14 },
                                { limit: 71754 * 90, rate: 30 },
                                { limit: 151956 * 90, rate: 41 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2016: () => {
                            brackets = [{ limit: 9700 * 90, rate: 0 },
                            { limit: 26791 * 90, rate: 14 },
                            { limit: 71726 * 90, rate: 30 },
                            { limit: 151108 * 90, rate: 41 },
                            { limit: Infinity, rate: 45 }]
                        },
                        2015: () => {
                            brackets = [{ limit: 9690 * 90, rate: 0 },
                            { limit: 26764 * 90, rate: 14 },
                            { limit: 71754 * 90, rate: 30 },
                            { limit: 151956 * 90, rate: 41 },
                            { limit: Infinity, rate: 45 }]
                        },
                    };
                    if (franceYearHandlers[year]) {
                        franceYearHandlers[year]();
                    }
                    break;
                }
                case "USA": {
                    const usaYearHandlers = {
                        2025: () => {
                            brackets = [
                                { limit: 11925 * 83, rate: 10 },
                                { limit: 48475 * 83, rate: 12 },
                                { limit: 103350 * 83, rate: 22 },
                                { limit: 197300 * 83, rate: 24 },
                                { limit: 250525 * 83, rate: 32 },
                                { limit: 626350 * 83, rate: 35 },
                                { limit: Infinity, rate: 37 }
                            ];
                        },
                        2024: () => {
                            brackets = [
                                { limit: 11600 * 83, rate: 10 },
                                { limit: 47150 * 83, rate: 12 },
                                { limit: 100525 * 83, rate: 22 },
                                { limit: 191950 * 83, rate: 24 },
                                { limit: 243725 * 83, rate: 32 },
                                { limit: 609350 * 83, rate: 35 },
                                { limit: Infinity, rate: 37 }
                            ];
                        },
                        2023: () => {
                            brackets = [
                                { limit: 11000 * 83, rate: 10 },
                                { limit: 44725 * 83, rate: 12 },
                                { limit: 95375 * 83, rate: 22 },
                                { limit: 182100 * 83, rate: 24 },
                                { limit: 231250 * 83, rate: 32 },
                                { limit: 578125 * 83, rate: 35 },
                                { limit: Infinity, rate: 37 }
                            ];
                        },
                        2022: () => {
                            brackets = [
                                { limit: 10275 * 83, rate: 10 },
                                { limit: 41775 * 83, rate: 12 },
                                { limit: 89075 * 83, rate: 22 },
                                { limit: 170050 * 83, rate: 24 },
                                { limit: 215950 * 83, rate: 32 },
                                { limit: 539900 * 83, rate: 35 },
                                { limit: Infinity, rate: 37 }
                            ];
                        },
                        2021: () => {
                            brackets = usaYearHandlers[2022]().brackets;
                        },
                        2020: () => {
                            brackets = [
                                { limit: 9875 * 83, rate: 10 },
                                { limit: 40125 * 83, rate: 12 },
                                { limit: 85525 * 83, rate: 22 },
                                { limit: 163300 * 83, rate: 24 },
                                { limit: 207350 * 83, rate: 32 },
                                { limit: 518400 * 83, rate: 35 },
                                { limit: Infinity, rate: 37 }
                            ];
                        },
                        2019: () => {
                            brackets = [
                                { limit: 9700 * 83, rate: 10 },
                                { limit: 39475 * 83, rate: 12 },
                                { limit: 84200 * 83, rate: 22 },
                                { limit: 160725 * 83, rate: 24 },
                                { limit: 204100 * 83, rate: 32 },
                                { limit: 510300 * 83, rate: 35 },
                                { limit: Infinity, rate: 37 }
                            ];
                        },
                        2018: () => {
                            brackets = [
                                { limit: 9525 * 83, rate: 10 },
                                { limit: 38700 * 83, rate: 12 },
                                { limit: 82500 * 83, rate: 22 },
                                { limit: 157500 * 83, rate: 24 },
                                { limit: 200000 * 83, rate: 32 },
                                { limit: 500000 * 83, rate: 35 },
                                { limit: Infinity, rate: 37 }
                            ];
                        },
                        2017: () => {
                            brackets = [
                                { limit: 9075 * 83, rate: 10 },
                                { limit: 36750 * 83, rate: 15 },
                                { limit: 90750 * 83, rate: 25 },
                                { limit: 189300 * 83, rate: 28 },
                                { limit: 411500 * 83, rate: 33 },
                                { limit: 416700 * 83, rate: 35 },
                                { limit: Infinity, rate: 39.6 }
                            ];
                        },
                        2016: () => {
                            brackets = [
                                { limit: 9075 * 83, rate: 10 },
                                { limit: 36900 * 83, rate: 15 },
                                { limit: 89350 * 83, rate: 25 },
                                { limit: 186350 * 83, rate: 28 },
                                { limit: 405100 * 83, rate: 33 },
                                { limit: 406750 * 83, rate: 35 },
                                { limit: Infinity, rate: 39.6 }
                            ];
                        },
                        2015: () => {
                            brackets = [
                                { limit: 9225 * 83, rate: 10 },
                                { limit: 37450 * 83, rate: 15 },
                                { limit: 90750 * 83, rate: 25 },
                                { limit: 189300 * 83, rate: 28 },
                                { limit: 411500 * 83, rate: 33 },
                                { limit: 413200 * 83, rate: 35 },
                                { limit: Infinity, rate: 39.6 }
                            ];
                        }
                    };
                    if (usaYearHandlers[year]) {
                        usaYearHandlers[year]();
                    }
                    break
                }
                case "UK": {
                    const ukYearHandlers = {
                        2025: () => {
                            brackets = [
                                { limit: 12570 * 104, rate: 0 },
                                { limit: 50270 * 104, rate: 20 },
                                { limit: 125140 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2024: () => {
                            brackets = [
                                { limit: 12570 * 104, rate: 0 },
                                { limit: 50270 * 104, rate: 20 },
                                { limit: 125140 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2023: () => {
                            brackets = [
                                { limit: 12570 * 104, rate: 0 },
                                { limit: 50270 * 104, rate: 20 },
                                { limit: 125140 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2022: () => {
                            brackets = [
                                { limit: 12570 * 104, rate: 0 },
                                { limit: 50270 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2021: () => {
                            brackets = [
                                { limit: 12570 * 104, rate: 0 },
                                { limit: 50270 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2020: () => {
                            brackets = [
                                { limit: 12500 * 104, rate: 0 },
                                { limit: 37500 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2019: () => {
                            brackets = [
                                { limit: 12500 * 104, rate: 0 },
                                { limit: 37500 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2018: () => {
                            brackets = [
                                { limit: 11850 * 104, rate: 0 },
                                { limit: 34500 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2017: () => {
                            brackets = [
                                { limit: 11500 * 104, rate: 0 },
                                { limit: 34500 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2016: () => {
                            brackets = [
                                { limit: 11000 * 104, rate: 0 },
                                { limit: 32000 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2015: () => {
                            brackets = [
                                { limit: 10600 * 104, rate: 0 },
                                { limit: 31785 * 104, rate: 20 },
                                { limit: 150000 * 104, rate: 40 },
                                { limit: Infinity, rate: 45 }
                            ];
                        }
                    };
                    if (ukYearHandlers[year]) ukYearHandlers[year]();
                    break;

                }
                case "Australia": {
                    const auYearHandlers = {
                        2025: () => {
                            brackets = [
                                { limit: 18200 * 54, rate: 0 },
                                { limit: 45000 * 54, rate: 16 },
                                { limit: 135000 * 54, rate: 30 },
                                { limit: 190000 * 54, rate: 37 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2024: () => {
                            brackets = [
                                { limit: 18200 * 54, rate: 0 },
                                { limit: 45000 * 54, rate: 19 },
                                { limit: 120000 * 54, rate: 32.5 },
                                { limit: 180000 * 54, rate: 37 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2023: () => auYearHandlers[2024](),
                        2022: () => auYearHandlers[2024](),
                        2021: () => auYearHandlers[2024](),
                        2020: () => auYearHandlers[2024](),
                        2019: () => {
                            brackets = [
                                { limit: 18200 * 54, rate: 0 },
                                { limit: 37000 * 54, rate: 19 },
                                { limit: 90000 * 54, rate: 32.5 },
                                { limit: 180000 * 54, rate: 37 },
                                { limit: Infinity, rate: 45 }
                            ];
                        },
                        2018: () => auYearHandlers[2019](),
                        2017: () => auYearHandlers[2019](),
                        2016: () => auYearHandlers[2019](),
                        2015: () => {
                            brackets = [
                                { limit: 18200 * 54, rate: 0 },
                                { limit: 37000 * 54, rate: 19 },
                                { limit: 80000 * 54, rate: 32.5 },
                                { limit: 180000 * 54, rate: 37 },
                                { limit: Infinity, rate: 45 }
                            ];
                        }
                    };
                    if (auYearHandlers[year]) auYearHandlers[year]();
                    break;
                }
            }


            //tax calculation
            let remaining = newIncome;
            let prevLimit = 0;
            let total = 0;

            //storing range,amount of tax paid and rate in the array
            const breakdown = [];

            for (let { limit, rate } of brackets) {
                const taxable = Math.min(remaining, limit - prevLimit);
                if (taxable > 0) {
                    const tax = taxable * rate / 100;
                    breakdown.push({ range: `${prevLimit} - ${limit}`, amount: tax, taxableIncome: limit, rate });
                    total += tax;
                    remaining -= taxable;
                    prevLimit = limit;
                }
            }

            //updating the values of all states
            setTaxBreakdown(breakdown);
            setTotalTax(total);
            setAfterTaxIncome(newIncome - total)
            setEffectiveTaxRate((total * 100 / newIncome).toFixed(2))


        } else {
            setIncome(newIncome);
            setTaxBreakdown([]);
            setTotalTax(0);
        }

    }

    return (
        <TaxContext.Provider value={{
            income,
            taxBreakdown,
            totalTax,
            calculateTax,
            effectiveTaxRate,
            afterTaxIncome
        }}>
            {children}
        </TaxContext.Provider>
    );
}

export default TaxProvider