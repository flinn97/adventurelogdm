import React, { Component } from 'react';
import auth from '../services/auth';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import { Link } from 'react-router-dom';
import logo from '../pics/logoava2.png';
// import { useForm } from 'react-hook-form';



export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

        this.state = {
            user: undefined,
            password: "",
            repeatPassword: "",
            errorMessage: undefined,
        }
    }

    async componentDidMount() {
        
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let componentList = state.componentList;
        let user = await state.opps.cleanPrepare({ adduser: 1 });
        user = user.add[0];
        await user.setCompState({ role: "GM" })
        this.setState({ user: user })

    }

    ///TAYLOR
    async validatePassword(password) {
        console.log(password)
        
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUpperCase || !hasSpecialChar) {
            return "Password must contain at least one uppercase letter and one special character. ";
        }

        return true;
    }


    async handleSubmission() {
        let app = this.props.app;
        let state = app.state;
        let user = this.state.user;
        let email = user.getJson().email;

        let password = this.state.password;
        
        let passwordValidationResult = await this.validatePassword(password);
        if (passwordValidationResult !== true) {
            this.setState({ errorMessage: passwordValidationResult });
            return; // Stop the submission if the password validation fails
        }

        let repeatPassword = this.state.repeatPassword;

        this.setState({ errorMessage: undefined });


        if (password !== repeatPassword) {
            this.setState({ errorMessage: "Passwords don't match." });
            return; // Do not proceed if passwords don't match
        }

        if (!email.includes('@') || email.trim() === '') {
            this.setState({ errorMessage: "Invalid email." });
            return; // Do not proceed if email is invalid
        }

        if (!password) {
            this.setState({ errorMessage: "Password can't be empty." });
            return; // Do not proceed if passwords don't match
        }


        // Proceed with registration
        await app.dispatch({ email: email });

        let authUser = await auth.register(email, password, true);

        if (authUser.error) {
            this.setState({ errorMessage: authUser.error });
        } else {
            await state.opps.run();
            window.open('https://buy.stripe.com/3csdTd12T5LB2Ck7ss', '_blank');
        }

    }

    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let componentList = state.componentList;

        let styles = state.styles;

        const iStyle = {
            width: "344px", padding: "4px 9px", color: styles.colors.colorWhite, height: "1.6rem", rows: "1",
            fontSize: "1rem", border: "3px solid " + styles.colors.color8,
            borderRadius: "4px", background: styles.colors.color2, borderWidth: "0px",
            alignItems: "left", textAlign: "left", justifyContent: "center",
        };

        const wStyle = { display: "flex", flexDirection: "column", marginTop: "8px", };
        const lStyle = { color: styles.colors.color3, fontSize: "1rem" };
        const additionalStyle = { color: styles.colors.color8, padding: "11px", fontSize: ".9rem" };
        const warning = { ...iStyle, color: 'red', marginTop: '10px', fontSize: styles.fonts.fontSmallest, background: "" };


        return (
            <div style={{
                padding: "5%", transition: "all ease-out", justifyContent: "center", flexDirection: "row", display: "flex",
                width: "100%", padding: "33px", paddingTop: "35px",
            }}>

                <div style={{ width: "8%", }}>
                    <img src={logo} style={{ width: "84px", height: "84px", justifySelf: "center" }} /></div>

                {this.state.user && (

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: "center", alignContent: "center",
                        justifyItems: "center", width: "500px", backgroundColor: styles.colors.color8 + "0a", borderRadius: "22px", padding: "33px"
                    }}>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignContent: "center", }} >

                            <div style={{ ...lStyle, color: styles.colors.color8, marginBottom: "22px", fontSize: '1.1rem' }}>Registering as GM</div>

                            <div style={{ fontSize: styles.fonts.fontSmallest, color: styles.colors.color5 }}>(All fields are required)</div>

                            <ParentFormComponent obj={this.state.user} name="firstName" label="First Name"
                                labelStyle={lStyle} theme={"adventureLog"} autoComplete="off"
                                inputStyle={iStyle} wrapperStyle={wStyle} />

                            <ParentFormComponent obj={this.state.user} name="lastName" label="Last Name"
                                labelStyle={lStyle} theme={"adventureLog"} autoComplete="off"
                                inputStyle={iStyle} wrapperStyle={wStyle} />

                            {/* <ParentFormComponent obj = {this.state.user} name= "handle" label="Handle" 
                        labelStyle ={{color:"white"}} 
                        inputStyle={iStyle} wrapperStyle={wStyle}/> */}

                            <ParentFormComponent obj={this.state.user} name="email" label="Email"
                                theme={"adventureLog"}
                                labelStyle={lStyle} autoComplete="off" type="text"
                                inputStyle={iStyle} wrapperStyle={wStyle} />

                            <div style={wStyle}>
                                <div style={lStyle}>Password</div>

                                <input name="password" type='password' style={iStyle} theme={"adventureLog"} autoComplete="off"
                                    onChange={(e) => {
                                        let { name, value } = e.target;
                                        this.setState({
                                            password: value
                                        })

                                    }}
                                />
                            </div>

                            <div style={wStyle}>
                                <div style={lStyle}>
                                    Repeat Password
                                </div>

                                <input
                                    name="repeatPassword"
                                    type="password"
                                    style={iStyle}
                                    theme={"adventureLog"}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        this.setState({ repeatPassword: e.target.value, passwordMismatch: false })
                                    }}
                                />
                            </div>



                            {this.state.errorMessage && (
                                <div style={{ ...warning }}>
                                    {this.state.errorMessage}
                                </div>
                            )}


                            <div className='hover-btn' style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "24px", padding: "8px 34px", width: "355px", border: "1px solid " + styles.colors.color8,
                                color: styles?.colors?.color3, fontSize: styles?.fonts?.fontSmall,
                            }} onClick={this.handleSubmission}>
                                Continue to Payment
                            </div>

                            <Link className='hover-img' style={{
                        ...styles?.buttons?.buttonAdd, marginTop: "24px", background:"",
                        padding: "8px 14px", width: "280px", border: "", boxShadow:"", textDecoration:"underline 1px", textUnderlineOffset:"3px", textDecorationColor:styles.colors.color8,
                        color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall, alignContent:"center", alignSelf:"center",
                    }} to="../login" >Back to Login</Link>
                        </div> </div>

                )}
                <div style={{
                    display: "flex", flexDirection: "column",
                    marginLeft: "13px", width: "300px", padding: "10px",
                }}>
                    <div className='hover-btn' style={{ border: "1px solid " + styles.colors.color8 + '9e', borderRadius: "22px", padding: "10px", }}>
                        <Link style={{
                            ...styles?.buttons?.buttonClear, padding: "10px", height: "fit-content",
                            textDecoration: "none", border: "1px solid " + styles.colors.color1, color: styles.colors.colorWhite + "e9",
                            borderRadius: "22px", width: "255px", alignSelf: "flex-start", fontSize: styles.fonts.fontSmall
                        }}
                            to="../playerregister" >Register as a Player</Link>

                    </div>


                    </div>


            </div>
        )
    }

}