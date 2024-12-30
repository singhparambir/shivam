import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrudDataTable from "./Pages/Table";
import Navbar from "./Components/Navbar";
import CrudDataTabletwo from "./Pages/Tabletwo";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CrudDataTable />} />
        <Route path="/two" element={<CrudDataTabletwo />} />

    
      </Routes>
    </Router>
  );
}

export default App;
