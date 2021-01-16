import React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";

const COLUMN_HEADERS = [
  { id: "name", label: "Name", minWidth: 160 },
  { id: "email", label: "Email", minWidth: 160 },
  { id: "edit", label: "", minWidth: 20, align: "center" },
  { id: "delete", label: "", minWidth: 20, align: "center" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 480,
  },
});

export default function MembersTable({
  data,
  filterParams,
  handleChangePage,
  handleChangeRowsPerPage,
  handleDeleteMemberClick,
  handleViewMemberClick,
  totalCount,
}) {
  const classes = useStyles();
  const { pageSize, page } = filterParams;

  const renderColumn = ({ column, value, row }) => {
    if (column.format && typeof value === "number") {
      return column.format(value);
    } else if (column.id === "delete") {
      return (
        <IconButton onClick={() => handleDeleteMemberClick(row)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      );
    } else if (column.id === "edit") {
      return (
        <IconButton onClick={() => handleViewMemberClick(row)}>
          <EditIcon fontSize="small" />
        </IconButton>
      );
    } else {
      return value;
    }
  };

  const membersData =
    data &&
    data.map((row) => {
      const { id, name, email } = row;
      return { id, name, email };
    });

  return (
    <div style={{ width: "100%" }}>
      {totalCount > 0 ? (
        <>
          <div style={{ marginBottom: 16 }}>Total: {totalCount}</div>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {COLUMN_HEADERS.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {membersData
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {COLUMN_HEADERS.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {renderColumn({
                                  column,
                                  value,
                                  row,
                                })}
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
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={pageSize}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      ) : (
        <div className="generic-container">No existing members ...</div>
      )}
    </div>
  );
}
