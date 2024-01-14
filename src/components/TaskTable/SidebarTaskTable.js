import { getEmployeeList, getTaskDetail, postAssignerEmpSubmitTask } from "@/services/businessLogic";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { useEffect, useState } from "react";
import TaskTabs from "../TaskTabs/TaskTabs";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";
import { useUser } from "@/context/UserContext";

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
    id: "id",
    label: "View",
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

const buttonStyles = {
  width: "fit-content",
  margin: "auto",
  padding: "5px 10px",
  cursor: "pointer",
};

export default function SidebarTaskTable() {
  // const userRole = "admin";
  const { userRole, setUserRole } = useUser();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [count, setCount] = useState(0);
  const [statusID, setStatusID] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [assignedUserId, setAssignedUserId] = useState(0);
  const [createdUserId, setCreatedUserId] = useState(0);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [filter, setFilter] = useState("");
  const [cusSearch, setCusSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  const fetchData = async () => {
    const res = await getEmployeeList(
      `Page=${page + 1}&PageSize=${rowsPerPage}`
    );
    if (res) {
      setCount(res.count);
      setTasks(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, rowsPerPage]);

  const handleAssignerSubmit = async (e, button) => {
    const formData = new FormData();
    let res;
    if (button === "approve") {
      formData.append("assignerTaskId", task.taskCreatedEmp.createdById);
      formData.append("assignerStatus", task.taskCreatedEmp.assignerStatus);
      res = await postAssignerEmpSubmitTask(formData);
    } else if (button === "reject") {
      formData.append("assignTaskId", task.id);
      formData.append("assignerTaskId", task.taskCreatedEmp.createdById);
      formData.append("assignerStatus", task.taskCreatedEmp.assignerStatus);
      formData.append("assignerTaskId", task.taskCreatedEmp.assignerStatus);
      formData.append("assignerTaskId", task.taskCreatedEmp.assignerStatus);
      res = await postAssignerEmpSubmitTask(formData);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [rejectStatus, setRejectStatus] = useState("");
  const [terminateMessage, setTerminateMessage] = useState("");

  const handleChange = (e) => {
    setRejectStatus(e.target.value);
  };

  const handleApproveTask = async (taskId) => {
    const response = await getTaskDetail(taskId);
    setTask(response.tasks);
    console.log('From Me: ',response);
    const formData = new FormData();
    const res = await postAssignerEmpSubmitTask()
  };
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
                <SwipeableTemporaryDrawer
                  userRole={userRole}
                  buttons={["Add Task"]}
                />
                {userRole === "admin" && (
                  <SwipeableTemporaryDrawer
                    userRole={userRole}
                    buttons={["Add Category"]}
                  />
                )}
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
            {tasks.length >= 1 &&
              tasks.map((task) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={task.code}>
                    {columns.map((column, i) => {
                      const value = task[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {i !== columns.length - 1 ? (
                            <>
                              {column.id === "id" ? (
                                <Link
                                  href={`/${userRole}/tasks-coins-management/${task.id}`}
                                >
                                  <VisibilityIcon />
                                </Link>
                              ) : (
                                value
                              )}
                            </>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                              }}
                            >
                              {task.createdBy ? (
                                <>
                                  <Button
                                    onClick={async (e) => {
                                      const res = await getTaskDetail(task.id);
                                      setTask(res.tasks);
                                    }}
                                    style={{ ...buttonStyles }}
                                  >
                                    <SwipeableTemporaryDrawer
                                      userRole={userRole}
                                      buttons={["Edit"]}
                                      task={task && task}
                                    />
                                  </Button>
                                  <Button
                                    style={{ ...buttonStyles }}
                                    onClick={() => handleApproveTask(task.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    style={{ ...buttonStyles }}
                                    onClick={handleOpen}
                                  >
                                    Reject
                                  </Button>
                                  <div>
                                    <Modal
                                      open={open}
                                      onClose={handleClose}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                    >
                                      <Box sx={style}>
                                        <FormControl fullWidth>
                                          <InputLabel id="demo-simple-select-label">
                                            Choose Reject Status
                                          </InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={rejectStatus}
                                            label="Choose Reject Status"
                                            onChange={handleChange}
                                          >
                                            <MenuItem value="revise">
                                              Revise
                                            </MenuItem>
                                            <MenuItem value="terminate">
                                              Terminate
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
                                        {rejectStatus === "terminate" && (
                                          <TextField
                                            id="outlined-basic"
                                            label="Message"
                                            variant="outlined"
                                            value={terminateMessage}
                                            onChange={(e) =>
                                              setTerminateMessage(
                                                e.target.value
                                              )
                                            }
                                          />
                                        )}
                                        <Button variant="contained">
                                          Submit
                                        </Button>
                                      </Box>
                                    </Modal>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Button
                                    style={{ ...buttonStyles }}
                                    onClick={handleAssignerSubmit}
                                  >
                                    Accept
                                  </Button>
                                  <Button style={{ ...buttonStyles }}>
                                    Object
                                  </Button>
                                  <Button style={{ ...buttonStyles }}>
                                    Submit
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
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
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
