import React, { useState, useEffect } from 'react';
import CustomDataGrid from '../Components/CustomDatagrid'; // Import your CustomDataGrid component
import { Button, Modal, TextField, Box } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

function Tabletwo() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rows, setRows] = useState(() =>{
    const storedData = localStorage.getItem('productQuantities');
  
      return storedData? JSON.parse(storedData):'';
    
    
  });

  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({
    id: '',
    brand: '',
    '750ML': '',
    '375ML': '',
    '180ML': '',
    '2LTR': '',
  });

  const columns = [
    { field: 'brand', headerName: 'BRAND', width: 200 },
    { field: '750ML', headerName: '750ML', width: 150 },
    { field: '375ML', headerName: '375ML', width: 150 },
    { field: '180ML', headerName: '180ML', width: 150 },
    { field: '2LTR', headerName: '2LTR', width: 150 },
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

  // Load data from localStorage on component mount
  useEffect(() => {
   
  }, []);

  // Save data to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem('productQuantities', JSON.stringify(rows));
  }, [rows]);

  const handleAdd = () => {
    setNewRow({
      id: Date.now(), // Unique ID for each row
      brand: '',
      '750ML': '',
      '375ML': '',
      '180ML': '',
      '2LTR': '',
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
      <h1>Product Quantities Table</h1>
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
            label="Brand"
            value={newRow.brand}
            onChange={(e) => setNewRow({ ...newRow, brand: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="750ML"
            type="number"
            value={newRow['750ML']}
            onChange={(e) =>
              setNewRow({ ...newRow, '750ML': e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="375ML"
            type="number"
            value={newRow['375ML']}
            onChange={(e) =>
              setNewRow({ ...newRow, '375ML': e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="180ML"
            type="number"
            value={newRow['180ML']}
            onChange={(e) =>
              setNewRow({ ...newRow, '180ML': e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="2LTR"
            type="number"
            value={newRow['2LTR']}
            onChange={(e) =>
              setNewRow({ ...newRow, '2LTR': e.target.value })
            }
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

export default Tabletwo;
