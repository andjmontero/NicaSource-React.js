import React, { useContext, useState, createContext } from "react";

const DataContext = createContext();
export function UseData() {
  return useContext(DataContext);
}
export function DataProvider({ children }) {
  const [searchInput, setSearchInput] = useState();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [country, setCountry] = useState();

  function search(e) {
    let input = e.target.value;
    if (e.key === "Enter" && input.length > 0) {
      setShowSearchResults(true);
      setSearchInput(input);
      document.getElementById("input-search").value = "";
    }
  }
  function sortDataByContinent(data, continent) {
    return data.filter((country) => country.continent === continent);
  }
  const countryClicked = (country) => {
    setCountry(country.country);
  };
  const showResults = () => {
    setShowSearchResults(false);
  };
  return (
    <DataContext.Provider
      value={{
        search,
        searchInput,
        showSearchResults,
        sortDataByContinent,
        countryClicked,
        country,
        showResults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
