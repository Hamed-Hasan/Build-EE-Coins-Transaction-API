import { username, userRole } from "@/constant";
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
import { Button, IconButton, InputBase } from "@mui/material";
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
import ObjectTaskModal from "../Modales/ObjectTaskModal";
import RejectTaskModal from "../Modales/RejectTaskModal";
import SubmitTaskModal from "../Modales/SubmitTaskModal";
import UpdateTaskCoinsModal from "../Modales/UpdateTaskCoinsModal";
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

export default function SidebarTaskTable() {
  const [task, setTask] = useState({});
  const [searchTerm, setSearchTerm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusID, setStatusID] = useState(0);
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
  const [coins, setCoins] = useState(0);

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

  const handleAcceptTask = async (assignTaskId) => {
    const formData = new FormData();
    formData.append("assignTaskId", assignTaskId);
    formData.append("isAccepted", true);
    const res = await postAssignedEmpApproveTask(formData);
    console.log(res);
    fetchData();
  };

  const handleObjectTask = async (assignTaskId, objectReason) => {
    const formData = new FormData();
    formData.append("assignTaskId", assignTaskId);
    formData.append("objectReason", objectReason);
    formData.append("isObjected", true);
    const res = await postAssignedEmpObjectTask(formData);
    console.log(res);
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

  const handleAssignerReject = async (
    taskId,
    assignerTaskId,
    rejectStatus,
    terminateReason
  ) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("assignerTaskId", assignerTaskId);
    formData.append("assignerStatus", rejectStatus);
    formData.append("terminateReason", terminateReason);
    const res = await postAssignerEmpObjectTask(formData);
    console.log(res);
    fetchData();
  };

  const handleManagerUpdateTaskCoin = async (taskId, taskCoin) => {
    const formData = new FormData();
    formData.append("taskId", taskId);
    formData.append("taskCoin", taskCoin);
    const res = await postManagerUpdateTaskCoin(formData);
    console.log(res);
    fetchData();
  };
  return (
    <Paper sx={{ width: "100%" }}>
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
                    // value={""}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                              {userRole === "admin" ? (
                                <>
                                  {!task.isManagerApproved && (
                                    <UpdateTaskCoinsModal
                                      task={task}
                                      handleManagerUpdateTaskCoin={
                                        handleManagerUpdateTaskCoin
                                      }
                                    />
                                  )}
                                  {!statusArray.includes(task.status) &&
                                    task.createdBy === username &&
                                    (!task.isAccepted ||
                                      !task.isObjected ||
                                      task.isObjected) && (
                                      <Button style={{ ...buttonStyles }}>
                                        <SwipeableTemporaryDrawer
                                          buttons={["Edit"]}
                                          task={task && task}
                                        />
                                      </Button>
                                    )}
                                  {task.isAccepted &&
                                    task.isAssignedEmpSubmit &&
                                    !statusArray.includes(task.status) &&
                                    task.createdBy === username && (
                                      <>
                                        <Button
                                          style={{ ...buttonStyles }}
                                          onClick={() =>
                                            handleAssignerSubmit(task.id)
                                          }
                                        >
                                          Accept
                                        </Button>
                                        <RejectTaskModal
                                          task={task}
                                          handleAssignerReject={
                                            handleAssignerReject
                                          }
                                        />
                                      </>
                                    )}
                                </>
                              ) : (
                                <>
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
                                        {task.isAccepted &&
                                        task.isAssignedEmpSubmit ? (
                                          <>
                                            <Button
                                              style={{ ...buttonStyles }}
                                              onClick={() =>
                                                handleAssignerSubmit(task.id)
                                              }
                                            >
                                              Accept
                                            </Button>
                                            <RejectTaskModal
                                              task={task}
                                              handleAssignerReject={
                                                handleAssignerReject
                                              }
                                            />
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
                                          onClick={() =>
                                            handleAcceptTask(task.id)
                                          }
                                        >
                                          Accept
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                      {(!task.isObjected || !task.isAccepted) &&
                                      !task.isAccepted &&
                                      !statusArray.includes(task.status) ? (
                                        <ObjectTaskModal
                                          task={task}
                                          handleObjectTask={handleObjectTask}
                                        />
                                      ) : (
                                        ""
                                      )}
                                      {task.isAccepted &&
                                      !task.isAssignedEmpSubmit &&
                                      !statusArray.includes(task.status) ? (
                                        <SubmitTaskModal
                                          task={task}
                                          handleSubmitTask={handleSubmitTask}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </>
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
