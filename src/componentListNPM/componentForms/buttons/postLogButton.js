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
       

        
        
        let obj = this.props?.obj;
        let type = obj?obj.getJson()?.type:"message";

        let altText = this.props.altText? "this "+type+"'s "+this.props.altText:"";
        let titleMessage = "Send "+altText+" to the Adventure Log. Everyone in your campaign will be able to see this.";
        
        let isVisible = (type==="lore" && this.props.val)||(type==="image")||(type==="encounter")?"true":"false";

        let newType = (this.props.forceValue && this.props.val)?this.props.val:'';
        
        return (
            <div className='hover-btn'
            style={{display: "flex", flexDirection: "row", justifySelf: "flex-end", cursor:this.state.showSaved?"progress":"auto",
            width: "fit-content", marginRight:this.props.marginRight?this.props.marginRight:"0px"}}>
                 {this.state.showSaved && (
                  <div className="saved-animation" style={{color:styles.colors.color9,
                  position:"sticky",
                  fontSize:styles.fonts.fontSmallest}}> Sent! </div>)}


            <div title={isVisible==="true"?titleMessage:""} style={{
            backgroundColor:styles.colors.color9+"68", 
            height:"fit-content",
            opacity:isVisible==="true"?"100%":"0%",
             borderRadius:"11px",padding:"2px", 
            pointerEvents:this.state.showSaved?"none":"all",
            }}
                                onClick={() => {


                                    if (isVisible==="true"){

                                        type!=="encounter"?sendToChatService.dispatchLog(obj, app, this.props?.campaignId, newType)
                                        :
                                        //ENCOUNTER MUST HAVE CAMPAIGN ID
                                        sendToChatService.dispatchLog(obj, app, this.props?.campaignId)

                                    }else{console.log("Nothing to Send")}

                                    if (this.state.showSaved === false)
                                    {
                                       
                                        this.setState({showSaved:true});
                                        setTimeout(() => this.setState({ showSaved: false }), 2000);
                                    }
                                    
                                }}
            >
                <div style={{...styles.buttons.buttonClear, transition:"all",
                    cursor:isVisible==="true"?"pointer":"auto",
                                width:"fit-content",
                color:styles.colors.colorWhite, padding:"2px 12px", fontSize:styles.fonts.fontSmall, borderRadius:"11px"
            }}
                    
                >{this.props.text? this.props.text: "Log"}</div>

                

            </div>
                   
            
            </div>
        );
    }
}



export default PostLogButton;