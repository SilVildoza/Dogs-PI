import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
//import Nav from "./components/Nav/Nav"
import Form from './components/Form/Form';
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import Details from "./components/Details/Details";


function App() {
  //const location = useLocation();
  return (
    <BrowserRouter>
    <div className="App">
      {/* {location.pathname === "/" ? null : <Nav />} */}
      {/* <Nav /> */}
      <React.Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/add" component={Form} />
        <Route path="/home/:id" component={Details} />
      </React.Fragment>
    </div>
    </BrowserRouter>
  );
}

export default App;
