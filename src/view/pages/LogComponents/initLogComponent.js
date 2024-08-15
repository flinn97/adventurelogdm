import { Component } from 'react';
import '../../../App.css';
import ParentFormComponent from '../../../componentListNPM/componentForms/parentFormComponent';
import MonsterMapItem from '../../monsterMapItem';
import MapComponent from '../../../componentListNPM/mapTech/mapComponent';
import MonsterMapItemSimplified from './monsterMapItemSimplified';
import auth from '../../../services/auth';

export default class InitiativeLogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
    }

  }


  async componentDidMount(){

    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    await auth.firebaseGetter("participant", state.componentList, "type");
    this.setState({start:true})

  //  state.componentList.sortSelectedList("participant","lastInit",true);
  //  let obj = this.props.obj;
  //  if (!obj.getJson().currentInit){
  //   obj.setCompState({
  //     currentInit: <MapComponent
  //     filter={{search: obj.getJson().itemId, attribute: "encounterId"}}
  //     app={app} name={"participant"}
  //    cells={[
  //      {custom:MonsterMapItemSimplified, props:{app:app,}},
  //      ]
  //    }
  //    sectionStyle={{marginBottom:"2px", width:this.props.w, }}
  //    cellStyle={{alignContent:"center", verticalAlign:"center", width:"fit-content", }}
  //    theme={"logInitiative"}
  //    />
  //   });
  //  }
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;
    let phone = window.innerWidth > 800 ? false : true;
    let w = this.props.w;
    let sorted = state.componentList.sortSelectedList("participant","initiative",true);
    let list = state.componentList.getList("participant", obj.getJson().itemId, "encounterId");
    const currentInit = <MapComponent
    filter={{search: obj.getJson().itemId, attribute: "encounterId"}}
    app={app} name={"participant"}
   cells={[
     {custom:MonsterMapItemSimplified, props:{app:app,}},
     ]
   }
   sectionStyle={{marginBottom:"2px",}}
   cellStyle={{alignContent:"center", verticalAlign:"center", width:"fit-content"}}
   theme={"logInitiative"}
   />;

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: w,
        fontSize: styles.fonts.fontNormal,
        alignContent: "flex-end",
      }}>

        {this.state.start&&<>
        <div style={{color:styles.colors.color4, fontSize:phone?styles.fonts.fontSmall:styles.fonts.fontSmallest, marginTop:phone?"8px":"18px", marginBottom:phone?"12px":"8px"}}>
          Initiative Order
        </div>
       <div style={{ borderRadius:"11px", justifyContent:"flex-start",  marginBottom:"8px"}}>
        {obj.getJson().itemId &&
        currentInit
        }
       </div>
       </>}
      </div>

    )
  }
}


