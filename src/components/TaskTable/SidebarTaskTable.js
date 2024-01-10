import { getEmployeeList } from "@/services/businessLogic";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import TaskTabs from "../TaskTabs/TaskTabs";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";

const columns = [
  { id: "title", label: "Task Name", minWidth: 170 },
  { id: "createdBy", label: "Created By", minWidth: 100 },
  {
    id: "assignedUser",
    label: "Assigned To",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "startTime",
    label: "Start Time",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "dueTime",
    label: "Due Time",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "totalCoins",
    label: "Coins",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function SidebarTaskTable() {
  const [tasks, setTasks] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // Assuming you have a way to get the current user's role
  const userRole = "admin";
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getEmployeeList();
      if (res) {
        setTasks(res);
      }
    };
    fetchData();
  }, []);
  console.log(tasks);

  return (
    <Paper sx={{ width: "100%" }}>
      <TaskTabs />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Paper
                  component="form"
                  sx={{ display: "flex", alignItems: "center", width: 250 }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search..."
                    inputProps={{ "aria-label": "search" }}
                    // value={searchTerm}
                    // onChange={handleInputChange}
                    // onKeyDown={handleKeyDown}
                  />
                  <IconButton sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </TableCell>

              <TableCell align="center" colSpan={3} sx={{ padding: "0px" }}>
                <SwipeableTemporaryDrawer userRole={userRole} />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.data?.length >= 1 &&
              tasks.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={task.code}
                    >
                      {columns.map((column) => {
                        const value = task[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tasks.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
