import { Component } from 'react';
import auth from '../../services/auth';
import AIRulesetCard from './AIRulesetCard';


export default class AIRulesetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        start:false
    }
  }
  async componentDidMount(){
    
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let componentList= state.componentList;
    let opps = state.opps;
    
    await auth.firebaseGetter("aiRuleset",componentList, "type", "aiRuleset" );
    let AIRuleset =componentList.getComponent("aiRuleset");
    if(!AIRuleset){
      let ruleset = await opps.cleanJsonPrepare({addaiRuleset:{ owner: state.user.getJson().owner, type:"aiRuleset"}});
      AIRuleset = ruleset.add[0];
      opps.run();
    }
    
      await dispatch({ AIRuleset: AIRuleset })
     
        await auth.firebaseGetter(AIRuleset.getJson()._id,componentList,"rulesetId", "preference");
        this.setState({
          start:true
      })    
    
  }



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    return (
      <div style={{}}>   
           {this.state.start&&<AIRulesetCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:"biggestCardBorderless"}}/>}               
        
        <hr></hr>

      </div>

    )
  }
}
