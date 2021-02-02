import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { OpportunitiesProvider } from "./providers/OpportunitiesContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <OpportunitiesProvider>
            <Route path="/dashboard" component={Dashboard} />
          </OpportunitiesProvider>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
