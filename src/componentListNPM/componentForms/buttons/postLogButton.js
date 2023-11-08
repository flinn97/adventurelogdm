import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import sendToChatService from '../../../services/sendToChatService';

class PostLogButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSaved: false, 
        };
    }
     
    render() {
        let app = this.props.app;
        let dispatch = app.dispatch;
        let state = app.state;
        let componentList = state.componentList;
        let styles =state.styles;
       

        let altText = this.props.altText? "this lore's "+this.props.altText:"";
        let titleMessage = "Send "+altText+" to the Adventure Log. Everyone in your campaign will be able to see this.";
        
        let obj = this.props?.obj;
        
        let type = obj.getJson()?.type;
        
        let isVisible = (type==="lore" && obj.getJson().desc)||(type==="image")?"true":"false";
        return (
            <div 
            style={{display: "flex", flexDirection: "row", justifySelf: "flex-end", width: "fit-content"}}>
                 {this.state.showSaved && (
                  <div className="saved-animation" style={{color:styles.colors.color9,
                  position:"sticky",
                  fontSize:styles.fonts.fontSmallest}}> Sent! </div>)}


            <div title={isVisible==="true"?titleMessage:""} style={{
            backgroundColor:styles.colors.color9+"68", 
            opacity:isVisible==="true"?"100%":"0%",
             borderRadius:"11px",padding:"2px", }}
                                onClick={() => {
                                    
                                    if (isVisible==="true"){
                                        sendToChatService.dispatchLog(obj, dispatch)
                                    }else{console.log("Nothing to Send")}

                                    if (this.state.showSaved === false)
                                    {
                                        console.log((this.state.showSaved))
                                        this.setState({showSaved:true});
                                        setTimeout(() => this.setState({ showSaved: false }), 2000);
                                    }
                                }}
            >
                <div style={{...styles.buttons.buttonClear, transition:"all",
                    cursor:isVisible==="true"?"pointer":"auto",

                color:styles.colors.colorWhite, padding:"2px", fontSize:styles.fonts.fontSmall, borderRadius:"11px"
            }}
                    
                >{this.props.text? this.props.text: "Log"}</div>

                

            </div>
                   
            
            </div>
        );
    }
}



export default PostLogButton;