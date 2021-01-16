import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

// styles
import "./App.css";
// components
import Home from "./containers/home";
import MerchantDetails from "./containers/merchant-details";
import NotFound from "./containers/not-found";
import ScrollToTop from "./components/scroll-to-top";
import SnackBar from "./components/snack-bar";

function App() {
  return (
    <div className="app-container">
      <Router>
        <ScrollToTop />
        <div className="app-header">
          <Link to="/" className="app-title">
            Admin Tool
          </Link>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/merchant/:id" component={MerchantDetails} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <SnackBar />
    </div>
  );
}

export default App;
