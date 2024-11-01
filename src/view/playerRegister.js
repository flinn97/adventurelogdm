import React, { Component } from 'react';
import auth from '../services/auth';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import { Link } from 'react-router-dom';
import logo from '../pics/logoava2.png';
import google from '../pics/Sign Up/6929234_google_logo_icon.png';

// import { useForm } from 'react-hook-form';

export default class PlayerRegister extends Component {
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
        await user.setCompState({ role: "player", paidCustomer: true })
        this.setState({ user: user })
        let authUser = await auth.handleRedirect()
        if(authUser){
            await auth.redirectGoogleSignIn(authUser, dispatch);
            await this.state.user.setCompState({ email: authUser.email, _id: authUser.email });
            await state.opps.run();
            await auth.getuser(authUser.email, componentList, dispatch);



        }


    }
    ///TAYLOR
    async validatePassword(password) {

        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUpperCase || !hasSpecialChar) {
            return "Password must contain at least one uppercase letter and one special character. ";
        }

        return true;
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: name === "email" ? value.toLowerCase() : value
        });
    }

    async handleSubmission() {

        let app = this.props.app;
        let state = app.state;
        let user = this.state.user;
        let email = user.getJson().email.toLowerCase();
        let password = this.state.password;
        let repeatPassword = this.state.repeatPassword;

        this.setState({ errorMessage: undefined });


        let passwordValidationResult = await this.validatePassword(password);
        if (passwordValidationResult !== true) {
            this.setState({ errorMessage: passwordValidationResult });
            return; // Stop the submission if the password validation fails
        }

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
        user.setCompState({ email: email, owner: email, _id: email })
        await app.dispatch({ email: email });

        let authUser = await auth.register(email, password, true);

        // await auth.register(email, password, true);
        if (authUser.error) {
            this.setState({ errorMessage: authUser.error });
        } else {
            const newUrl = '../';
            window.history.pushState(null, '', newUrl);
            await state.opps.run();
            await auth.login(email, password, this.props.app.state.componentList, this.props.app.dispatch);


        }


    };




    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let componentList = state.componentList;

        let styles = state.styles;

        const iStyle = {
            width: "344px", padding: "4px 9px", color: styles.colors.colorWhite, height: window.innerWidth > 800 ? "1.6rem" : "1.7rem", rows: "1",
            fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem", border: "3px solid " + styles.colors.color8,
            borderRadius: "4px", background: styles.colors.color2, borderWidth: "0px",
            alignItems: "left", textAlign: "left", justifyContent: "center",
        };

        const wStyle = { display: "flex", flexDirection: "column", marginTop: "8px" };
        const lStyle = { color: styles.colors.color3, fontSize: window.innerWidth > 800 ? "1rem" : "1.4rem" };
        const additionalStyle = { color: styles.colors.color8, padding: "11px", fontSize: window.innerWidth > 800 ? ".9rem" : "1.3rem" };
        const warning = { ...iStyle, color: 'red', marginTop: '10px', fontSize: styles.fonts.fontSmallest, background: "" };

        return (
            <div
                className={window.innerWidth > 800 ? '' : 'scroller'}
                style={{
                    padding: window.innerWidth > 800 ? "5%" : "2px", transition: "all ease-out", justifyContent: "center", flexDirection: window.innerWidth > 800 ? "row" : "column", display: "flex",
                    width: "100%", padding: "33px", paddingTop: "35px",
                }}>
                <div style={{ width: "8%", }}>
                    <img src={logo} style={{ width: "84px", height: "84px", justifySelf: "center" }} /></div>
                {this.state.user && (

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: "center", alignContent: "center",
                        justifyItems: "center", width: window.innerWidth > 800 ? "500px" : "100%", backgroundColor: window.innerWidth > 800 ? styles.colors.color8 + "0a" : "", borderRadius: "22px", padding: window.innerWidth > 800 ? "33px" : "20px",
                    }}>


                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignContent: "center", }} >

                            <div style={{ ...lStyle, color: "#f1f8fff7", marginBottom: window.innerWidth > 800 ? "22px" : "10px", fontSize: window.innerWidth > 800 ? '1.15rem' : "1.45rem" }}>Registering Free Account</div>
                            <div onClick={async () => {
                                const newUrl = '../';
                                window.history.pushState(null, '', newUrl);
                                
                                let user = await auth.googleSignIn(state.componentList, app.dispatch);
                                await this.state.user.setCompState({ email: user.email, _id: user.email });
                                await state.opps.run();
                                await auth.getuser(user.email, componentList, dispatch);

                            }} className='hover-img' title="Login or Sign Up using your Google Account" style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "-4px", background: "", marginBottom: "14px", padding: "0px 0px",
                                paddingLeft: "14px", textDecoration: "underline 1px", textUnderlineOffset: "3px", textDecorationColor: styles.colors.color8,
                                color: "white", fontSize: styles?.fonts?.fontSmall, alignContent: "center", alignSelf: "center", textDecoration:"",
                                border:"solid 2px #4285F4F2", borderRadius:"11px"
                            }}> <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <img src={google} style={{ width: "24px", marginRight: "11.5px", height: "24px", marginTop: "2.5px" }} />
                                <div style={{background:"#4285F4F2", borderRadius:"0px 8px 8px 0px", padding:"4px 11px", fontSize:"18.2px", textDecoration:""}}>Sign up with Google</div>
                                </div>

                            </div> <div style={{ alignSelf: "center" }}>or</div>
                            
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
                                theme={"adventureLog"} handleChange={this.handleChange}
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
                                <div style={lStyle}>Repeat Password</div>
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
                            </div><div style={{ fontSize: styles.fonts.fontSmallest, color: styles.colors.color5, marginTop:"11px", alignSelf:"flex-end" }}>(All fields are required)</div>

                            {this.state.errorMessage && (
                                <div style={{ ...warning }}>
                                    {this.state.errorMessage}
                                </div>
                            )}

                            <div className='hover-btn' style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "25px", padding: "8px 34px", width: window.innerWidth > 800 ? "355px" : "100%", border: "1px solid " + styles.colors.color8,
                                color: styles?.colors?.color3, fontSize: window.innerWidth > 800 ? styles?.fonts?.fontSmall : "1.4rem",
                            }} onClick={this.handleSubmission}>
                                Submit
                            </div>

                            <Link className='hover-img' style={{
                                ...styles?.buttons?.buttonAdd, marginTop: "24px", background: "",
                                padding: "8px 14px", width: "280px", border: "", boxShadow: "", textDecoration: "underline 1px", textUnderlineOffset: "3px", textDecorationColor: styles.colors.color8,
                                color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall, alignContent: "center", alignSelf: "center",
                            }} to="../login" >Back to Login</Link>

                            {/* <div onClick={async()=>{
                        const newUrl = '../';
                        window.history.pushState(null, '', newUrl);
                                        await state.opps.run();
                        await auth.twitterSignIn(state.componentList, app.dispatch)

                    }} className='hover-img' style={{
                        ...styles?.buttons?.buttonAdd, marginTop: "24px", background:"",
                        padding: "8px 14px", width: "280px", border: "", boxShadow:"", textDecoration:"underline 1px", textUnderlineOffset:"3px", textDecorationColor:styles.colors.color8,
                        color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall, alignContent:"center", alignSelf:"center",
                    }}>Sign Up With X</div> */}


                        </div> </div>

                )}
                <div style={{
                    display: "flex", flexDirection: "column",
                    marginLeft: "13px", width: "300px", padding: "10px",
                }}><div style={{ border: "1px solid " + styles.colors.color9 + '9e', borderRadius: "22px", padding: "10px", }}>
                        <Link className='hover-btn' style={{
                            ...styles?.buttons?.buttonClear, padding: "10px", height: "fit-content", textDecoration: "none", border: "1px solid " + styles.colors.color1,
                            borderRadius: "22px", width: "255px", alignSelf: "flex-start", fontSize: styles.fonts.fontSmall
                        }}
                            to="../register" >Register Premium Account</Link>

                        <div style={{ ...additionalStyle, color: styles.colors.color9 + "d0" }}>With a Premium Account you can: </div>
                        <div style={additionalStyle}>&#x2022; Build Campaigns </div>
                        <div style={additionalStyle}>&#x2022; Create Worlds and Lore</div>
                        <div style={additionalStyle}>&#x2022; Customize Encounters </div>
                        <div style={additionalStyle}>&#x2022; Upload Galleries and Maps </div>
                        <div style={additionalStyle}>&#x2022; Customize Lore-Points </div>
                        <div style={{ ...additionalStyle, marginBottom: "-29px" }}></div>


                    </div>
                    {/* <Link className='hover-btn' style={{
                        ...styles?.buttons?.buttonAdd, marginTop: "24px",
                        padding: "8px 14px", width: "280px", border: "1px solid " + styles.colors.color8,
                        color: styles?.colors?.colorWhite, fontSize: styles?.fonts?.fontSmall,
                    }} to="../login" >Back to Login</Link> */}
                </div>

            </div>
        )
    }

}