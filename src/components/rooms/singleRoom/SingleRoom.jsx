import React, { Component } from 'react'
import requester from '../../requester'
import QuestionForm from '../questionForm/QuestionForm'
import './SingleRoom.css'
import roomService from '../../roomsService'
import { Redirect } from 'react-router'

export class SingleRoom extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentid: props.match.params.id,
            data: '',
            redirect: false
        }
    }
    componentDidMount(){
        if(!sessionStorage.getItem('user')){
            this.setState({
              redirect: true
            })
        }

        requester.get('appdata', 'rooms', 'kinvey').then(data=>{
               let searchingItem = data.filter(x=> x._id === this.state.currentid)
               this.setState({
                   data: searchingItem
               })
          })

    }
    deleteTheRoom = ev =>{
        let roomId = this.state.currentid
        roomService.deleteRooms(roomId).then(()=>{
            document.location.href = '/'
        })

    }

    render() {
        let name = []
        let department = [] 
        let creator
        
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/'/>;
        }
      
        
        Array.from(this.state.data).map(r=>
        {
                department.push(r.service)
                 name.push(r.name)
                 creator = r.creator;

        })
        let checker = sessionStorage.getItem('user') === creator

        let creatorMode = <div>
            <button onClick={this.deleteTheRoom}>Close the room!</button>
        </div>

        return (
            <div>
                <div className="main-info">
                <h3>Welcome to the room!</h3>
                <h1>{name}</h1>
                <h2>{department}</h2>
                    {checker ? creatorMode : null}
                </div>
                <div>
                    
                <QuestionForm  location={this.props.location}/>
          </div>
          </div>
        
        )
    }
}

export default SingleRoom
