import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  TableRow,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getEmployeeCoins } from '@/services/businessLogic';
import ReusableModal from '@/components/AlertDialogSlide/ReusableModal';


const columns = [
  { id: 'id', label: 'ID' },
  { id: 'employeeName', label: 'Employee Name' },
  { id: 'totalCoins', label: 'Total Coins' },
  { id: 'actions', label: 'Actions' },
];

function EmployeeCoinsPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // State to keep track of the selected row data for the modal
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set your query parameters here, for example:
        const queryParams = 'sortBy=employeeId&order=asc';
        const response = await getEmployeeCoins(queryParams);
        setData(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching employee coins:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on filterText
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data, filterText]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (rowData) => {
    setSelectedRowData(rowData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRowData(null);
  };

  return (
    <div style={{ padding: '200px' }}>
      <TextField
        label="Filter"
        variant="outlined"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        fullWidth
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{`#${index + 1}`}</TableCell>
                  {columns
                    .slice(1, columns.length - 1) // Exclude Actions column
                    .map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                  <TableCell>
                  <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(row)}
                        aria-label="Add Coins"
                    >
                        <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Reusable Modal */}
      {selectedRowData && (
  <ReusableModal
    open={modalOpen}
    handleClose={handleCloseModal}
    handleOk={() => {
      // Handle your modal action here
      // Example: console.log(selectedRowData)
      handleCloseModal();
    }}
    title="Modal Title"
    content={
      <div>
        <TextField
        //   label="Specific Item Coins"
          variant="outlined"
          fullWidth
          value={selectedRowData.totalCoins} // Use the correct field from your data
          disabled
          margin="normal"
        />
        <TextField
          label="Second Field"
          variant="outlined"
          fullWidth
          // Add the value and other properties for the second field
          margin="normal"
        />
        <TextField
          label="Third Field"
          variant="outlined"
          fullWidth
          // Add the value and other properties for the third field
          margin="normal"
        />
      </div>
    }
  />
)}
    </div>
  );
}

export default EmployeeCoinsPage;
