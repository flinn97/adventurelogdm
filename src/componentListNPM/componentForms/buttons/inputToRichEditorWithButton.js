import React, { Component } from 'react';
import authService from '../../services/auth';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmission=this.handleSubmission.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.state={
            selectedFile: undefined,
            path: undefined,
            email: "",
            password: ""
        }
    }

	handleChange = async (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
        
	};


	async handleSubmission()  {
        //debugger
        await authService.login(this.state.email, this.state.password, this.props.app.state.componentList, this.props.app.dispatch)

        
        
	};
    render(){
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let component = state.currentComponent;
       
        let styles =state.styles;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        let key =compJson?.collection? "update": "add";
        return(
                    <div style={{
                        
                        width: "98vw", 
                        borderRadius: styles?.borders?.radius1,
                        marginLeft:"1vw",
                        marginTop:"3vh",
                        minHeight: "88vh",
                        maxHeight: "50vh",
                        background: styles?.colors?.Grey1,
                        boxShadow: styles?.shadows?.homeShadow,
                        paddingTop: "2vh",
                        paddingLeft: "1vw",
                        paddingRight: "1vw",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        }}>
                        <div 
                        style={{display: "flex", flexDirection:"column", justifyContent:"center",
                         alignContent: "center",
                         alignItems: "center",
                         alignSelf: "center",
                        marginTop:styles?.margins?.marginSmallH, width:"100%"}}>
                        <div style={{fontFamily: styles?.fonts?.fontTitle, fontSize: styles?.fonts?.fontHeader5,}}>Login</div>                     
                     <div style={{marginTop:"2vh",}} >
                    
                            <label htmlFor="lastName"><div style={{fontFamily: styles?.fonts?.fontNormal, marginRight: styles?.margins?.marginSmallW, fontSize: styles?.fonts?.fontHeader1,}}>Email</div></label>
                            <input style ={{fontFamily: styles?.fonts?.fontNormal, height: "3vh", width: "18vw",
                    borderWidth: styles?.mySpawn?.border ,}} type="text" id="last"   onChange={this.handleChange} name="email"/>
                        </div>
                        <div style={{marginTop:"2vh", marginBottom:styles?.margins?.marginSmallH}} >
                            <label htmlFor="lastName"><div style={{fontFamily: styles?.fonts?.fontNormal,marginRight: styles?.margins?.marginSmallW, fontSize: styles?.fonts?.fontHeader1,}}>Password</div></label>
                            <input  style ={{fontFamily: styles?.fonts?.fontNormal, height: "3vh",
                    borderWidth: styles?.mySpawn?.border, width: "18vw"}} type="password" id="pwd"   onChange={this.handleChange} name="password"/>
                        </div>
                        <div>
                         <button style={{...styles?.buttons?.buttonFollow, marginTop:"2vh", fontSize: styles?.fonts?.fontHeader2,}} class= "btn" onClick={this.handleSubmission}>Login</button>
                    
                     </div>
                     </div>
                 </div>
             )
    }
	
}