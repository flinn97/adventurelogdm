import { Component } from 'react';



export default class MyCharacters extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }
 
  updateImage(component){
    this.setState({campaignImage: component, change: true})
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    return (
      <div>  
        {/* CREATE NEW CHARACTER?? what does this entail? */}
        Name, Profile Pic, and...?


        {/* MAP out each character          */}


    
        {/* <CampaignCard app={app} type="cardWithTab" options={{tabType:"borderlessTab", cardType:""}}/> */}
      </div>

    )
  }
}


