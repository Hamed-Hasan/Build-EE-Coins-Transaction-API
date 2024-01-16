import {
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
import { Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
import ReusableModal from "../AlertDialogSlide/ReusableModal";


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

export default function SidebarTaskTable({ userRole }) {
const username = "Sayed Imam";
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

const [modalOpen, setModalOpen] = useState(false);
const [modalContent, setModalContent] = useState(null);
const [modalTitle, setModalTitle] = useState('');
const [currentSubmitHandler, setCurrentSubmitHandler] = useState(null);
const [objectReason, setObjectReason] = useState('');
const [terminateReason, setTerminateReason] = useState('');
const [rejectStatus, setRejectStatus] = useState('');
const [fileData, setFileData] = useState(null);
// console.log(fileData)



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

// const [rejectStatus, setRejectStatus] = useState("");
// const [terminateReason, setTerminateReason] = useState("");

// const handleChangeRejectStatus = (e) => {
//   setRejectStatus(e.target.value);
// };

const handleApproveTask = async (assignerTaskId, assignerStatus) => {
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
  fetchData();
};



const handleAcceptTask = async (assignTaskId) => {
  const formData = new FormData();
  formData.append("assignTaskId", assignTaskId);
  formData.append("isAccepted", true);
  const res = await postAssignedEmpApproveTask(formData);
  console.log(res);
  fetchData();
};


const handleAssignerReject = async (taskId, assignerTaskId) => {

  const formData = new FormData();
  formData.append("taskId", taskId);
  formData.append("assignerTaskId", assignerTaskId);
  formData.append("terminateReason", terminateReason);
  formData.append("assignerStatus", rejectStatus);
  const res = await postAssignerEmpObjectTask(formData);
  console.log(res);
  fetchData();
};

const handleSubmitTask = async (assignTaskId, assignerTaskId,file) => {
  const formData = new FormData();
  // formData.append("assignTaskId", assignTaskId);
  // formData.append("assignerTaskId", assignerTaskId);
  formData.append("isAssignedEmpSubmit", true);
  formData.append("uploadFile", file);
  console.log("Submitted File Data:", formData.get("uploadFile"));
  // const res = await postAssignedEmpSubmitTask(formData);
  // console.log(res);
  setTimeout(() => {
    handleClose();
  }, 1000);
  fetchData();
};

const handleObjectTask = async () => {

  const formData = new FormData();
  // formData.append("assignTaskId", assignTaskId);
  formData.append("objectReason", objectReason);
  formData.append("isObjected", true);
  console.log(formData)
  // const res = await postAssignedEmpObjectTask(formData);
  // console.log(res);
  setTimeout(() => {
    handleClose();
  }, 1000);
  fetchData();
};






const handleModalOpen = (content, title) => {
  setModalContent(content);
  setModalTitle(title);
  setModalOpen(true);
};

const handleModalClose = () => {
  setModalOpen(false);
// setCurrentSubmitHandler(null); // Resetting the submit handler
};

const handleButtonClick = (buttonType) => {
  switch (buttonType) {
    case 'Submit':
      setCurrentSubmitHandler(() => () => handleSubmitTask( fileData));
      handleModalOpen(
        <div>
         <TextField
        autoFocus
        margin="dense"
        id="file"
        label="Upload File"
        type="file"
        fullWidth
        onChange={(e) => setFileData(e.target.files[0])}
      />
        </div>,
        'Submit Task'
      );
      break;
      case 'Object':
        setCurrentSubmitHandler(() => handleObjectTask);
        handleModalOpen(
          <TextField
            autoFocus
            margin="dense"
            id="object"
            label="Object Reason"
            type="text"
            fullWidth
            onChange={(e) => setObjectReason(e.target.value)}
          />,
          'Object Task'
        );
      break;
      case 'Reject':
        setCurrentSubmitHandler(() => handleAssignerReject);
        handleModalOpen(<RejectModalContent />, 'Reject Task');
        break;
      default:
        return null;
  }
};

const RejectModalContent = () => {
  const [action, setAction] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);

  const handleSelectChange = (event) => {
    const selectedAction = event.target.value;
    setAction(selectedAction);
    setShowTextArea(selectedAction === 'Terminate');
    setRejectStatus(selectedAction)
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
          onChange={handleSelectChange}
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
          placeholder='Please Write Your Reason!'
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
<SwipeableTemporaryDrawer buttons={["Add Category"]} />
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
                    <Button style={{ ...buttonStyles }} onClick={() => handleButtonClick('Reject')}>
                          Reject
                        </Button>
                  </>
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
                <Button style={{ ...buttonStyles }} onClick={() => handleButtonClick('Object')}>
                Object
              </Button>
              ) : (
                ""
              )}
              {task.isAccepted &&
              !task.isAssignedEmpSubmit &&
              !statusArray.includes(task.status) ? (
                <Button style={{ ...buttonStyles }} onClick={() => handleButtonClick('Submit')}>
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
