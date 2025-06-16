import Index from "./pages/index.jsx";
import TaxProvider from "./Context/TaxContext.jsx";
import './index.css'


function App() {
  return (
    <>
      <TaxProvider>
        <Index />
      </TaxProvider>
    </>
  )
}

export default App
