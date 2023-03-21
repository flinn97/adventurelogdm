import React, { Component } from 'react';
import authService from '../../../services/auth';
import FormWithUpdateAndRun from '../buttons/formWithUpdateAndRun';

export default class Notes extends Component {
    constructor(props){
        super(props);


        this.state={
        }
    }

   async  componentDidUpdate(){
       if( this.props.app.state.updateRun){
        await this.props.app.dispatch({updateRun: false})
        this.setState({showInput:false})
       }
    }
	
    render(){
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let component = state.currentComponent;
       
        let styles =state.styles;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        return(
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            {this.state.showInput? (<><FormWithUpdateAndRun  obj={state.currentComponent}  type="text"   name="title" app={app}  /> <div onClick={()=>{this.setState({showInput:false})}}>x</div></>):(
                        <div  onClick={()=>{this.setState({showInput:true})}} style={{display:"flex", flexDirection:"row"}}><p>{this.props.text?this.props.text:"add Note"}</p> <p>Delete</p></div>
                        )}
                        </div>
                        

                 </div>
             )
    }
	
}