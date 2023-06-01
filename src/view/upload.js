import React, { Component } from 'react';
import auth from '../services/auth';
import { ref, } from "firebase/storage";
import { storage, } from '../firbase.config.js';

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
            uploaded: false,

        }
    }

    async componentDidUpdate() {
        if (this.state.uploaded) {
            await this.setState({ uploaded: false });
            debugger
            this.handleSubmission();
        }
    }


    changeHandler = async (event) => {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        let newDay = `${Math.floor(Math.random() * 9999)}-${month + day}`;
        let path = "images/" + newDay + event.target.files[0].name;

        await this.setState({
            selectedFile: event.target.files[0],
            path: path,
            pic: URL.createObjectURL(event.target.files[0])
        });
        this.props.changePic(this.state.pic);
        debugger
        await auth.uploadPics(this.state.selectedFile, this.state.path, this.setState.bind(this));
    };


    async handleSubmission() {
        debugger

        let component = this.props.obj
        await component.getPicSrc(this.state.path)
        if (!this.props.skipUpdate) {
            if (this.props.update) {
                this.props.app.state.componentList.getOperationsFactory().cleanPrepareRun({ update: component })
            }
            else (await this.props.app.state.componentList.getOperationsFactory().run())
        }
        this.props.updateMap(component)

    };


    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let styles = state.styles;

        return (

            <div style={{ background: "#f3f3f355", color: "black", padding: "24px", borderRadius: "22px" }}>

                <label for="file-upload" style={{
                    display: "inline-block",
                    maxWidth: "fit-content",
                    borderRadius: ".1vmin",
                }}> Choose an image file for your campaign:

                    <input accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        style={{ cursor: "pointer" }} size="6"
                        type="file" name="file" onChange={this.changeHandler}>

                    </input>
                </label>

                {/* <div onClick={}
                    
                    style={{cursor:"pointer", background:"#333333", width:"150px", textAlign:"center", borderRadius:"10px",padding:"11px", mixBlendMode:"multiply", 
                    border:"solid 1px black", color:"white", marginTop:"12px"}}
                    >                        
                        {this.props.text? this.props.text: "text='Create'"}
                        </div> */}
            </div>
        )
    }

}