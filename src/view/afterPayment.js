import React, { Component } from 'react';
import auth from '../services/auth';
import SplashScreen from './pages/splashScreen';
import { Link } from 'react-router-dom';
import toolService from '../services/toolService';


export default class AfterPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            password: "",
            showLoad: true,
        }
    }

    async componentDidMount() {


        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let componentList = state.componentList;
        let user = await auth.getCurrentUser();
        
        if(user!=="undefined"){

        
        user = JSON.parse(user);
        user = await auth.firebaseGetter(user.email, componentList, "email", "user");
        user = user[0]
        if (user) {
            fetch('https://checkcustomer-x5obmgu23q-uc.a.run.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.getJson().email }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(customers => {
                    console.log('Customers:', customers);
                    let u = customers[0];
                    console.log(u)
                    if(u){
                    if (!u.delinquent) {
                        user.setCompState({paidCustomer:true});
                        state.opps.cleanPrepareRun({update: user});
                    }
                    else{
                        auth.logout().then(()=>{
                            window.location.href = "./"
                        })
                    }
                }
                else{
                    auth.logout().then(()=>{
                        window.location.href = "./"
                    })
                }
                    // Do something with the customers data
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    auth.logout().then(()=>{
                        window.location.href = "./"
                    })

                    // Handle the error
                });

        }
        else{
            window.location.href = "./"

        }
    }
    else{
        window.location.href = "./"

    }
    }

    componentDidUpdate() {
        if (this.props.app.state.dispatchComplete) {
            debugger
            this.props.app.dispatch({ dispatchComplete: false });
            window.location.href = "./"
        }
    }





    render() {
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let componentList = state.componentList;

        let styles = state.styles;


        return (
            <div style={{
                width: "100%", display: "flex", flexDirection: "row", justifyContent: "center",
                height: "100%", userSelect: "none",
            }}>

                <SplashScreen
                    options={{ cardType: "bigCardBorderless" }} app={app} isPurchase={true}
                    containerStyle={{ background: styles.colors.color2, zIndex: 55000, }}

                />


                <div style={{ color: 'white', height: "300px", position: "absolute", userSelect: "none", top: 200, justifySelf: "center", fontSize: styles.fonts.fontNormal }}>Thank you for your purchase, rerouting...</div>
                {auth.getCurrentUser() &&
                    <Link to={"/"} style={{
                        color: 'white', height: "fit-content", position: "absolute", top: 288, justifySelf: "center", cursor: "pointer",
                        zIndex: 8000, textDecoration: "underline 1px " + styles.colors.color9, textUnderlineOffset: "2.8px",
                        fontSize: styles.fonts.fontSmall
                    }}>Click here if the page doesnt load</Link>
                }
            </div>


        )
    }

}