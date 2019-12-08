import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import requester from '../../requester'
import './AllRooms.css'
import roomService from '../../roomsService'

export class AllRooms extends Component {
    constructor(props){
        super(props)
    
            this.state = {
                allrooms: [],
                password:'',
                targetPassword:'',
                errors:'',
                length: 0,
                isEmpty: true
            };
            this.getData = this.getData.bind(this)
    }
  
    getData(){
        let newRooms = [];
        requester.get('appdata', 'rooms', 'kinvey').then(data=>{
            data.forEach(e=> {
                newRooms.push({
                    id: e._id,
                    creator: e.creator,
                    name:e.name,
                    password: e.password,
                    message: e.message
                })
            })
          }).then(()=>{
            this.setState({
                allrooms: [...this.state.allrooms, newRooms],
            } , ()=> {
           
                console.log('new roooms updated')
            })
          }).then(()=>{
              if(newRooms.length > 0) {
                  this.setState({
                        isEmpty: false
                  })
              }
          })
    }
    componentDidMount(){
        this.getData();
    }
 
    handleChange = (ev) => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;
        this.setState({ [fieldName]:fieldValue})
        this.setState({ targetPassword: ev.target.className})
    }
    handleSubmit = (ev) =>{
        console.log('here')
       
       if(this.state.password !== this.state.targetPassword){
           this.setState({
               errors:'Wrong Password!'
           })
       }else{
           console.log(ev.target.id)
        document.location.href = `/singleRoom/${ev.target.id}`    
       }
       
    }
    deleteTheRoom = ev =>{
        let roomId = ev.target.id
        roomService.deleteRooms(roomId).then(()=>{
            document.location.href = '/'
        })

    }

    render() {
        let s = []
        this.state.allrooms.map(r=>{
            s.push(r)
        })
     
        return (
        <div>

            {this.state.isEmpty && <div className="noRooms">
           
                <h1 >Not available rooms!</h1>
                <Link className="createLink" to="/create">Create the first room!</Link>
                </div>}

                {!this.state.isEmpty  && <div>
                    
            <p>   {this.state.errors.length > 0 && 
                <span className='error'>{this.state.errors}</span>}</p>
            <h1 className="title">Find your room  &#8595;</h1>
          
                <table>
                    <tr>
                        <th className="table-title">Name of the room</th>
                        <th className="table-title">Message from the creator</th>
                        <th className="table-title">Password</th>
                    </tr>
                    
                    {s.map(r=> r.map(item=> (
                        <tr className="table-sections">
                        <td >{item.name}</td>
                        <td>{item.message}</td>
                        <td><input className={item.password} onChange={this.handleChange} type="password" name="password" type="password" name="password"></input></td>
                        <td>
                        <button id={item.id} onClick={this.handleSubmit} className="button5">Join</button></td>
                        </tr>
                    )))}
                    
                </table></div>}
        </div>
        );
    }
}

export default AllRooms
