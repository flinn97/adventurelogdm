import { Component } from 'react';


export default class Bugcheck extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 


  render() {

    console.log("bug check rerender")
    return (
      <div><h1>bugs</h1>


      </div>

    )
  }
}

