import { Component } from 'react';
import '../../../App.css';
import ParentFormComponent from '../../../componentListNPM/componentForms/parentFormComponent';
import MonsterMapItem from '../../monsterMapItem';
import MapComponent from '../../../componentListNPM/mapTech/mapComponent';
import MonsterMapItemSimplified from './monsterMapItemSimplified';

export default class InitiativeLogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
    }

  }

  componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
   state.componentList.sortSelectedList("monster","lastInit",true);
   let obj = this.props.obj;
   if (!obj.getJson().currentInit){
    obj.setCompState({
      currentInit: <MapComponent
      filter={{search: obj.getJson().itemId, attribute: "encounterId"}}
      app={app} name={"monster"}
     cells={[
       {custom:MonsterMapItemSimplified, props:{app:app,}},
       ]
     }
     sectionStyle={{marginBottom:"2px", width:this.props.w}}
     cellStyle={{alignContent:"center", verticalAlign:"center", width:"fit-content"}}
     theme={"logInitiative"}
     />
    });
   }
  }
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;
  
    let w = this.props.w;
    let sorted = state.componentList.sortSelectedList("monster","lastInit",true);
    const currentInit = obj.getJson().currentInit?obj.getJson().currentInit:<MapComponent
    filter={{search: obj.getJson().itemId, attribute: "encounterId"}}
    app={app} name={"monster"}
   cells={[
     {custom:MonsterMapItemSimplified, props:{app:app,}},
     ]
   }
   sectionStyle={{marginBottom:"2px", width:w}}
   cellStyle={{alignContent:"center", verticalAlign:"center", width:"fit-content"}}
   theme={"logInitiative"}
   />;

    return (
      <div style={{ 
                  display: "flex",
                  flexDirection: "column",
                  width: w,
                  fontSize: styles.fonts.fontNormal,
                  alignContent:"flex-end",
      }}>
        <div style={{color:styles.colors.color4, fontSize:styles.fonts.fontSmallest, marginTop:"8px", marginBottom:"8px"}}>
          Initiative Order
        </div>
       <div style={{ borderRadius:"11px", justifyContent:"flex-start",  marginBottom:"8px"}}>
        {obj.getJson().itemId &&
        currentInit
        }
       </div>
      </div>
      
    )
  }
}


