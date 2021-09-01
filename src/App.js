import {useState,useEffect} from "react";
import {Navbar, TablesContainer, SearchBar,SearchResults, CountryInfo,Loading} from "./components"
import NotFound from "./components/NotFound"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Typography} from "@material-ui/core"
import {UseData} from "./DataContext"
function App() {
  const [data,setData]= useState();
  const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState()
  const {showSearchResults}= UseData();

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch("https://covid-193.p.rapidapi.com/statistics", {
              "method": "GET",
              "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "82b4506c07msh67fd8905fd7a042p1df754jsn3ec4376a1e52"
              }
            })
            const statistics = await response.json();
        
        setData(statistics.response);
      
        } catch (e) {
           setError(e);
        }
         finally{ setIsLoading(false)}
    };
    fetchData();
 
}, []);
  return (
<div>
  <Router>
  <Switch>
  <Route exact path="/">
  <Navbar/>
  {error===undefined? <><SearchBar/>
 {showSearchResults? <SearchResults data={data}/> : isLoading ? <Loading/>:  <TablesContainer data={data}/>}</>
: <Typography>{error}</Typography>

 }
 </Route>
  <Route exact path="/country/:country">
 <Navbar/>
  <SearchBar/>
 <CountryInfo/>
 </Route>
 <Route component={NotFound} />
 <Route  exact path="/404" component={NotFound} />
</Switch>

</Router>
</div>  
  );
}

export default App;
