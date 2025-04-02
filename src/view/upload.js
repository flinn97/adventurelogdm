import React, { Component } from 'react';
import auth from '../services/auth';
import { ref, } from "firebase/storage";
import { storage, } from '../firbase.config.js';
import "../App.css";

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
            obj: this.props.obj,

        }
    }

    async componentDidUpdate() {
        if (this.state.uploaded) {
            await this.setState({ uploaded: false });

            this.handleSubmission();
        }
    }


    changeHandler = async (event) => {
        if(this.props.checkUser){
            if(this.props.app.state.user.getJson().role!=="GM"){
                return
              }
        }
        
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

        if (this.props.prepareOnChange){
            
            await this.props.app.state.opps.cleanJsonPrepare({
                ["add"+this.props.prepareOnChange.name]:this.props.prepareOnChange.json,
            })
            let obj = await this.props.app.state.opps.getUpdater("add")[0];
            this.setState({obj:obj});
        }

        if (this.props.changePic){
            await this.props.changePic(this.state.pic);}
                
            await auth.uploadPics(this.state.selectedFile, this.state.path, this.setState.bind(this), this.props.quality);
        };
        


    async handleSubmission() {
        
        
        let component = this.state.obj;
        await component.getPicSrc(this.state.path, this.props.app.state);


        if (!this.props.skipUpdate) {
            if (this.props.update) {
                this.props.app.state.componentList.getOperationsFactory().cleanPrepareRun({ update: component })
            }
            else (await this.props.app.state.componentList.getOperationsFactory().run())
        }

        if (this.props.prepareOnChange){
            await this.props.app.state.opps.run();
        }

        // Check if updateMap prop is a function before calling it
    if (typeof this.props.updateMap === 'function') {
        await this.props.updateMap(component);
    }

    };


    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let styles = state.styles;
        let text = "text";
        
        const styled = this.props.buttonStyle;
        const unStyled = {...styles.buttons.buttonAdd,
        display: "inline-block", height:"fit-content",
        maxWidth: "fit-content", cursor:"pointer",
         marginRight:"1rem",  position: "relative",
         fontSize:styles.fonts.fontSmall};

        let style = this.props.buttonStyle?styled:unStyled;

        const divI = 
                        <div style={{display:"flex", flexDirection:"row", }}>
                        +<img src={this.props?.img} style={{width:"35px", }} />
                        </div>;

        let pText = this.props.text==="imageOnly"?divI:this.props.text;

        return (

            <div  onClick={()=>{
                if(this.props.checkUser){
                    if(state.user.getJson().role!=="GM"){
                        dispatch({ popupSwitch: "goPremium"});
                        return
                      }
                }

               
            }} className='hover-btn hide-on-print' style={{ color:styles.colors.colorWhite+"99", maxWidth:"300px", maxHeight:"30px",
            borderRadius:"11px", fontWeight:"550", width:"fit-content"  }}>

                {this.props.text!=="imageOnly" &&
                <label  htmlFor="file-upload" style={style}>
{(pText) ? pText : "* Choose a banner image"}
                    <input id="file-upload" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        style={{ ...styles.buttons.buttonAdd,
                            position: 'absolute', // Set position to absolute to make it fill the entire label
                            top: 0,
                            left: 0, 
                            cursor:"pointer",
                            padding:this.props.difWidth?this.props.difWidth:"",
                            width:this.props.difWidth?this.props.difWidth:"",
                            height:this.props.difWidth?this.props.difWidth:"",
                            opacity:0, 
                        }} 
                        size="6" 
                        text={text}
                        type="file" 
                        name="file" 
                        onChange={this.changeHandler}/>
                    
                </label>}

                {this.props.text==="imageOnly" &&
                <label  htmlFor="file-upload" style={{
                    display: "inline-block", height:"35px",
                    maxWidth: "fit-content", cursor:"pointer",
                     position: "relative",
                     fontSize:styles.fonts.fontSmall
                }}>
{(pText) ? pText : "* Choose a banner image"}
                    <input id="file-upload" accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        style={{ 
                            position: 'absolute', // Set position to absolute to make it fill the entire label
                            top: 0, 
                            left: 0, cursor:"pointer",
                            width: '100%', 
                            height: '100%',
                            opacity: 0, 
                        }} 
                        size="6" 
                        text={text}
                        type="file" 
                        name="file" 
                        onChange={this.changeHandler}/>
                    
                </label>}
                

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