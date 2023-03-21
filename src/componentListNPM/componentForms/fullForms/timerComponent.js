import React, { Component } from "react";
import InputFormButtonComponent from "../buttons/inputComponentWithButton.js";
class TimerComponent extends Component {
    constructor(props) {
        super(props);


        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            mCount: 0,
            sCount: 0,
            m2: "0",
            s2: "0",
            timer: false,

            showTimer:true,

        }

    };
 

  render () {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;
    const OPTIONS = { prefix: 'seconds elapsed!', delay: 100}
    

    return (
    <div style= {styles.smallcardGreen}> 
      <div style={{
                        
                        display:"flex", 
                        flexDirection:"row",
                        padding: styles.margins.margin4,
                        fontSize: styles.fonts.fontsizeTitle,
                        fontFamily: styles.fonts.appFont,
                        fontWeight: styles.fonts.fontweightMain,
                        justifycontent:"center",
                        width: "100%", 
                        paddingBottom:"0px",
                        marginLeft:styles.mystudents.studentMargin,
                        color: this.props.app.state.styles.colors.color6,
                        letterSpacing: styles.fonts.appSpacing2,  
                       
                       
                     }}> <div style={{cursor:"pointer"}} onClick={()=>{this.setState({showTimer:true, s2:"0", m2:"0", mCount:0, sCount:0})}}>Timer/</div><div style={{cursor:"pointer"}} onClick={()=>{this.setState({showTimer:false, s2:"0", m2:"0", mCount:0, sCount:0})}}>Stop Watch</div>
    </div>
        
        <div style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                    marginTop: this.props.app.state.ipad? "-7px": "",
                    border: styles.borders.borderthin,
                    // marginTop: state.styles.margins.margin4,
                    // marginBottom: -state.styles.margins.margin4,
                    color: styles.colors.colorBackground,
                    fontSize: window.innerHeight<725? "4vh":"6vh",
                    fontWeight: styles.fonts.fontweightMed,
                    background: styles.colors.color1,                  
                    outline: "none",
                    float:"left",
                    letterSpacing: "2px",
                    
        }}> 
            {this.state.m2}{this.state.mCount}:
            
            {this.state.s2}{this.state.sCount}
        
        </div>
        {this.state.showTimer&&
        <div style ={{
            justifyContent: "space-around",
            textAlign: "center",
            alignContent: "center",
            width:"100%",
            fontSize: this.props.app.state.styles.fonts.fontsize1,
            fontWeight: this.props.app.state.styles.fonts.fontweightMed,
            color: this.props.app.state.styles.colors.color6 +"aa",
            justifyContent: "center",
            alignContent: "center",
            letterSpacing: styles.fonts.appSpacing,

        }}>
        <InputFormButtonComponent wrapperStyle={{width:"100%", justifyContent:"center", display:"flex", alignItems:"center"}} buttonStyle={
            {marginLeft:"10px", borderRadius:"7px", height:"40px", width:"80px", backgroundColor:"#6C86F4", 
            cursor:"pointer",color:"white", justifyContent:"center", alignItems:"center", display:"flex"}
        } inputStyle={{width:"100px"}} buttonText="Submit" handleChange={async (value)=>{
            
                                   if(parseInt(value)){
                                    if(parseInt(value)>99){
                                        value="99";
                                    }
                                    let m = value.length===1? value: value[1];

                                    let m2 = value.length===1? "0": value[0];
                                    this.setState({m2:m2, mCount:m, s2:"0", sCount:"0"})
                                   } 
                                
                                }} />
                                </div>}
        <div style ={{
            justifyContent: "space-around",
            textAlign: "center",
            alignContent: "center",
            marginTop: this.state.showTimer? "0px":"1vh", 
            fontSize: this.props.app.state.styles.fonts.fontsize1,
            fontWeight: this.props.app.state.styles.fonts.fontweightMed,
            color: this.props.app.state.styles.colors.color6 +"aa",
            justifyContent: "center",
            alignContent: "center",
            letterSpacing: styles.fonts.appSpacing,

        }}>Minutes</div>


        <div style={{
            display: "flex",
            justifycontent:"center",
            textAlign: "center",
            alignContent: "center",
            
            width: "100%",
            
            alignItems: "center",
            flexDirection:"column",
            marginTop: this.props.app.state.styles.margins.margin4,
            marginTop:this.state.showTimer? "0px":"2vh",
            width: "100%",    
        }}>
<div style= {{
    display: "flex",
    justifycontent:"center",
    flexDirection:"row",
    marginBottom: "12px"
}}>
        <button style={
            {...styles.buttons.buttonRound,
                color: styles.colors.color1, marginRight:"2px"
            }
        } 
                    
                    onClick={ async ()=>{
                        
                        await this.setState({timer:true});

                        while(this.state.timer){
                           
                            if(this.state.timer){
                                if(this.state.showTimer){
                                    
                                    
                                    let sCount = this.state.sCount.toString();
                                    let mCount = this.state.mCount.toString();
                                    let s2 = this.state.s2.toString();
                                    let m2 = this.state.m2.toString();

                                    if(s2==="0" && sCount==="0"){
                                        if(m2==="0" && mCount==="0"){
                                            this.setState({timer:false, sCount:0, mCount:0, s2:0, mCount:0});
                                            break;
                                        
                                        }
                                        else{
                                            if(m2!=="0"&& mCount==="0"){
                                                m2 = parseInt(m2)-1;
                                                mCount="9";
                                                
                                            }
                                            else if(mCount!=="0"){
                                                mCount = parseInt(mCount) - 1;
                                                
                                            }
                                        }
                                        s2 ="5";
                                        sCount="9"
                                    }else{
                                        if(s2!=="0" && sCount==="0" ){
                                            s2= parseInt(s2) -1;
                                            sCount="9";
                                        }
                                        else{
                                            sCount=parseInt(sCount) -1;
                                        }
                                    }
                                    
                                    
                                    this.setState({
                                        mCount:mCount.toString(),
                                        sCount:sCount.toString(),
                                        s2: s2.toString(),
                                        m2: m2.toString()
                                    })
                                }
                                else{
                                let sCount = this.state.sCount+1;
                                let mCount = this.state.mCount;
                                let s2 = "0";
                                let m2 = "0";
                                
                                if(sCount===60){
                                    sCount=1
                                    mCount++;
                                }

                                if(sCount>=10){
                                    s2=""
                                } else {
                                    s2="0"
                                }

                                if(mCount>=10){
                                    m2=""
                                } else {
                                    m2="0"
                                }
                                this.setState({
                                    mCount:mCount,
                                    sCount:sCount,
                                    s2: s2,
                                    m2: m2
                                })

                            }
                               
                            
                            }
                            const delay = ms => new Promise(res => setTimeout(res, ms));
                            await delay(1000);
                           
                        }
                        


                    }}>Start
                    </button>

                    <button 
                        style={{...styles.buttons.buttonRound,
                            color: styles.colors.color1, marginLeft:"2px"}}
                    onClick={()=>{
                        this.setState({timer:false});
                    }}>Stop
                    </button>
                    </div>

                    <button 
                        style={{...styles.buttons.buttonRound,
                            color: styles.colors.color1,}}
                    onClick={()=>{
                        this.setState({timer:false, sCount:0, mCount:0, s2:0, m2:0});
                    }}>Reset
                    </button>
                    </div>   
      
      </div>
    )
  }
}
 
export default TimerComponent