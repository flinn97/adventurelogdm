import React, { Component } from 'react';
import auth from '../services/auth';


export default class AfterPayment extends Component {
    constructor(props) {
        super(props);

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
        let user = await auth.getCurrentUser();
        user = JSON.parse(user);
        user = await auth.firebaseGetter(user.email, componentList, "email", "user");
        user = user[0]
        if(user){
            user.setCompState({paidCustomer:true});
            await state.opps.cleanPrepareRun({update: user});
        }
        


    }

    componentDidUpdate(){
        if(this.props.app.state.dispatchComplete){
            debugger
            this.props.app.dispatch({dispatchComplete:false});
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

                width: "98vw",
                borderRadius: styles?.borders?.radius1,
                marginLeft: "1vw",
                marginTop: "3vh",
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
                <div style={{color:'white'}}>Thank you for your purchase, rerouting to app</div>

            </div>
        )
    }

}