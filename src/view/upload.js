import React, { Component } from 'react';
import auth from '../services/auth';
import { ref, } from "firebase/storage";
import { storage, } from '../firbase.config.js';
import Beholder from "../pics/dragon.jpg";
/**
 * upload component allows for uploads of pictures
 * props: updateMap app 
 * obj
 * optional prop: update
 */
export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        

        this.state = {
            
        }
    }
   
    changeHandler = async (event) => {
        
        let path = "images/" + event.target.files[0].name;
       
        this.setState({
            selectedFile: event.target.files[0],
            path: path,
            
            pic: URL.createObjectURL(event.target.files[0])
        })
    };


    async handleSubmission() {
        debugger
        
            await auth.uploadPics(this.state.selectedFile, this.state.path);
        
        
       
        let component = this.props.obj
        await component.getPicSrc(this.state.path)
        if(!this.props.skipUpdate){
        if(this.props.update){
        this.props.app.state.componentList.getOperationsFactory().cleanPrepareRun({update:component})}
        else(await this.props.app.state.componentList.getOperationsFactory().run())
        }
        this.props.updateMap(component)

    };

    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        
        
        let styles =state.styles;
        
        return (
            
                  <div>  <input accept="image/png, image/gif, image/jpeg" 
                    style={{ 
                     }} type="file" name="file" onChange={this.changeHandler} />
                    <div onClick={this.handleSubmission}>Submit</div></div>
        )
    }

}