import React from "react";
import { Loading } from "../index";
import { useState, useEffect } from "react";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import Moment from "react-moment";
import { UseData } from "../../DataContext";
import { useParams, Redirect } from "react-router-dom";

function CountryInfo() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { country } = useParams();
  const [error, setError] = useState();
  const { showResults } = UseData();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key":
                "82b4506c07msh67fd8905fd7a042p1df754jsn3ec4376a1e52",
            },
          }
        );
        const statistics = await response.json();
        setData(statistics.response[0]);
        showResults();
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data === undefined ? (
            <>
              {" "}
              {error === undefined ? (
                <Redirect to="/404" />
              ) : (
                <Typography>{error}</Typography>
              )}
            </>
          ) : (
            <>
              <div className={classes.modalHead}>
                <Typography
                  align="center"
                  variant="h4"
                  className={classes.title}
                >
                  {data.country}
                </Typography>
              </div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Active Cases</TableCell>
                      <TableCell align="center">Population</TableCell>
                      <TableCell align="center">Total Cases</TableCell>
                      <TableCell align="center">Recovered</TableCell>
                      <TableCell align="left">Last Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={country.country}>
                      <TableCell style={{ width: "10%" }} align="center">
                        {data.cases.active}
                      </TableCell>
                      <TableCell style={{ width: "10%" }} align="center">
                        {data.population}
                      </TableCell>
                      <TableCell style={{ width: "10%" }} align="center">
                        {data.cases.total}
                      </TableCell>
                      <TableCell style={{ width: "10%" }} align="center">
                        {data.cases.recovered}
                      </TableCell>
                      <TableCell style={{ width: "10%" }} align="left">
                        <Moment format="L  LT"></Moment>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CountryInfo;
