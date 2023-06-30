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
        let text = "text";

        return (

            <div style={{ color:styles.colors.colorWhite+"99", 
            borderRadius:"22px", fontWeight:"550",  }}>
                
                <label  for="file-upload" style={{...styles.buttons.buttonAdd,
                    display: "inline-block", height:"fit-content",
                    maxWidth: "fit-content", cursor:"pointer",
                     marginRight:"1rem",  position: "relative",
                     fontSize:styles.fonts.fontSmall
                }}>
{this.props.text ? this.props.text : "* Choose a banner image"}
                    <input accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        style={{ 
                            position: 'absolute', // Set position to absolute to make it fill the entire label
                            top: 0, 
                            left: 0, cursor:"pointer",
                            width: '100.5%', 
                            height: '100.5%',
                            opacity: 0, 
                        }} 
                        size="6" 
                        text={text}
                        type="file" 
                        name="file" 
                        onChange={this.changeHandler}/>
                    
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