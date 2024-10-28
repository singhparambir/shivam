import { useState } from "react";
import CrudDataTable from "./Pages/Table";
import Navbar from "./Components/Navbar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <CrudDataTable />
    </>
  );
}

export default App;
