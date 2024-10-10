import React, {Component} from "react";
export default class Success extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let app = this.props.app;
        let state = app.state;
        return(
            <div style={{color:"black", fontSize:"2rem", fontFamily:"inria", justifyContent:"center", display:"flex", flexDirection:"column"}}>
                Payment Successful!
<div style={{color:"#998899",marginTop:"18px", padding: "8px 15px", 
    fontSize:"1.5rem", fontFamily:"inria", width: "fit-content", justifyContent:"center", display:"flex", flexDirection:"column", justifySelf:"center", alignContent:"center",alignSelf:"center" }}>
    Content has been added to your library!

    <a className="App-link" href="https://gms.arcanevaultassembly.com/library" style={{
    
    cursor: "pointer",
    borderRadius:"12px",
    fontSize:"1.45rem",
    fontFamily:"inria", marginTop:"20px",
    color: "#4B0082",alignSelf:"center",
    background:"#11111122",padding: "8px 15px", 
    width: "fit-content", height: "fit-content",
    display: "flex",
    }}>
Go to Library
</a>
</div>


            </div>
        )
    }
}