import { useState, useEffect } from "react";
import { UseData } from "../../../DataContext";
import { TablesContainer } from "../../index";
import { Typography } from "@material-ui/core";

function SearchResults({ data }) {
  const [filteredData, setFilterData] = useState([]);

  const { searchInput } = UseData();

  useEffect(() => {
    const filtering = data.filter((country) => {
      return country.country.toLowerCase().includes(searchInput.toLowerCase());
    });

    setFilterData(filtering);
  }, [searchInput]);

  return (
    <div>
      {filteredData.length > 0 ? (
        <TablesContainer data={filteredData} />
      ) : (
        <Typography style={{ margin: "30px" }} variant="h4" align="center">
          No results found
        </Typography>
      )}
    </div>
  );
}

export default SearchResults;
