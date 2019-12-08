import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './Learnmore.css'
const Learnmore = () => {
    return (
        <div className="body-div">
          
           <div className="learn-more">
           <h1>Enabling amazing conversations at
meetings and events.</h1>
               <p>
               We enable users to crowdsource top questions to drive meaningful conversations, engage participants with live polls and capture valuable event data.
               </p>
               <p>
               We focus on simplicity. Both for meeting planners who can create an event in less than a minute, as well as for participants who can join via any device with a simple code.
               </p>
               <p>
               Having worked on over 320,000 events, we helped to engage millions of participants. We are proud to work with renowned conferences such as SXSW, Web Summit, Money20/20 and high-profile clients including Spotify, Lufthansa, BBC and Oracle.
               </p>
           </div>

           <div className="about-info">
               <h1>Don't Have an Account?</h1>
        <Link to="/register" className="links">Create an account by clicking here.</Link>
      
                <h2>Or you can login</h2>
                <Link to="/login" className="links">HERE!</Link>
           </div>
        </div>
    );
}

export default Learnmore;
