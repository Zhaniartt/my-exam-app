import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import observer from '../services/observer'

export default class Navbar extends  Component {
    constructor(props){
      super(props)
      this.state = {
        username: null
      }

      observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    }
    userLoggedIn = username => {
      this.setState({username})
    }

    render = () => {
      let user = sessionStorage.getItem('user')

        const loogedInSection = <div className="nav-link" style={{color: 'green'}}>
          Hello, {user}!
        </div>

        const notLoggedIn = <ul className="navbar-nav mr-auto "> 
      <div className="nav-item">
        <a className="nav-link" href="/register">Register</a>
      </div>
      <div className="nav-item">
        <a className="nav-link" href="/login">Login</a>
      </div>
       </ul>
      const loggedInParts = <ul className="navbar-nav mr-auto " ><div className="nav-item">
      <a className="nav-link" href="/create">Create room</a>
    </div>
    <div className="nav-item">
        <a className="nav-link" href="/allRooms">All Rooms</a>
      </div>
      <div className="nav-item">
        <a className="nav-link" href="/logout">Logout</a>
      </div>
   
   </ul>
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">QuestionsDo&#866;        Zhani</a>
        {user ? loogedInSection : null}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    
          <Router>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
          <div className="nav-item">
        <a className="nav-link" href="/">Home</a>
      </div>
            {!user ? notLoggedIn : null}
            {user ? loggedInParts : null}
            {user ?   <div>
              <a href="/myprofile" className="btn btn-outline-success my-2 my-sm-0">My Profile</a>
         
         </div> : null}
          </ul>
       
        </div>
          </Router>
      </nav>
      )
    }
}
