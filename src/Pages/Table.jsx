import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Modal,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomPagination from "../Components/CustomPagination";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom"; 

const statesList = ["Punjab", "Haryana", "Himachal", "Rajasthan", "Chandigarh"];

export default function CrudDataTable() {
  // Load rows from localStorage or use initialRows if none found
  const storedData = localStorage.getItem("tableData");
  const initialRows = storedData ? JSON.parse(storedData) : [
    {
      id: 1,
      Brand: "RCW 750 ML",
      OB: 30,
      PROD: 95796767,
      DESP: 353543,
      CB: 45756756,
    },
  ];

  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
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
  const [selectedState, setSelectedState] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate(); 

  const handlePageChange = (page) => {
    navigate(`/page${page}`); 
  };

  // Save rows to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(rows));
  }, [rows]);

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
    const totalOB = rows.reduce((acc, row) => acc + Number(row.OB || 0), 0);
    const totalPROD = rows.reduce((acc, row) => acc + Number(row.PROD || 0), 0);
    const totalDESP = rows.reduce((acc, row) => acc + Number(row.DESP || 0), 0);
    const totalCB = rows.reduce((acc, row) => acc + Number(row.CB || 0), 0);

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
    { field: "id", headerName: "ID", width: 50, headerClassName: "header-id" },
    {
      field: "Brand",
      headerName: "Brand",
      width: 300,
      headerClassName: "header-brand",
    },
    {
      field: "OB",
      headerName: "OB",
      width: 270,
      headerClassName: "header-ob",
    },
    {
      field: "PROD",
      headerName: "PROD",
      width: 270,
      headerClassName: "header-prod",
    },
    {
      field: "DESP",
      headerName: "DESP",
      width: 270,
      headerClassName: "header-desp",
    },
    {
      field: "CB",
      headerName: "CB",
      width: 270,
      headerClassName: "header-cb",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      headerClassName: "header-actions",
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

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const rowsWithTotal = [...filteredRows, calculateTotal()];

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
          <Button
            startIcon={<Add />}
            onClick={handleAdd}
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
          >
            Add New
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleExportToExcel}
          >
            Export to Excel
          </Button>
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
      </Box>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rowsWithTotal}
          columns={columns}
          pageSize={10}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          pagination
          slots={{
            pagination: CustomPagination,
          }}
          getRowClassName={(params) => {
            return params.row.id === "Total" ? "total-row" : ''; 
          }}
        />
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
