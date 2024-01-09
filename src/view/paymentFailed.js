import React, { Component } from 'react';
import auth from '../services/auth';
import SplashScreen from './pages/splashScreen';


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
                width:"100%", display:"flex", flexDirection:"row", justifyContent:"center",
                height:"100%",     userSelect:"none",
            }}>
                 <SplashScreen
        options={{cardType:"bigCardBorderless"}} app={app} isPurchase={true}
        containerStyle={{background:styles.colors.color2, zIndex:55000,}}
        
      />    <div style={{color:'white', height:"300px", position:"absolute", userSelect:"none", top:200, justifySelf:"center", fontSize:styles.fonts.fontNormal}}>
                <div style={{color:'white'}}>It looks like you haven't paid for access yet. Please try again: 
                <a href="https://buy.stripe.com/3csdTd12T5LB2Ck7ss">Link</a></div>
                </div>
            </div>
        )
    }

}