import "./App.css";
import AllCountries from "./Pages/AllCountries/AllCountries";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={AllCountries} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
