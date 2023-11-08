import { Component } from 'react';

import auth from '../../services/auth';


export default class AdventureLogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
     toShow: "100",

    }
  }

// FIREBASE LISTENER add here

  async componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;
    let compList = state.componentList;
    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let campaigns = compList.getList("campaign", idSegment, "_id" )
    let currentCampId = campaigns?campaigns[0].getJson()._id:"";
    // let logItems = compList.getList("post", currentCampId, "campaignId")

    await auth.firebaseGetter(currentCampId, compList, "campaignId", )
  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch
    let state = app.state;
    let styles =state.styles;

    let compList = state.componentList;
    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let campaigns = compList.getList("campaign", idSegment, "_id" )
    let currentCampId = campaigns?campaigns[0].getJson()._id:"";
    
    let logItems = compList.getList("post", currentCampId, "campaignId");

    let cleanedItems = logItems
    .slice(0, this.state.imagesToShow);
    
    
    return (

      
      <div style={{width:"100%", display:"flex",flexDirection:"column", alignItems:"center", alignSelf:"center", justifySelf:"center"}}>

      {/* ADVENTURE LOG */}
          <div style={{width: "840px", height: "890px", border: "8px solid " + styles.colors.color6 + "55", 
          backgroundColor: styles.colors.color8 + "55",
          borderRadius: "20px", padding: "20px"}}>

            {/* PUT THIS IN A seperate .js vvvvvvvvvvvvv
            */}
            
                <div>
                  {cleanedItems.length > 0 && cleanedItems.map((item, index) => (
                    <div key={index} style={{color:styles.colors.colorWhite+"a9"}}>
                      {item.getJson().campaignId}

                      {/* <PostMapItem app={app} obj={item} index={index} /> */}

                    </div>
                  ))}
                </div>

             {/* PUT THIS IN A seperate .js ^^^^^^^^^^
             */}

          </div>
        
      </div >
    )
  }
}


