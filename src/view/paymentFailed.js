import React, { Component } from 'react';
import auth from '../services/auth';


export default class PaymentFailed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            password: ""

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
                <div style={{color:'white'}}>It looks like you didn't pay for the app yet Please follow this <a href="https://buy.stripe.com/3csdTd12T5LB2Ck7ss">Link</a> to pay for the app</div>

            </div>
        )
    }

}