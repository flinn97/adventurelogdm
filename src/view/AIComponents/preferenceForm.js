import { Component } from 'react';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';


export default class PreferenceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }



  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    return (
      <ul style={{ paddingLeft: "20px", width:"62vw", }}>   
      <li>
        <ParentFormComponent  class="text-form text-wide" 
          app={app} 
          
          obj={this.props.obj} 
          name="content" 
          cleanPrepareRun={true} 
          wrapperStyle={{ display: "flex", flexDirection: "column", }}
          inputStyle={{width:"71vw", border:"1px solid grey"}}
        />
      </li>
    </ul>
    

    )
  }
}
