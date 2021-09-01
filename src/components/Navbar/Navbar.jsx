import useStyles from "./styles";
import { Typography, AppBar, Toolbar, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UseData } from "../../DataContext";

function Navbar() {
  const classes = useStyles();
  const { showResults } = UseData();
  return (
    <Toolbar>
      {" "}
      <AppBar color="primary" position="static">
        <Box alignContent="center" flexDirection="row">
          <Typography className={classes.title} variant="h4" align="center">
            Api Covid-19
          </Typography>
          <Link to="/" style={{ textDecoration: "none", margin: "20px" }}>
            {" "}
            <Button variant="outlined" onClick={showResults}>
              Home
            </Button>
          </Link>
        </Box>
      </AppBar>
    </Toolbar>
  );
}

export default Navbar;
