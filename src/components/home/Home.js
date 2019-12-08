import React from 'react';
import './Home.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';

const Home = () => {
    return (
        <section id="banner">
        <div class="inner">
            <header>
                <h1>This is QuestionsDo by Zhani AY.</h1>
                <p>QuestionsDo is the ultimate Q&A and polling platform for meetings and events.<br /> It offers interactive Q&A, live polls and insights about your audience.</p>
            </header>
            <Router>
                <Route>
               
                <div classNam="button big scrolly">
                  <a className="button big scrolly" href="/learnmore">Learn more</a>
                  </div>
                </Route>
            </Router>
         
        </div>
         </section>
    );
}

export default Home;
