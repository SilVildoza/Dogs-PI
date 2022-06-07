import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Form from './components/Form/Form';
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import Details from "./components/Details/Details";
import Error from './components/Error/Error';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/add" component={Form} />
        <Route path="/home/:id" component={Details} />
        <Route exact path='*/*' component={Error} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
