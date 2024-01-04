import React, { Component } from 'react';
import authService from '../services/auth';
import { Link } from 'react-router-dom';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import logo from '../pics/logoava2.png';

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

        await this.props.app.dispatch({start:false})
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
                        padding:"5%", transition:"all ease-out", justifyContent:"center", flexDirection:"row", display:"flex",
                        width:"100%", paddingTop:"35px",
                        }}>
                           
                        <div 
                        style={{display: "flex", flexDirection:"column", justifyContent:"center", width:"950px", 
                        background:styles.colors.color2+"2e", borderRadius:"28px", height:"620px", paddingBottom:"40px",
                         alignContent: "center",
                         alignItems: "center",
                         alignSelf: "center",
                        }}>
                                            <img src={logo} style={{width:"214px"}}/>
                            
                            <div style={{opacity:".94",  paddingBottom:"40px", width:"fit-content" }}>
                            

                        {/* <div style={{fontFamily: styles?.fonts?.fontTitle, fontSize: styles?.fonts?.fontHeader5, color: styles?.colors?.color5}}>Login</div>                      */}
                     <div style={{}} title={"Enter account email."}>
                    
                     <ParentFormComponent  id="last"   
                            onChange={this.handleChange} name="email" 
                            wrapperStyle={{display:"flex",flexDirection:"column", }}
                            theme={"adventureLog"} rows={1}
                            maxLength={110}
                            labelStyle={{color:styles.colors.color3, marginTop:".4rem", marginBottom:"7px", }}
                            inputStyle={{minWidth:"300px", padding:"4px 9px", color:"#ffffff25", height:"1.6rem", rows:"1", 
                              fontSize:"1rem", 
                              borderRadius:"4px", background: styles.colors.color2+"5c", borderWidth:"0px", 
                              alignItems:"left",textAlign:"left",justifyContent:"center",
                              }}
                            label="Email"
                            />

                        </div>

                       
                             <div style={{color:styles.colors.color3, marginTop:".4rem", marginBottom:"7px", marginTop:"22px"}}>Password</div>
                            <input autoComplete='off' style ={{width:"344px", padding:"4px 9px", color:"#ffffff25", height:"1.6rem", rows:"1", 
                              fontSize:"1rem", border:"1px solid "+styles.colors.color8,                          
                              borderRadius:"4px", background: styles.colors.color2+"5c", borderWidth:"0px", 
                              alignItems:"left",textAlign:"left",justifyContent:"center",}} type="password" id="pwd"   onChange={this.handleChange} name="password"/>
                        
                        
                         </div>


                        <div style={{display:"flex",flexDirection:"column", justifyContent:"center", width:"fit-content",}}>
                         <button className="hover-btn" 
                         style={{...styles?.buttons?.buttonAdd, marginTop:"24px", padding:"8px 34px", width:"155px",  border:"1px solid "+styles.colors.color8, 
                         color: styles?.colors?.color3, fontSize: styles?.fonts?.fontSubheader1,}} 
                         class="hover-btn" onClick={this.handleSubmission}>
                            Login</button>
                    
                     
                     <Link style={{...styles?.buttons?.buttonAdd, marginTop:"24px", padding:"8px 19px", width:"155px",
                         color: styles?.colors?.colorWhite+"98", fontSize: styles?.fonts?.fontNormal,}}  to ="../register">Register</Link></div>
                     </div>
                 </div>
             )
    }
	
}