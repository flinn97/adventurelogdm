import { Component } from 'react';
import '../../../App.css';



export default class ImageLogComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: this.props.obj,
    }

  }
 
 

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles = state.styles;
    let obj = this.props.obj;
    let index = this.props.index;
    


    return (
      <div style={{ 
                  
      }}>
          This is an Image
      </div>
      
    )
  }
}


