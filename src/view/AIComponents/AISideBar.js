import { Component } from 'react';
import auth from '../../services/auth';
import AICard from './AICard';


export default class AISideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        start:false
    }
  }
  /**
   * TODO: probably check to see if these things exist on the front end before retrieval.
   */
  async componentDidMount(){
    
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let opps = state.opps;
    let componentList= state.componentList
    
    await auth.getByType("chatAssistant",componentList, state.user.getJson()._id);
    let list = componentList.getList("chatAssistant");
    // for clearing for now. 
    //opps.cleanPrepareRun({del:list});
    let currentAssistant =componentList.getComponent("chatAssistant", false, "firstTime");
    if(currentAssistant){
        
        await auth.firebaseGetter(currentAssistant.getJson()._id,componentList,"assistantId", "aiMessage");
        dispatch({
            currentAssistant:currentAssistant
        })
    }
    this.setState({
        start:true
    })
    await auth.getByType("aiRuleset",componentList, state.user.getJson()._id);
    let AIRuleset =componentList.getComponent("aiRuleset");
    if(!AIRuleset){
      let ruleset = await opps.cleanJsonPrepare({addaiRuleset:{ owner: state.user.getJson().owner, type:"aiRuleset"}});
      AIRuleset = ruleset.add[0];
      opps.run();
    }
    
      await dispatch({ AIRuleset: AIRuleset })
     
        await auth.firebaseGetter(AIRuleset.getJson()._id,componentList,"rulesetId", "preference");
  }



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    return (
      <div style={{overflow:"hidden"}}>   
           {this.state.start&&
           <AICard app={app} type="cardWithTab" 
           options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}
           />}               
        
        {/* <hr></hr> */}

      </div>

    )
  }
}
