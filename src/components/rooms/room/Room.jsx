import React, { Component } from 'react'
import { Redirect } from 'react-router'

    import './css/main.css'
    import './css/util.css'
    import './images/icons/favicon.ico'
    import './vendor/bootstrap/css/bootstrap.min.css'
    import './fonts/font-awesome-4.7.0/css/font-awesome.min.css'
    import './fonts/iconic/css/material-design-iconic-font.min.css'
    import './vendor/animate/animate.css'
    import './vendor/css-hamburgers/hamburgers.css'
    import './vendor/select2/select2.min.css'
    import './vendor/daterangepicker/daterangepicker.css'

    import roomsService from '../../roomsService'
export class Room extends Component {
        constructor(props){
            super(props)

            this.state ={
                name: null,
                email:null,
                password:null,
                service:null,
                message:null,
                creator: null,
                redirect: false

            }
        }
        componentDidMount(){
          if(!sessionStorage.getItem('user')){
              this.setState({
                redirect: true
              })
          }
        }

        handleSubmit = (ev) =>{
            ev.preventDefault();
            
            roomsService.createRecipe(this.state.name,this.state.password,this.state.message,this.state.creator,this.state.service,this.state.email)
                        .then(res=>{
                             document.location.href = '/allRooms'                           
                        })
        }
        handleChange = (ev) =>{
            let fieldName = ev.target.name;
            let fieldValue = ev.target.value;
            this.setState({
                creator: sessionStorage.getItem('user')
            })
            this.setState({ [fieldName]:fieldValue})
           
        }

    render() {
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/'/>;
      }
    
      
        return (
            <div className="create-room">
            <title>Contact V5</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <div className="container-contact100">
              <div className="wrap-contact100">
                <form className="contact100-form validate-form" onSubmit={this.handleSubmit}>
                  <span className="contact100-form-title">
                    Create room
                  </span>
                  <div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
                    <span className="label-input100">Room Title </span>
                    <input onChange={this.handleChange} className="input100" type="text" name="name" placeholder="Enter Your Name" />
                  </div>
                  <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate="Enter Your Email (e@a.x)">
                    <span className="label-input100">Email </span>
                    <input onChange={this.handleChange}  className="input100" type="text" name="email" placeholder="Enter Your Email " />
                  </div>
                  <div className="wrap-input100 bg1 rs1-wrap-input100">
                    <span className="label-input100">Password of the room</span>
                    <input onChange={this.handleChange}  className="input100" type="password" name="password" placeholder="Enter Password Phone" />
                  </div>
                  <div className="wrap-input100 input100-select bg1">
                    <span className="label-input100">Topic</span>
                    <div>
                      <select onChange={this.handleChange}  className="js-select2" name="service">
                        <option>Business Development</option>
                        <option>Engeneering</option>
                        <option>Marketing</option>
                        <option>Healthcare Service</option>
                        <option>Education</option>
                        <option>Arts and Design</option>
                        <option>Real Estate</option>
                        <option>Program and Project Management</option>
                        <option>Information Technology</option>
                        <option>Product Management</option>
                      </select>
                      <div className="dropDownSelect2" />
                    </div>
                  </div>
              
                  <div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Message">
                    <span className="label-input100">Special conditions?</span>
                    <textarea onChange={this.handleChange}  className="input100" name="message" placeholder="Your message here..." defaultValue={""} />
                  </div>
                  <div className="container-contact100-form-btn">
                    <button className="contact100-form-btn">
                      <span>
                        Submit
                        <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/*===============================================================================================*/}
            {/* Global site tag (gtag.js) - Google Analytics */}
          </div>
        )
    }
}

export default Room
