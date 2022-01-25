import "./App.css";
import AllCountries from "./Pages/AllCountries/AllCountries";
import CountryDetails from "./Pages/CountryDetails/CountryDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Router forceRefresh={true}>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={AllCountries} />
          <Route exact path="/:slug" component={CountryDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
