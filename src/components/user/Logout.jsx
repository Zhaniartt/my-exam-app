import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import auth from '../auth'
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

        if(navigate){
            return <Redirect to="/" push={true}></Redirect>
        }

        return <Button onClick={this.logout}>Log out</Button>
    }
}

export default Logout
