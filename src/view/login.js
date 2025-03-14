import React, { Component } from 'react';
import authService from '../services/auth';
import { Link } from 'react-router-dom';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import logo from '../pics/logoava2.png';
import google from '../pics/Sign Up/6929234_google_logo_icon.png';
import auth from '../services/auth';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            selectedFile: undefined,
            path: undefined,
            email: "",
            password: "",
            errorMessage: undefined,
        }
    }
    async componentDidMount(){
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let authUser = await auth.handleRedirect()
        if(authUser){
            await auth.redirectGoogleJustSignIn(authUser, state.componentList, dispatch);
        }
    }

    handleChange(event) {
        let { name, value } = event.target;
        
        // If the input field is 'email', convert the value to lowercase
        if (name === "email") {
            value = value.toLowerCase();
        }
    
        this.setState({
            [name]: value
        });
    }
  


    async handleSubmission() {
        


        let user = await authService.login(this.state.email, this.state.password, this.props.app.state.componentList, this.props.app.dispatch);
        if (user.error) {
            this.setState({ errorMessage: user.error });
        }
    };

    handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        if (!this.state.forgot) {
            this.handleSubmission();
        } else {
            this.setState({ errorMessage: "An email was sent to your account." });
            authService.sendForgotPasswordChange(this.state.email);
        }
    };

    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let component = state.currentComponent;

        let styles = state.styles;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        let key = compJson?.collection ? "update" : "add";

        const warning = { color: 'red', marginTop: '10px', fontSize: styles.fonts.fontSmallest, background: "" };


        return (
            <div style={{
                padding: "5%", transition: "all ease-out", justifyContent: "center", flexDirection: "row", display: "flex",
                width: "100%", paddingTop: "38px",
            }}>
                <form onSubmit={this.handleFormSubmit}>
                    <div
                        style={{
                            display: "flex", flexDirection: "column", justifyContent: "center", width: "950px",
                            background: styles.colors.color2 + "2e", borderRadius: "28px", height: "680px", paddingBottom: "40px",
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                        }}>
                        <img src={logo} style={{ width: "214px", userSelect: "none", }} draggable="false" />

                        <div style={{ opacity: ".94", paddingBottom: "40px", width: "fit-content" }}>


                            {/* <div style={{fontFamily: styles?.fonts?.fontTitle, fontSize: styles?.fonts?.fontHeader5, color: styles?.colors?.color5}}>Login</div>                      */}
                            <div style={{ color: styles.colors.color3, marginTop: ".4rem", marginBottom: "7px", marginTop: "22px", fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem" }}>Email</div>
                            <input autoComplete='off' style={{
                                width: "344px", padding: "4px 9px", color: "#ffffffe4", height: window.innerWidth > 800 ? "1.6rem" : "2rem", rows: "1",
                                fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem", border: "1px solid " + styles.colors.colorWhite,
                                borderRadius: "4px", background: styles.colors.color2 + "5c", borderWidth: "0px",
                                alignItems: "left", textAlign: "left", justifyContent: "center",
                            }} id="eml" onChange={this.handleChange} name="email" />





                            {!this.state.forgot && <>
                                <div style={{ color: styles.colors.color3, marginTop: ".4rem", marginBottom: "7px", marginTop: "22px", fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem" }}>Password</div>
                                <input autoComplete='off' style={{
                                    width: "344px", padding: "4px 9px", color: "#ffffffe4", height: window.innerWidth > 800 ? "1.6rem" : "2rem", rows: "1",
                                    fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem", border: "1px solid " + styles.colors.colorWhite,
                                    borderRadius: "4px", background: styles.colors.color2 + "5c", borderWidth: "0px",
                                    alignItems: "left", textAlign: "left", justifyContent: "center",
                                }} type="password" id="pwd" onChange={this.handleChange} name="password" /></>}


                        </div>

                        {this.state.errorMessage && (
                            <div style={{ ...warning, marginTop: "-18px" }}>
                                {this.state.errorMessage}
                            </div>
                        )}

                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "fit-content", }}>
                            <button
                                type="submit"
                                className="hover-btn"
                                style={{
                                    ...styles?.buttons?.buttonAdd, marginTop: "24px", padding: "8px 34px", width: "200px",
                                    border: "1px solid " + styles.colors.colorWhite,
                                    color: styles?.colors?.color3, fontSize: window.innerWidth > 800 ? styles?.fonts?.fontNormal : "1.8rem",
                                }}>
                                {this.state.forgot ? "Submit" : "Login"}
                            </button>



                            <div
                                style={{
                                    display: "flex", flexDirection: "column", justifyContent: "center", width: "200%",
                                    background: "#0000002e", borderRadius: "28px", height: "6px", marginTop: "10px", marginBottom: "-2px",
                                    alignContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center",
                                }}></div>

{!this.state.forgot && ( <div onClick={async()=>{
                        
                         await auth.googleJustSignIn(this.props.app.state.componentList, this.props.app.dispatch);



                    }} className='hover-img' title="Login or Sign Up using your Google Account" style={{
                        ...styles?.buttons?.buttonAdd, marginTop: "12px", background:"",justifyContent: "center",
                        padding: "0px 0px", paddingLeft: "14px",  textDecorationColor:styles.colors.color8,alignItems: "center",
                        color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall, alignContent: "center", alignSelf: "center", textDecoration:"",
                        border:"solid 2px #4285F4F0", borderRadius:"11px",  width: "200px",
                    }}> <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <img src={google} style={{ width: "28px", marginRight: "10px", height: "28px", marginTop: "1.5px" }} />
                        <div style={{background:"#4285F4F0", borderRadius:"0px 8px 8px 0px", padding:"4px 11px", fontSize:"13.87px", textDecoration:"", width:"150px", 
                            textAlign:"center", paddingTop:"6px"}}>Sign in with Google</div>
                        </div>

                    </div>)}

                            <Link className='hover-btn' title="Register as a GM or Player" style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "22px", padding: "8px 19px", width: "200px",
                                color: styles?.colors?.colorWhite + "98", fontSize: window.innerWidth > 800 ? styles?.fonts?.fontNormal : "1.4rem",
                            }} to="../playerregister">Register</Link>
                

                            {this.state.forgot ? (<div onClick={() => { this.setState({ forgot: false }) }} style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "12px", padding: "8px 19px", width: "200px",
                                color: styles?.colors?.colorWhite + "98", fontSize: styles?.fonts?.fontNormal,
                            }} >Back</div>) : (
                                <div className='hover-btn' onClick={() => {
                                    this.setState({ forgot: true })
                                }} style={{
                                    ...styles?.buttons?.buttonAdd, marginTop: "22px", padding: "8px 19px", width: "200px",
                                    color: styles?.colors?.colorWhite + "98", fontSize: window.innerWidth > 800 ? "14px" : "15px", background: "", border: "",
                                }}>Forgot Password?</div>)}
                                

                        </div>
                    </div></form>


            </div>
        )
    }

}