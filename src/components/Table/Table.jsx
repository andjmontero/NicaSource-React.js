import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { UseData } from "../../DataContext";

function TableList({ data }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      width: "100%",
      position: "absolute",
      padding: "20px",
      backgroundColor: "#f1e8e8;",
      border: "2px solid white",
      borderRadius: "8px",
      outline: "none",
    },
    root: {
      width: "60%",
      margin: "20px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    cell: {
      [theme.breakpoints.down("xs")]: {
        padding: "2px",
      },
    },
    headCell: {
      [theme.breakpoints.down("xs")]: {
        padding: "2px",
      },
    },
  }));
  const { countryClicked } = UseData();
  let tableTitle = data[0].continent;
  const date = Date().toLocaleString();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const countries = data.filter((e) => e.country !== tableTitle);
  const countriesSorted = countries.sort((a, b) =>
    a.country.localeCompare(b.country)
  );

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "country", label: "Country", minWidth: 10 },

    {
      id: "cases",
      label: "Active Cases",
      width: 10,
      align: "center",
    },
    { id: "population", label: "Population", minWidth: 10, align: "center" },
    {
      id: "info",

      minWidth: 10,
      align: "right",
    },
  ];
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <Paper className={classes.root}>
        <Typography align="center" variant="h4">
          {tableTitle}
        </Typography>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.headCell}
                  >
                    <Typography>{column.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {countriesSorted
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.country}
                      >
                        {columns.map((column) => {
                          let value = "";
                          if (column.id === "country") {
                            value = row.country;
                          } else if (column.id === "population") {
                            row.population === null ? (
                              <Typography>No data </Typography>
                            ) : (
                              (value = numberWithCommas(row.population))
                            );
                          } else if (column.id === "info") {
                            value = (
                              <Button
                                key={row.country}
                                type="button"
                                id={row.country}
                                variant="outlined"
                                size="small"
                                color="secondary"
                                onClick={() => countryClicked(row)}
                              >
                                {" "}
                                <Link
                                  key={row.country}
                                  to={`/country/${row.country}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  More Info
                                </Link>
                              </Button>
                            );
                          } else {
                            value = row.cases.active;
                          }

                          return (
                            <TableCell
                              className={classes.cell}
                              key={column.id}
                              align={column.align}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countriesSorted.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default TableList;
