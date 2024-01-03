import React, { Component } from 'react';
import auth from '../services/auth';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import { Link } from 'react-router-dom';

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
        user = user.add[0]
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
                {this.state.user && (
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                        <ParentFormComponent obj={this.state.user} name="firstName" label="First Name"  labelStyle ={{color:"white"}}/>
                        <ParentFormComponent obj = {this.state.user} name= "lastName" label="Last Name" labelStyle ={{color:"white"}}/>
                        <ParentFormComponent obj = {this.state.user} name= "handle" label="Handle" labelStyle ={{color:"white"}}/>
                        <ParentFormComponent obj = {this.state.user} name= "email" label="Email" labelStyle ={{color:"white"}}/>
                        <div style ={{color:'white'}}>password</div>
                        <input name ="password"  style={{width:"200px"}} onChange={(e)=>{
                             let { name, value } = e.target;
                             this.setState({
                                 password: value
                             })

                        }}/>
                        <div style={{color:"white"}} onClick={this.handleSubmission}>
                            Submit
                        </div>
                        <Link to="../login" >Login</Link>
                        <Link to="../playerregister" >Register As Player Instead</Link>

                    </div>

                )}

            </div>
        )
    }

}