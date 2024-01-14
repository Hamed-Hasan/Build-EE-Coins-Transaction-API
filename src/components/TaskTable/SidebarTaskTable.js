import {
  getEmployeeList,
  postAssignedEmpApproveTask,
  postAssignedEmpObjectTask,
  postAssignedEmpSubmitTask,
  postAssignerEmpObjectTask,
  postAssignerEmpSubmitTask,
  postManagerUpdateTaskCoin,
} from "@/services/businessLogic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import TaskTabs from "../TaskTabs/TaskTabs";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

const statusArray = ["Terminated", "Times Out", "Finished", "Finished On Time"];

const buttonStyles = {
  width: "fit-content",
  margin: "auto",
  padding: "5px 10px",
  cursor: "pointer",
};

export default function SidebarTaskTable() {
  const username = "Sayed Imam";
  const userRole = "user";
  const [file, setFile] = useState({});
  const [objectReason, setObjectReason] = useState("");
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
  const [terminateReason, setTerminateReason] = useState("");

  const handleChangeRejectStatus = (e) => {
    setRejectStatus(e.target.value);
  };

  const handleUpdateTaskCoins = async (taskId, taskCoin) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("taskCoin ", taskCoin);
    const res = await postManagerUpdateTaskCoin(formData);
    console.log(res);
  };

  const handleAssignerSubmit = async (taskId) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("assignerStatus", "Approved");
    const res = await postAssignerEmpSubmitTask(formData);
    console.log(res);
  };

  const handleAssignerReject = async (taskId, assignerTaskId) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("assignerTaskId", assignerTaskId);
    formData.append("terminateReason", terminateReason);
    formData.append("assignerStatus", rejectStatus);
    const res = await postAssignerEmpObjectTask(formData);
    console.log(res);
  };

  const handleAcceptTask = async (assignTaskId) => {
    const formData = new FormData();
    formData.append("assignTaskId", assignTaskId);
    formData.append("isAccepted", true);
    const res = await postAssignedEmpApproveTask(formData);
    console.log(res);
  };

  const handleSubmitTask = async (assignTaskId, assignerTaskId, file) => {
    const formData = new FormData();
    formData.append("assignTaskId", assignTaskId);
    formData.append("assignerTaskId", assignerTaskId);
    formData.append("isAssignedEmpSubmit", true);
    formData.append("uploadFile", file);
    const res = await postAssignedEmpSubmitTask(formData);
    console.log(res);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  const handleObjectTask = async (assignTaskId) => {
    const formData = new FormData();
    formData.append("assignTaskId", assignTaskId);
    formData.append("objectReason", objectReason);
    formData.append("isObjected", true);
    const res = await postAssignedEmpObjectTask(formData);
    console.log(res);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  console.log(open);
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
                <SwipeableTemporaryDrawer buttons={["Add Task"]} />
                {userRole === "admin" && (
                  <SwipeableTemporaryDrawer buttons={["Add Category"]} />
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
                              {!statusArray.includes(task.status) &&
                              task.createdBy === username ? (
                                <>
                                  {!task.isAccepted && (
                                    <Button style={{ ...buttonStyles }}>
                                      <SwipeableTemporaryDrawer
                                        buttons={["Edit"]}
                                        task={task && task}
                                      />
                                    </Button>
                                  )}
                                  <>
                                    {task.isAccepted && (
                                      <>
                                        <Button
                                          style={{ ...buttonStyles }}
                                          onClick={() =>
                                            handleAssignerSubmit(task.id)
                                          }
                                        >
                                          Approve
                                        </Button>
                                        <Button
                                          style={{ ...buttonStyles }}
                                          onClick={handleOpen}
                                        >
                                          Reject
                                        </Button>
                                      </>
                                    )}
                                  </>
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
                                            onChange={handleChangeRejectStatus}
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
                                            label="Reason"
                                            variant="outlined"
                                            value={terminateReason}
                                            onChange={(e) =>
                                              setTerminateReason(e.target.value)
                                            }
                                          />
                                        )}
                                        <Button
                                          variant="contained"
                                          onClick={() =>
                                            handleAssignerReject(
                                              task.id,
                                              task.id
                                            )
                                          }
                                        >
                                          Submit
                                        </Button>
                                      </Box>
                                    </Modal>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {!task.isAccepted &&
                                  !statusArray.includes(task.status) ? (
                                    <Button
                                      style={{ ...buttonStyles }}
                                      onClick={() => handleAcceptTask(task.id)}
                                    >
                                      Accept
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                  {(!task.isObjected || !task.isAccepted) &&
                                  !task.isAccepted &&
                                  !statusArray.includes(task.status) ? (
                                    <Button
                                      style={{ ...buttonStyles }}
                                      onClick={handleOpen}
                                    >
                                      Object
                                      <div>
                                        <Modal
                                          open={open}
                                          onClose={handleClose}
                                          aria-labelledby="modal-modal-title"
                                          aria-describedby="modal-modal-description"
                                        >
                                          <Box sx={style}>
                                            <TextField
                                              id="outlined-basic"
                                              variant="outlined"
                                              label="Object Reason"
                                              value={objectReason}
                                              onChange={(e) =>
                                                setObjectReason(e.target.value)
                                              }
                                            />
                                            <Button
                                              onClick={() => {
                                                handleObjectTask(task.id);
                                              }}
                                            >
                                              Send
                                            </Button>
                                          </Box>
                                        </Modal>
                                      </div>
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                  {task.isAccepted &&
                                  !task.isAssignedEmpSubmit &&
                                  !statusArray.includes(task.status) ? (
                                    <Button
                                      style={{ ...buttonStyles }}
                                      onClick={handleOpen}
                                    >
                                      Submit
                                      <div>
                                        <Modal
                                          open={open}
                                          onClose={handleClose}
                                          aria-labelledby="modal-modal-title"
                                          aria-describedby="modal-modal-description"
                                        >
                                          <Box sx={style}>
                                            <Button
                                              component="label"
                                              variant="contained"
                                              startIcon={<CloudUploadIcon />}
                                            >
                                              Upload file
                                              <VisuallyHiddenInput
                                                type="file"
                                                onChange={(e) => {
                                                  setFile(e.target.files[0]);
                                                }}
                                              />
                                            </Button>
                                            {file.name && file.name}
                                            <Button
                                              onClick={() => {
                                                handleSubmitTask(
                                                  task.id,
                                                  task.id,
                                                  "file"
                                                );
                                                return handleClose();
                                              }}
                                            >
                                              Send
                                            </Button>
                                          </Box>
                                        </Modal>
                                      </div>
                                    </Button>
                                  ) : (
                                    ""
                                  )}
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
