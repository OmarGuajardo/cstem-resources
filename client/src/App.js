import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { Provider } from "react-redux";

import { OpportunitiesProvider } from "./providers/OpportunitiesContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />

            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
export default App;
