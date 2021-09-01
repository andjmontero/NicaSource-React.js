import React from "react";
import { Table } from "../index";
import { Container, Box } from "@material-ui/core";
import { UseData } from "../../DataContext";
function TablesContainer({ data }) {
  const { sortDataByContinent } = UseData();
  const dataNorthAmerica = sortDataByContinent(data, "North-America");
  const dataAfrica = sortDataByContinent(data, "Africa");
  const dataSouthAmerica = sortDataByContinent(data, "South-America");
  const dataEurope = sortDataByContinent(data, "Europe");
  const dataOceania = sortDataByContinent(data, "Oceania");
  const dataAsia = sortDataByContinent(data, "Asia");
  const totalData = [];
  totalData.push(
    dataNorthAmerica,
    dataAfrica,
    dataSouthAmerica,
    dataEurope,
    dataOceania,
    dataAsia
  );
  return (
    <>
      {totalData.map((continentData) =>
        continentData.length === 0 ? (
          ""
        ) : (
          <Box
            key={continentData.length}
            display="flex"
            justifyContent="center"
          >
            {" "}
            <Table key={continentData.length} data={continentData} />
          </Box>
        )
      )}
    </>
  );
}

export default TablesContainer;
