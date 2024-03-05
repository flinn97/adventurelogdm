import { Component } from 'react';

import auth from '../../services/auth';


export default class Approve extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
   

    return (
     
      <div style={{marginLeft:"100px"}} onClick={async()=>{
        debugger
        let approval = this.props.obj
        let email = approval.getJson().owner
        let user = await state.componentList.getComponent("user", email, "_id")

        if(!user){
        user = await auth.firebaseGetter(email, state.componentList, "_id", "user")
        user = user[0]
        }
        user.setCompState({partner:true,})
        user.operationsFactory.cleanPrepareRun({update:user, del: approval})
      }}>
        yes
    </div>
    

    )
  }
}

