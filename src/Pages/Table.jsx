import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as XLSX from "xlsx";
import CustomDataGrid from "../Components/CustomDatagrid"; // Import the CustomDataGrid component
import { useNavigate } from "react-router-dom";

const statesList = ["Punjab", "Haryana", "Himachal", "Rajasthan", "Chandigarh"];

export default function CrudDataTable() {
  // Load rows from localStorage or use initialRows if none found
 

 

 const [city,setCity] = useState("");
  const [rows, setRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  let [filteredRows,setFilteredRows]= useState([])
  const [countdown, setCountdown] = useState(5); // Timer countdown in seconds
const navigate = useNavigate();

   // Save rows to localStorage whenever rows change
   useEffect(() => {
    localStorage.setItem(`${selectedState}`, JSON.stringify(rows));
  }, [rows]);
  useEffect(() => {
    console.log("hihih");
    
    const storedData = localStorage.getItem(`${selectedState}`);
    setRows( storedData ? JSON.parse(storedData) : [
 
    ]);

 }, [selectedState]); 
  
  const [newRow, setNewRow] = useState({
    id: "",
    Brand: "",
    OB: "",
    PROD: "",
    DESP: "",
    CB: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
 
 

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    setEditingRow(row);
    setNewRow(row);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setNewRow({
      id: rows.length + 1,
      Brand: "",
      OB: "",
      PROD: "",
      DESP: "",
      CB: "",
    });
    setEditingRow(null);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (editingRow) {
      setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    } else {
      setRows([...rows, newRow]);
    }
    setOpenModal(false);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "DataEntry.xlsx");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const calculateTotal = () => {
    // console.log(rows,"hello rows");
    const totalOB = rows?.reduce((acc, row) => acc + Number(row.OB || 0), 0);
    const totalPROD = rows?.reduce((acc, row) => acc + Number(row.PROD || 0), 0);
    const totalDESP = rows?.reduce((acc, row) => acc + Number(row.DESP || 0), 0);
    const totalCB = rows?.reduce((acc, row) => acc + Number(row.CB || 0), 0);
    // console.log(rows,"hello rows");
    const totalOB = rows?.reduce((acc, row) => acc + Number(row.OB || 0), 0);
    const totalPROD = rows?.reduce((acc, row) => acc + Number(row.PROD || 0), 0);
    const totalDESP = rows?.reduce((acc, row) => acc + Number(row.DESP || 0), 0);
    const totalCB = rows?.reduce((acc, row) => acc + Number(row.CB || 0), 0);

    return {
      id: "Total",
      Brand: "Total",
      OB: totalOB,
      PROD: totalPROD,
      DESP: totalDESP,
      CB: totalCB,
    };
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "Brand", headerName: "Brand", width: 300 },
    { field: "OB", headerName: "OB", width: 270 },
    { field: "PROD", headerName: "PROD", width: 270 },
    { field: "DESP", headerName: "DESP", width: 270 },
    { field: "CB", headerName: "CB", width: 270 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) =>
        params.row.id !== "Total" && (
          <>
            <Button startIcon={<Edit />} onClick={() => handleEdit(params.row)}>
              Edit
            </Button>
            <Button
              startIcon={<Delete />}
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </>
        ),
    },
  ];

 

  useEffect(()=>{
    setFilteredRows(rows?.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ))
  },[rows])

 

  useEffect(()=>{
    setFilteredRows(rows?.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ))
  },[rows])


  const rowsWithTotal = [...filteredRows, calculateTotal()];

  // Timer and state switching logic
  useEffect(() => {
    const stateCycle = ["Punjab", "Haryana", "Himachal", "Rajasthan", "Chandigarh"];
    let currentStateIndex = 0;

    const intervalId = setInterval(() => {
      if (countdown === 0) {
        // Switch to the next state when the countdown reaches 0
        setSelectedState(stateCycle[currentStateIndex]);
        currentStateIndex = (currentStateIndex + 1) % stateCycle.length;
        setCountdown(5); // Reset the countdown to 60 seconds
      } else {
        setCountdown((prevCountdown) => prevCountdown - 1); // Decrease the countdown
      }
    }, 1000); // 1000 ms = 1 second

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [countdown]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "20%" }}
        />
        <Select
          value={selectedState}
          onChange={handleStateChange}
          displayEmpty
          style={{ width: "20%", height: "50px" }}
        >
          <MenuItem value="" disabled>
            Select a State
          </MenuItem>
          {statesList.map((state, index) => (
            <MenuItem key={index} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} style={{ width: "20%" }} />
            )}
          />
        </LocalizationProvider>
        <div>
          {selectedState != ""?<Button
          {selectedState != ""?<Button
            startIcon={<Add />}
            onClick={handleAdd}
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            Add New
          </Button>:null}
          {selectedState != ""?<Button
          </Button>:null}
          {selectedState != ""?<Button
            variant="contained"
            color="secondary"
            onClick={handleExportToExcel}
          >
            Export to Excel
          </Button>:null}
          </Button>:null}
        </div>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={2}
      >
        {(selectedState || selectedDate) && (
          <h3
            style={{
              fontWeight: "bold",
              color: "#007BFF",
              fontSize: "40px",
              margin: 0,
              padding: "4px 0",
            }}
          >
            {selectedState}
            {selectedDate && (
              <span
                style={{
                  fontWeight: "normal",
                  color: "#007BFF",
                  marginLeft: "10px",
                }}
              >
                ({selectedDate.format("DD/MM/YYYY")})
              </span>
            )}
          </h3>
        )}
                <p style={{ fontSize: "20px" }}>Time left: {countdown} seconds</p>

      </Box>
      <div>
  <button
    onClick={() => navigate('/two')}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
F.G stock 2  </button>
  <button
    onClick={() => navigate('/three')}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
    Line Wise
  </button>
  <button
    onClick={() => navigate('/four')}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
Hourly Production  </button>
  <button
    onClick={() => setSelectedState("Rajasthan")}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
    Rajasthan
  </button>
  <button
    onClick={() => setSelectedState("Chandigarh")}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
    Chandigarh
  </button>
</div>

      <div style={{ height: 1000, width: "100%" }}>
        {selectedState != "" ?<CustomDataGrid
          rows={rowsWithTotal}
        {selectedState != "" ?<CustomDataGrid
          rows={rowsWithTotal}
          columns={columns}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />:null}
        />:null}

      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "white",
            margin: "auto",
            marginTop: "10%",
            width: 400,
          }}
        >
          
          <h2>{editingRow ? "Edit Data" : "Add Data"}</h2>
          <TextField
            fullWidth
            label="Brand"
            value={newRow.Brand}
            onChange={(e) => setNewRow({ ...newRow, Brand: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="OB"
            type="number"
            value={newRow.OB}
            onChange={(e) => setNewRow({ ...newRow, OB: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="PROD"
            type="number"
            value={newRow.PROD}
            onChange={(e) => setNewRow({ ...newRow, PROD: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="DESP"
            type="number"
            value={newRow.DESP}
            onChange={(e) => setNewRow({ ...newRow, DESP: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="CB"
            type="number"
            value={newRow.CB}
            onChange={(e) => setNewRow({ ...newRow, CB: e.target.value })}
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}