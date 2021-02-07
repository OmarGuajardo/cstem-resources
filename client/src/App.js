import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import checkToken from "./components/checkToken";
import { ThemeProvider } from "@material-ui/core/";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />

              <Route path="/dashboard" component={checkToken(Dashboard)} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}
export default App;
