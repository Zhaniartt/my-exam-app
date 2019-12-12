import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './Logout'

import { Button } from 'semantic-ui-react'

export class Logout extends Component {
    state = {
        navigate: false
    };
    logout = () => {
        sessionStorage.removeItem('authtoken');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        this.setState({navigate: true})
    }
    render(){
        const { navigate } = this.state;
        const mystyle = {
            color: "black",
            backgroundColor: "green",
            fontFamily: "Arial",
            marginLeft: 650,
            marginBottom: 50,
            marginTop:50,
            fontSize:16
          };

        if(navigate){
            return <Redirect to="/" push={true}></Redirect>
        }
           
        return  <Button style={mystyle} onClick={this.logout}>Log out</Button>
    }
}

export default Logout
