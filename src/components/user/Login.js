
import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './Login.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import auth from '../auth'
import observer from '../observer'


export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        username: null,
        password: null,
        errors: '',
        redirect: false
    }
  } 
  componentDidMount(){
    if(sessionStorage.getItem('user')){
        this.setState({
          redirect: true
        })
    }
  }
  handleChange = ev =>{
    let fieldName = ev.target.name;
    let fieldValue = ev.target.value;
    this.setState({ [fieldName]:fieldValue})
  }
  handleSubmit = ev => {
    ev.preventDefault();
    console.log(this.state)

    auth.login(this.state).then(res=>{
      auth.saveSession(res)
        sessionStorage.setItem('user', res.username)
        observer.trigger(observer.events.loginUser, res.username)
        document.location.href = '/'
    }).catch(err=>{
      console.log(err)
      this.setState({
        errors: err.responseJSON.description
      })
    })
  }


  render() {
    const {errors} = this.state;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    }
    return (
      <div>
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      {/*---- Include the above in your HEAD tag --------*/}
      {/* All the files that are required */}
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
      <link href="http://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      {/* Where all the magic happens */}
      {/* LOGIN FORM */}
      <div className="text-center" style={{padding: '50px 0'}}>
        <div className="logo">login</div>
        <p>   {errors.length > 0 && 
                <span className='error'>{errors}</span>}</p>
     

        {/* Main Form */}
        <div className="login-form-1">
          <form onSubmit={this.handleSubmit} id="login-form" className="text-left">
            <div className="login-form-main-message" />
            <div className="main-login-form">
              <div className="login-group">
                <div className="form-group">
                  <label htmlFor="lg_username" className="sr-only">Username</label>
                  <input onChange={this.handleChange} type="text" className="form-control" id="lg_username" name="username" placeholder="username" />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_password" className="sr-only">Password</label>
                  <input onChange={this.handleChange} type="password" className="form-control" id="lg_password" name="password" placeholder="password" />
                </div>
                <div className="form-group login-group-checkbox">
                  <input type="checkbox" id="lg_remember" name="lg_remember" />
                  <label htmlFor="lg_remember">remember</label>
                </div>
              </div>
              <button type="submit" className="login-button"><i className="fa fa-chevron-right" /></button>
            </div>
            <div className="etc-login-form">
              <p>new user? <Link to="/register">create new account></Link></p>
            </div>
          </form>
        </div>
        {/* end:Main Form */}
      </div>
 

    </div>
    )
  }
}

export default Login;

