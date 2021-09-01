import { Container, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { UseData } from "../../DataContext";
import { Redirect } from "react-router-dom";

function SearchBar() {
  const { showSearchResults } = UseData();
  const { search } = UseData();
  const classes = useStyles();
  return (
    <>
      {showSearchResults ? <Redirect to="/" /> : ""}
      <Container align="center" className={classes.search}>
        <TextField
          id="input-search"
          onKeyPress={(e) => {
            search(e);
          }}
          placeholder="Search for country"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>
    </>
  );
}

export default SearchBar;
