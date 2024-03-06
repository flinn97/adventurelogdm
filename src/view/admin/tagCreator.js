import { Component } from 'react';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';


export default class TagCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSelection:"",
      currentTags:""

    }
  }



  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
   

    return (
     
      <div style={{marginLeft:"100px"}} >
        <div style={{color: "white"}}>{this.props.obj.getJson().tags}</div>
        <ParentFormComponent name="selector" id ="tagSelector" obj={this.props.obj} func = {(obj, val, )=>{
          
          val = val.target.value;
          this.setState({currentSelection:val})
          obj[0].setCompState({selector:val})
        }}/>
        <div style={{color:"white"}} onClick={async()=>{
          debugger
          if(this.props.obj.getJson().tags?.split(",").length<5){
          let tags = this.state.currentTags;
        if(this.props.obj.getJson().tags==="" || this.props.obj.getJson().tags===undefined){
            tags = this.state.currentSelection
          }
          else{
            tags += `,${this.state.currentSelection}`
          }
          
         await this.props.obj.setCompState({tags:tags, selector:""});

          this.setState({currentTags:tags, currentSelection:""});
        }
          
        }}>Submit</div>
    </div>
    

    )
  }
}

