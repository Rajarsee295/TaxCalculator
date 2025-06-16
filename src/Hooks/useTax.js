import { useContext } from "react";
import { TaxContext } from "../Context/TaxContext";

//returning useTax
export const useTax = () => useContext(TaxContext);