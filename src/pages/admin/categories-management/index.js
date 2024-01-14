import SwipeableTemporaryDrawer from "@/components/TaskTable/SwipeableTemporaryDrawer";
import {
  getTasksCategoryDPList,
  postAddOrEditCategory,
} from "@/services/businessLogic";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "name", label: "Category Name", minWidth: 100 },
  {
    id: "coins",
    label: "Coins",
    minWidth: 170,
    align: "right",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);

  const handleEditCategory = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("coins", coins);
    const res = await postAddOrEditCategory(formData);
  };

  const fetchData = async () => {
    const res = await getTasksCategoryDPList();
    setCategories(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(categories);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
            {categories.length >= 1 &&
              categories.map((cat) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={cat.id}>
                    {columns.map((column, i) => {
                      const value = cat[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.id === "actions" ? (
                            <Button>
                              <SwipeableTemporaryDrawer
                                buttons={["Edit"]}
                                category={cat && cat}
                              />
                            </Button>
                          ) : (
                            value
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
      {/* <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

export default CategoriesManagement;
