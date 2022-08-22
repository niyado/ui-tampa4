import React from "react";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { useStyles } from "./styles";
import Trade from "./pages/Trade";
import SearchStock from "./utils/SearchStock";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.appRoot}>
      <Router>
        <Navigation />
        <div>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route exact key={index} path={route.path}>
                  {route.component}
                </Route>
              );
            })}
            <Route path="Search" element={<SearchStock />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;