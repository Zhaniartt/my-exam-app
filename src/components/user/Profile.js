
import React, { Component } from 'react'
import requester from '../services/requester'
import './Profile.css'

export class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
        allrooms:[]
    }
  } 
  getData(){
    let newRooms = [];
    requester.get('appdata', 'rooms', 'kinvey').then(data=>{
        data.forEach(e=> {
            if(e.creator === sessionStorage.getItem('user')){
                newRooms.push({
                    id: e._id,
                    creator: e.creator,
                    name:e.name,
                    password: e.password,
                    message: e.message
                })
            }
        })
      }).then(()=>{
        this.setState({
            allrooms: [...this.state.allrooms, newRooms]
        } , ()=> {
            console.log('new roooms updated')
        })
      })
}
componentDidMount(){
    this.getData();
}
  render() {

    let s = []

    this.state.allrooms.map(r=> s.push(r))
        let notEmpty = <span>   {s.map(r=> r.map(item=>(
            <p>{item.name}</p>
   )
   ))}</span>

            let empty = <div><h3>Not available rooms</h3></div>
    return (
      <div  className="main-section">
          <img className="profilePhoto" src="https://icon-library.net/images/icon-profile/icon-profile-1.jpg" style={{width:"250px"}}></img>
       <div>
           <div>
               <h1>Name</h1>
                  <span>{sessionStorage.getItem('user')}</span>
            </div>
           <div>
               <h2>Available Rooms</h2>
               {s.length !== 0 ? notEmpty : empty}
           </div>
       </div>
    </div>
    )
  }
}

export default Profile;
