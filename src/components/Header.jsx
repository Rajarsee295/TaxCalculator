import { Calculator,Sun,Moon } from "lucide-react";
import { useState } from "react";


//header of the page
const Header = () => {

  //set theme of the page
   const[theme,setTheme]=useState("light");
    
   //change theme of the page
   const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const newTheme = theme=="light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
    
   return(
     <>
       <div className="flex items-center justify-center pt-[25px] ">
          <div className=" flex w-1/4 justify-center items-start pl-[10px] pt-[10px] md:justify-end md:pl-[10px]">
            <Calculator size={48} className="text-gray-800 dark:text-gray-300"/>
          </div>
          <div className="w-3/4 text-[7vw] text-gray-800 font-bold flex justify-end items-center pl-[50px] dark:text-gray-300 md:pl-[20px] md:text-[35px] md:justify-start md:w-1/2 md:pl-[0px]">
            Income Tax Calculator
          </div>
          <div className="flex justify-center items-center">
             <button
               onClick={()=>{toggleTheme()}}
               className="p-2 rounded-full transition bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:scale-110"
             >
              {/* changes theme on click */}
                {theme === "dark" ? <Sun className="w-10 h-10 md:w-5 md:h-5" /> : <Moon className="w-10 h-10 md:w-5 md:h-5" />}
             </button>
          </div>
       </div>
       <div className="flex text-gray-600 dark:text-gray-100 items-center justify-center text-[4vw] p-[50px] pb-[0px] md:text-[17px] md:pt-[20px]">Enter your annual income to see a detailed breakdown of your tax liability</div>
     </>
   );
}

export default Header;