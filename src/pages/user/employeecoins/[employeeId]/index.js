// pages/user/employeecoins/[employeeId].js

import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import { getAdminCoinsTransactionsList } from '@/services/businessLogic';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'employeeName', label: 'Employee Name' },
  { id: 'beforeTotalCoins', label: 'Before Total Coins' },
  { id: 'typeName', label: 'Type Name' },
  { id: 'typeAmount', label: 'Type Amount' },
  { id: 'afterTotalCoins', label: 'After Total Coins' },
  { id: 'createdAt', label: 'Created At' },
];

function EmployeeDetails() {
  const router = useRouter();
  const { employeeId } = router.query;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (employeeId) {
      // Fetch employee details based on the employeeId
      const queryParams = `EmployeeId=${employeeId}`;
      getAdminCoinsTransactionsList(queryParams)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employee details:', error);
        });
    }
  }, [employeeId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
// Function to format the createdAt date to "YYYY-MM-DD"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  return (
    <div style={{ padding: '50px 200px' }}>
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
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'id' ? `#${row[column.id]}` : column.id === 'createdAt' ? formatDate(row[column.id]) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default EmployeeDetails;
