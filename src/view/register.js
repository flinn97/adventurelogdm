import React, { Component } from 'react';
import auth from '../services/auth';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import { Link } from 'react-router-dom';
import logo from '../pics/logoava2.png';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmission = this.handleSubmission.bind(this);

        this.state = {
            user: undefined,
            password: ""

        }
    }
    async componentDidMount() {
        debugger
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let componentList = state.componentList;
        let user = await state.opps.cleanPrepare({ adduser: 1 });
        user = user.add[0];
        await user.setCompState({role:"GM"})
        this.setState({ user: user })

    }


    async handleSubmission() {
        debugger
        let app = this.props.app;
        let state = app.state;
        let user = this.state.user;
        let email = user.getJson().email;
        let password = this.state.password;
        await app.dispatch({email:email});
        await auth.register(email,password, true);
        await state.opps.run();

        window.open('https://buy.stripe.com/3csdTd12T5LB2Ck7ss', '_blank');
    };

    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let componentList = state.componentList;

        let styles = state.styles;

        const iStyle = {width:"344px", padding:"4px 9px", color:styles.colors.colorWhite, height:"1.6rem", rows:"1", 
        fontSize:"1rem",  border:"3px solid "+styles.colors.color8, 
        borderRadius:"4px", background: styles.colors.color2+"5c", borderWidth:"0px", 
        alignItems:"left",textAlign:"left",justifyContent:"center",};

        const wStyle ={display:"flex", flexDirection:"column", marginTop:"8px"};
        const lStyle ={color:styles.colors.color3, fontSize:"1rem"};
        const additionalStyle ={color:styles.colors.color8, padding:"11px", fontSize:".9rem"}

        return (
            <div style={{
                padding:"5%", transition:"all ease-out", justifyContent:"center", flexDirection:"row", display:"flex",
                width:"100%",padding:"33px", paddingTop:"35px", 
            }}>
                
                <div style={{width:"8%", }}>
<img src={logo} style={{width:"84px", height:"84px", justifySelf:"center"}}/></div>                 

                {this.state.user && (
                    
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent:"center", alignContent:"center", 
                    justifyItems:"center", width:"500px", backgroundColor:styles.colors.color8+"0a", borderRadius:"22px",padding:"33px"}}>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent:"center", alignContent:"center",}} >
                        
                    <div style={{...lStyle, color:styles.colors.color8, marginBottom:"22px", fontSize:'1.1rem'}}>Registering as GM</div>
                        <ParentFormComponent obj={this.state.user} name="firstName" label="First Name"  
                        labelStyle ={lStyle} theme={"adventureLog"}autoComplete="off"
                        inputStyle={iStyle} wrapperStyle={wStyle}/>

                        <ParentFormComponent obj = {this.state.user} name= "lastName" label="Last Name" 
                        labelStyle ={lStyle}   theme={"adventureLog"} autoComplete="off"                    
                        inputStyle={iStyle} wrapperStyle={wStyle}/>

                        {/* <ParentFormComponent obj = {this.state.user} name= "handle" label="Handle" 
                        labelStyle ={{color:"white"}} 
                        inputStyle={iStyle} wrapperStyle={wStyle}/> */}

                        <ParentFormComponent obj={this.state.user} name= "email" label="Email" 
                      theme={"adventureLog"} 
                        labelStyle ={lStyle} autoComplete="off" type="text" 
                        inputStyle={iStyle} wrapperStyle={wStyle}/>

                        <div style={wStyle}>
                        <div style ={lStyle}>Password</div>

                        <input name ="password" type='password' style={iStyle} theme={"adventureLog"} autoComplete="off" 
                                onChange={(e)=>{
                                    let { name, value } = e.target;
                                    this.setState({
                                        password: value
                                    })

                                }}
                        />
                        </div>
                        <div className='hover-btn' style={{...styles?.buttons?.buttonAdd, marginTop:"24px", padding:"8px 34px", width:"355px",  border:"1px solid "+styles.colors.color8, 
                         color: styles?.colors?.color3, fontSize: styles?.fonts?.fontSmall,}} onClick={this.handleSubmission}>
                            Continue to Payment
                        </div>
                        
                        
                    </div> </div>

                )}
                <div style={{display:"flex", flexDirection:"column", 
                        marginLeft:"13px",  width:"300px", padding:"10px", 
                        }}>
                            <div className='hover-btn' style={{ border:"1px solid "+styles.colors.color8+'9e', borderRadius:"22px", padding:"10px", }}>
                <Link  style={{...styles?.buttons?.buttonClear, padding:"10px", height:"fit-content",
                 textDecoration:"none",border:"1px solid "+styles.colors.color1, color:styles.colors.colorWhite+"e9",
                     borderRadius:"22px",  width:"255px", alignSelf:"flex-start", fontSize:styles.fonts.fontSmall}}
                      to="../playerregister" >Register as a Player</Link>
                      </div>
                     
                     
                      <Link  className='hover-btn' style={{...styles?.buttons?.buttonAdd, marginTop:"24px", 
                      padding:"8px 14px", width:"280px",  border:"1px solid "+styles.colors.color8,
                         color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall,}} to="../login" >Back to Login</Link></div>


            </div>
        )
    }

}