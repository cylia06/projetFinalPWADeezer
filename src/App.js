import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import './App.css';
import NavBar from './js/NavBar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './js/Search';
import Trending from './js/Trending';
import Saved from './js/Saved';
import Player from './js/Player';
import Home from './js/home';
function App() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>{
      navigator.serviceWorker.register('./serviceworker.js')
      .then((reg) => console.log('Success:', reg.scope))
      .catch((err) => console.log('Failure:', err));
     
    })
  } 
  return (
  <Router>
    <NavBar/>  
    <Route path="/player" component={Player} />
    <Route path="/trending" component={Trending} />
    <Route path="/Search" component={Search}  />
    <Route path="/saved" component={Saved} />
    <Route path="//" component={Home} />
  </Router>
   
  );
}
export default App;
