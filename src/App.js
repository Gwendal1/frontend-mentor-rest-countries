import "./App.scss";
import { useState } from "react";
import AllCountries from "./Pages/AllCountries/AllCountries";
import CountryDetails from "./Pages/CountryDetails/CountryDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";

function App() {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
}

  return (
    <Router forceRefresh={true}>
      <div className={theme === true ? "App dark-mode" : "App"}>
        <Header props={toggleTheme}/>
        <Switch>
          <Route exact path="/" component={AllCountries} />
          <Route exact path="/:slug" component={CountryDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
