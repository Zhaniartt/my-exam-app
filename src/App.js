import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import NavbarPage from './components/common/Navbar'
import Footer from './components/common/Footer'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Home from './components/home/Home'
import Learnmore from './components/common/Learnmore'
import Logout from './components/user/Logout'
import Room from './components/rooms/room/Room'
import AllRooms from './components/rooms/allRooms/AllRooms'
import SingleRoom from './components/rooms/singleRoom/SingleRoom'
import Profile from './components/user/Profile'

function App() {
  return (
    <div className="App">
      <NavbarPage/>
      <Router>
      <Switch>
      <Route path="/" exact component={Home} />  
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register}></Route>
      <Route path="/learnmore" exact component={Learnmore}></Route>
      <Route path="/logout" exact component={Logout}></Route>
      <Route path="/create" exact component={Room}></Route>
      <Route path="/allRooms" exact component={AllRooms}></Route>
      <Route path="/singleRoom/:id" exact component={SingleRoom}></Route>
      <Route path="/myprofile" exact component={Profile}></Route>
      </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
