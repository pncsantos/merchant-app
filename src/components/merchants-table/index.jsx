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
import EditIcon from "@material-ui/icons/Edit";

const COLUMN_HEADERS = [
  { id: "id", label: "ID", minWidth: 120 },
  { id: "name", label: "Name", minWidth: 160 },
  { id: "membersCount", label: "Members Size", minWidth: 160 },
  { id: "edit", label: "", minWidth: 40, align: "center" },
];

const PAGE_SELECTION = [5, 10, 25];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 480,
  },
});

export default function MerchantsTable({
  data,
  filterParams,
  handleChangePage,
  handleChangeRowsPerPage,
  handleViewMerchantDetails,
  handleViewMerchantFormDetails,
  totalCount,
}) {
  const classes = useStyles();
  const { pageSize, page } = filterParams;

  const mapData =
    data &&
    data.map((row) => {
      const { id, name, membersCount } = row;
      return { id, name, membersCount };
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
                  {mapData.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        style={{ cursor: "pointer" }}
                      >
                        {COLUMN_HEADERS.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => {
                                if (column.id !== "edit")
                                  handleViewMerchantDetails(row.id);
                              }}
                            >
                              {column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : column.id !== "edit" ? (
                                value
                              ) : (
                                <IconButton
                                  onClick={() =>
                                    handleViewMerchantFormDetails(row)
                                  }
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
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
              rowsPerPageOptions={PAGE_SELECTION}
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
        <div className="generic-container">No existing merchants ...</div>
      )}
    </div>
  );
}
