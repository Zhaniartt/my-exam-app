import React, { Component } from 'react'
import requester from '../../services/requester'
import './QuestionForm.css'
import roomService from '../../services/roomsService'
import { withRouter } from 'react-router-dom'

export class QuestionForm extends Component {
        constructor(props){
          super(props)

            this.state={
              currentMsg:'',
              allmssgs:[],
            
            }
            
        }
  
        getData(){
          let newMsg = [];
          requester.get('appdata', 'allMssgs', 'kinvey').then(data=>{
              data.forEach(e=> {
                  newMsg.push({
                      id: e._id,
                      roomId: e.roomId,
                      creator: e.creator,
                      message: e.message
                  })
              })
            }).then(()=>{
              this.setState({
                  allmssgs: [...this.state.allmssgs, newMsg]
              } , ()=> {
      
                  console.log('new mssgs updated')
              })
            })
        }
        componentDidMount(){
          this.getData();
        }
        handleChange = ev =>{
          let question = ev.target.value;
         this.setState({
           currentMsg: question
         })
        }
        handleSubmit = ev => {
          ev.preventDefault()
            let question = this.state.currentMsg
            let idRoom = (this.props.location.pathname).split('/')[2]
          
          roomService.messageImport(question,idRoom).then((data) => {

            let url = window.location.href.split('/').slice(3,).join("/")
            document.location.href =  `/${url}` 

          })
     
        }
        deletedFunc = ev => {
          ev.preventDefault();
            
          let idMSg = ev.target.id;

            roomService.deleteMsg(idMSg).then((data)=>{
              let url = window.location.href.split('/').slice(3,).join("/")
              document.location.href =  `/${url}` 
            })
          }

    render(){
      let s = []

      this.state.allmssgs.map(r=>  Array.from(r).forEach(q=> {
        if(q.roomId ===  (this.props.location.pathname).split('/')[2]){
          s.push(q)
            console.log(q)
        }
      }))
        return (
            <div>
              <div className="header-div">
                <div className="qa-body">
                    
                    <form className="contact100-form validate-form" onSubmit={this.handleSubmit}>
                  <span className="contact100-form-title">
                    Any Questions HMMM?
                  </span>
                  
                  <div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
                  <div className="questions">
                  {s.map(item=>  (
                        <tr className="table-sections">
                        <td ref="targetText" className="targetText">{item.message}</td>
                        <td><button  id={item.id} onClick={this.deletedFunc} className="button5">Delete</button></td>
                        </tr>
                    ))}
                    </div>

                    <span className="label-input100">Your question? </span>
                    <input onChange={this.handleChange} className="input100" type="text" name="name" placeholder="Enter Your Question" />
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
            </div>
          );        
    }
}
export default QuestionForm

