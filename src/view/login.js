import React, { Component } from 'react';
import authService from '../services/auth';
import { Link } from 'react-router-dom';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import logo from '../pics/logoava2.png';
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
                width: "100%", paddingTop: "35px",
            }}>
                <form onSubmit={this.handleFormSubmit}>
                    <div
                        style={{
                            display: "flex", flexDirection: "column", justifyContent: "center", width: "950px",
                            background: styles.colors.color2 + "2e", borderRadius: "28px", height: "620px", paddingBottom: "40px",
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
                            }} id="pwd" onChange={this.handleChange} name="email" />





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
                                    ...styles?.buttons?.buttonAdd, marginTop: "24px", padding: "8px 34px", width: "155px",
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

                            <Link className='hover-btn' title="Register as a GM or Player" style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "12px", padding: "8px 19px", width: "155px",
                                color: styles?.colors?.colorWhite + "98", fontSize: window.innerWidth > 800 ? styles?.fonts?.fontNormal : "1.4rem",
                            }} to="../playerregister">Register</Link>
                <div onClick={async()=>{
                        const newUrl = '../';
                        debugger
                         await auth.googleJustSignIn(this.props.app.state.componentList, this.props.app.dispatch);



                    }} className='hover-img' style={{
                        ...styles?.buttons?.buttonAdd, marginTop: "24px", background:"",
                        padding: "8px 14px", width: "280px", border: "", boxShadow:"", textDecoration:"underline 1px", textUnderlineOffset:"3px", textDecorationColor:styles.colors.color8,
                        color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall, alignContent:"center", alignSelf:"center",
                    }}>Sign Up With Google</div>

                            {this.state.forgot ? (<div onClick={() => { this.setState({ forgot: false }) }} style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "12px", padding: "8px 19px", width: "155px",
                                color: styles?.colors?.colorWhite + "98", fontSize: styles?.fonts?.fontNormal,
                            }} >Back</div>) : (
                                <div className='hover-btn' onClick={() => {
                                    this.setState({ forgot: true })
                                }} style={{
                                    ...styles?.buttons?.buttonAdd, marginTop: "12px", padding: "8px 19px", width: "155px",
                                    color: styles?.colors?.colorWhite + "98", fontSize: window.innerWidth > 800 ? "14px" : "15px", background: "", border: "",
                                }}>Forgot Password?</div>)}
                                

                        </div>
                    </div></form>


            </div>
        )
    }

}