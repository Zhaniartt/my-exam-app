import React, { Component } from 'react'
    import './style.css'
    import { BrowserRouter as Router } from 'react-router-dom';
    import { Route, Link } from 'react-router-dom';
    import { Switch } from 'react-router-dom';
    import { Redirect } from 'react-router'
    
    import auth from '../auth'
import requester from '../requester';


export class Register extends Component {
      constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null,
            password_confirm:null,
            reg_fullname:null,
            reg_email:null,
            reg_gender:null,
            errors: {
              username: '',
              password_confirm: '',
              password: ''
            },
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
        let idForm = ev.target.id;
        if(fieldName === 'reg_gender'){
            fieldValue = idForm
        }
        ev.preventDefault();
        let errors = this.state.errors;
    
        switch (fieldName) {
          case 'username': 
            errors.username = 
              fieldValue.length < 5
                ? 'Full Name must be 5 characters long!'
                : '';
            break;
          case 'password_confirm': 
            errors.password_confirm = 
              fieldValue !== this.state.password
                ? 'Passwords does not match!'
                : '';
            break;
          case 'password': 
            errors.password = 
              fieldValue.length < 8
                ? 'Password must be 8 characters long!'
                : '';
            break;
          default:
            break;
        }
        this.setState({ [fieldName]:fieldValue})
        this.setState({errors});

      }
      handleSubmit = ev => {
        ev.preventDefault();
        auth.register(this.state).then(res=>{
        auth.saveSession(res);
        document.location.href = '/login'
        })
      }
 

  render() {
    const {errors} = this.state;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    }
    
    return (
      <div className="text-center" style={{padding: '50px 0'}}>
      <div className="logo">register</div>
      <div className="login-form-1">
        <form id="register-form" className="text-left" onSubmit={this.handleSubmit}>
          <div className="login-form-main-message" />
          <div className="main-login-form">
            <div className="login-group">
              <div className="form-group">
                <label htmlFor="username" className="sr-only">Email address</label>
                <input onChange={this.handleChange} type="text" className="form-control" id="username" name="username" placeholder="username" />
                {errors.username.length > 0 && 
                <span className='error'>{errors.username}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="sr-only">Password</label>
                <input onChange={this.handleChange} type="password" className="form-control" id="password" name="password" placeholder="password" />
                {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password_confirm" className="sr-only">Password Confirm</label>
                <input onChange={this.handleChange} type="password" className="form-control" id="password_confirm" name="password_confirm" placeholder="confirm password" />
                {errors.password_confirm.length > 0 && 
                <span className='error'>{errors.password_confirm}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="reg_email" className="sr-only">Email</label>
                <input onChange={this.handleChange} type="text" className="form-control" id="reg_email" name="reg_email" placeholder="email" />
              
              </div>
              <div className="form-group">
                <label htmlFor="reg_fullname" className="sr-only">Full Name</label>
                <input onChange={this.handleChange} type="text" className="form-control" id="reg_fullname" name="reg_fullname" placeholder="full name" />
              </div>
              <div className="form-group login-group-checkbox">
                <input onChange={this.handleChange}  type="radio" className name="reg_gender" id="male" placeholder="username" />
                <label  htmlFor="male">male</label>
                <input onChange={this.handleChange} type="radio" className name="req_gender" id="female" placeholder="username" />
                <label htmlFor="female">female</label>
              </div>
              <div className="form-group login-group-checkbox">
                <input type="checkbox" className id="reg_agree" name="reg_agree" />
                <label htmlFor="reg_agree">i agree with <a href="#">terms</a></label>
              </div>
            </div>
            <button type="submit" className="login-button"><i className="fa fa-chevron-right" /></button>
          </div>
          <div className="etc-login-form">
            <p>already have an account? <Link to="/login">login here></Link></p>
          </div>
        </form>
      </div>
      </div>
    )
  }
}

export default Register

