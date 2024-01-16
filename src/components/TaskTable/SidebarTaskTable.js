import {
  getAdminList,
  getEmployeeList,
  postAssignedEmpApproveTask,
  postAssignedEmpObjectTask,
  postAssignedEmpSubmitTask,
  postAssignerEmpObjectTask,
  postAssignerEmpSubmitTask,
  postManagerUpdateTaskCoin,
} from "@/services/businessLogic";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
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
import ReusableModal from "../AlertDialogSlide/ReusableModal";
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

const statusArray = [
  "Terminated",
  "Times Out",
  "Finished",
  "Finished On Time",
  "Finished Late",
];

const buttonStyles = {
  width: "fit-content",
  margin: "auto",
  padding: "5px 10px",
  cursor: "pointer",
};

export default function SidebarTaskTable({ userRole }) {
  const username = "Sayed Imam";
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusID, setStatusID] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [createdUserId, setCreatedUserId] = useState("");
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [filter, setFilter] = useState("");
  const [cusSearch, setCusSearch] = useState("");
  const [rejectStatus, setRejectStatus] = useState("Revise");
  const [terminateReason, setTerminateReason] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [currentSubmitHandler, setCurrentSubmitHandler] = useState(null);
  const [objectReason, setObjectReason] = useState("");
  const [fileData, setFileData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  const fetchData = async () => {
    let url = `Page=${page + 1}&PageSize=${rowsPerPage}&StartDate=${
      startDate && startDate
    }&DueDate=${
      dueDate && dueDate
    }&AssignedUserId=${assignedUserId}&CreatedUserId=${createdUserId}&OrderBy=${orderBy}&Filter=${filter}&cusSearch=${cusSearch}`;
    let res;
    if (userRole !== "admin") {
      res = await getEmployeeList(url);
    } else {
      res = await getAdminList(url);
    }
    if (res) {
      setCount(res.count);
      setTasks(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, rowsPerPage]);

  const handleClose = () => {
    setModalOpen(false);
    setCurrentSubmitHandler(null);
    setFileData(null);
    setObjectReason("");
    setRejectStatus("Revise");
    setTerminateReason("");
  };

  const handleAcceptTask = async (assignTaskId) => {
    const formData = new FormData();
    formData.append("assignTaskId", assignTaskId);
    formData.append("isAccepted", true);
    const res = await postAssignedEmpApproveTask(formData);
    console.log(res);
    fetchData();
  };

  const handleObjectTask = async (assignTaskId) => {
    const formData = new FormData();
    formData.append("assignTaskId", assignTaskId);
    formData.append("objectReason", objectReason);
    formData.append("isObjected", true);
    console.log(formData.get("objectReason"));
    const res = await postAssignedEmpObjectTask(formData);
    console.log(res);
    setTimeout(() => {
      handleClose();
    }, 1000);
    fetchData();
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
    fetchData();
  };

  const handleAssignerSubmit = async (taskId) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("assignerStatus", "Approved");
    const res = await postAssignerEmpSubmitTask(formData);
    console.log(res);
    fetchData();
  };

  const handleAssignerReject = async (taskId, assignerTaskId) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("assignerTaskId", assignerTaskId);
    formData.append("assignerStatus", rejectStatus);
    formData.append("terminateReason", terminateReason);
    const res = await postAssignerEmpObjectTask(formData);
    console.log(res);
    setTimeout(() => {
      handleClose();
    }, 1000);
    fetchData();
  };

  const handleManagerUpdateTaskCoin = async (taskId, taskCoin) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("taskCoin", taskCoin);
    const res = await postManagerUpdateTaskCoin(formData);
    console.log(res);
    setTimeout(() => {
      handleClose();
    }, 1000);
    fetchData();
  };

  console.log(tasks);

  const handleModalOpen = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentSubmitHandler(null);
  };

  const handleButtonClick = (buttonType, task) => {
    switch (buttonType) {
      case "Approve":
        setCurrentSubmitHandler(
          () => () => handleManagerUpdateTaskCoin(task?.id)
        );
        handleModalOpen(
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="coins"
              label="Update Coins"
              type="number"
              fullWidth
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
            />
          </div>,
          "Approve Task"
        );
        break;
      case "Submit":
        setCurrentSubmitHandler(
          () => () => handleSubmitTask(task?.id, task?.id, fileData)
        );
        handleModalOpen(
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="file"
              label="Upload File"
              type="file"
              fullWidth
              value={fileData}
              onChange={(e) => setFileData(e.target.files[0])}
            />
          </div>,
          "Submit Task"
        );
        break;
      case "Object":
        setCurrentSubmitHandler(() => () => handleObjectTask(task?.id));
        handleModalOpen(
          <TextField
            autoFocus
            margin="dense"
            id="object"
            label="Object Reason"
            type="text"
            fullWidth
            value={objectReason}
            onChange={(e) => setObjectReason(e.target.value)}
          />,
          "Object Task"
        );
        break;
      case "Reject":
        setCurrentSubmitHandler(
          () => () => handleAssignerReject(task.id, task.id)
        );
        handleModalOpen(<RejectModalContent />, "Reject Task");
        break;
      default:
        return null;
    }
  };

  const RejectModalContent = () => {
    const [action, setAction] = useState("Revise");
    const [showTextArea, setShowTextArea] = useState(false);

    const handleSelectChange = (e) => {
      const selectedAction = e.target.value;
      setAction(selectedAction);
      setRejectStatus(selectedAction);
      setShowTextArea(selectedAction === "Terminate");
    };

    return (
      <div>
        <FormControl fullWidth margin="normal">
          <InputLabel id="reject-action-label">Action</InputLabel>
          <Select
            labelId="reject-action-label"
            id="reject-action"
            value={action}
            label="Action"
            onChange={(e) => handleSelectChange(e)}
          >
            <MenuItem value="Revise">Revise</MenuItem>
            <MenuItem value="Terminate">Terminate</MenuItem>
          </Select>
        </FormControl>
        {showTextArea && (
          <TextField
            autoFocus
            margin="dense"
            id="terminateReason"
            label="Termination Reason"
            placeholder="Please Write Your Reason!"
            type="text"
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setTerminateReason(e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <ReusableModal
        open={modalOpen}
        handleClose={handleModalClose}
        handleOk={currentSubmitHandler}
        title={modalTitle}
        content={modalContent}
      />
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
                              task.createdBy ? (
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
                                    {task.isAccepted &&
                                    task.isAssignedEmpSubmit ? (
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
                                          onClick={() =>
                                            handleButtonClick("Reject", task)
                                          }
                                        >
                                          Reject
                                        </Button>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </>
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
                                      onClick={() =>
                                        handleButtonClick("Object", task)
                                      }
                                    >
                                      Object
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                  {task.isAccepted &&
                                  !task.isAssignedEmpSubmit &&
                                  !statusArray.includes(task.status) ? (
                                    <Button
                                      style={{ ...buttonStyles }}
                                      onClick={() => {
                                        console.log(task);
                                        handleButtonClick("Submit", task);
                                      }}
                                    >
                                      Submit
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
