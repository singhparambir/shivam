import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrudDataTable from "./Pages/Table";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CrudDataTable />} />
        <Route path="/page1" element={<CrudDataTable />} />
        <Route path="/page2" element={<CrudDataTable />} />
        <Route path="/page3" element={<CrudDataTable />} />
        <Route path="/page4" element={<CrudDataTable />} />
        <Route path="/page5" element={<CrudDataTable />} />
      </Routes>
    </Router>
  );
}

export default App;
