import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, TextField, Box } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import CustomPagination from "../Components/CustomPagination";

const initialRows = [
  {
    id: 1,
    Brand: " RCW 750 ML",
    OB: 30,
    PROD: 95796767,
    DESP: 353543,
    CB: 45756756,
  },
  {
    id: 2,
    Brand: " RCW 750 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 3,
    Brand: "MRW 750 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 4,
    Brand: "MRW 350 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 5,
    Brand: "MRW 180 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 6,
    Brand: "MRW 2L",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 7,
    Brand: "RCW 750 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 8,
    Brand: "RCW 180 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 9,
    Brand: "RCW 375 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 10,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 11,
    Brand: "SRW 750 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 12,
    Brand: "SRW 375 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 13,
    Brand: "SRW 500 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 14,
    Brand: "SRW 2 L",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 15,
    Brand: "RCAP 750 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 16,
    Brand: "RCAP 350 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 17,
    Brand: "RCAP 400 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 18,
    Brand: "RCAP 500 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 19,
    Brand: "RCAP 1 L",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 20,
    Brand: "RCAP 5L",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 21,
    Brand: "NO 1 CB RUM 750 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 22,
    Brand: "NO 1 CB RUM 1000 ML",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 23,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 24,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 25,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 26,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 27,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 28,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 29,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
  {
    id: 30,
    Brand: "Royal Stag",
    OB: 304534,
    PROD: "j434344",
    DESP: 3535434343,
    CB: 457567563434,
  },
];

export default function CrudDataTable() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setPaginationModel((prev) => {
        const nextPage = prev.page + 1; // Go to the next page
        const totalPages = Math.ceil(rows.length / prev.pageSize);
        return { ...prev, page: nextPage >= totalPages ? 0 : nextPage }; // Reset to first page if at the end
      });
    }, 30000); // 30 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "header-id",
    },
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
      headerClassName: "header-prod",
      renderCell: (params) => (
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

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
        marginRight={2}
      >
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "30%", marginLeft: "2%" }}
          InputProps={{
            style: {
              height: "45px",
              padding: "4px 8px",
            },
          }}
        />

        <Button
          startIcon={<Add />}
          onClick={handleAdd}
          variant="contained"
          color="primary"
        >
          Add New
        </Button>
      </Box>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          pagination
          slots={{
            pagination: CustomPagination,
          }}
          sx={{
            "& .header-id": { backgroundColor: "#e0f7fa", color: "#000" },
            "& .header-brand": { backgroundColor: "#faf9cf", color: "#000" },
            "& .header-ob": { backgroundColor: "#c8e6c9", color: "#000" },
            "& .header-prod": { backgroundColor: "#d9f5fc", color: "#000" },
            "& .header-desp": { backgroundColor: "#f3ebf7", color: "#000" },
            "& .header-cb": { backgroundColor: "#ffe4cf", color: "#000" },
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

          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}
