import React, { useState, useEffect } from 'react';
import CustomDataGrid from '../Components/CustomDatagrid'; // Import your CustomDataGrid component
import { Button, Modal, TextField, Box } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

function Tablefour() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rows, setRows] = useState(() => {
    const storedData = localStorage.getItem('tablefour');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({
    id: '',
    time: '',
    lineno: '',
    brand: '',
    state: '',
    batchno: '',
    sku: '',
    qtyInClass: '',
    remarks: '',
  });

  const columns = [
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'lineno', headerName: 'Line No', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'batchno', headerName: 'Batch No', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'qtyInClass', headerName: 'QTY in Class', width: 150 },
    { field: 'remarks', headerName: 'Remarks', width: 200 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
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

  // Save data to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem('tablefour', JSON.stringify(rows));
  }, [rows]);

  const handleAdd = () => {
    setNewRow({
      id: Date.now(), // Unique ID for each row
      time: '',
      lineno: '',
      brand: '',
      state: '',
      batchno: '',
      sku: '',
      qtyInClass: '',
      remarks: '',
    });
    setEditingRow(null);
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setNewRow(row);
    setEditingRow(row);
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

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div>
      <h1>Production Schedule</h1>
      <Button
        startIcon={<Add />}
        onClick={handleAdd}
        variant="contained"
        color="primary"
        style={{ marginBottom: '10px' }}
      >
        Add New
      </Button>

      <div style={{ height: 400, width: '100%' }}>
        <CustomDataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            p: 3,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '10%',
            width: 400,
          }}
        >
          <h2>{editingRow ? 'Edit Data' : 'Add Data'}</h2>
          <TextField
            fullWidth
            label="Time"
            value={newRow.time}
            onChange={(e) => setNewRow({ ...newRow, time: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Line No"
            value={newRow.lineno}
            onChange={(e) => setNewRow({ ...newRow, lineno: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Brand"
            value={newRow.brand}
            onChange={(e) => setNewRow({ ...newRow, brand: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="State"
            value={newRow.state}
            onChange={(e) => setNewRow({ ...newRow, state: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Batch No"
            value={newRow.batchno}
            onChange={(e) => setNewRow({ ...newRow, batchno: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="SKU"
            value={newRow.sku}
            onChange={(e) => setNewRow({ ...newRow, sku: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="QTY in Class"
            value={newRow.qtyInClass}
            onChange={(e) => setNewRow({ ...newRow, qtyInClass: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Remarks"
            value={newRow.remarks}
            onChange={(e) => setNewRow({ ...newRow, remarks: e.target.value })}
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
    </div>
  );
}

export default Tablefour;
