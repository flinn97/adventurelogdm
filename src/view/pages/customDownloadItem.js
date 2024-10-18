import React, { Component } from 'react';
import auth from '../../services/auth';
class CustomDownloadItem extends Component{
    constructor(props){
        super(props)
        this.state={
            downloaded:false
        }
    }
    async download(mpItem) {

        let campaign = await auth.firebaseGetter(mpItem.getJson().campaignId, this.props.app.state.componentList, "_id", "campaign", false);
    
        await campaign[0].setCompState({ mptype: mpItem.getJson().mptype })
        let requestBody = {
          email: this.props.app.state.user.getJson()._id,
          lore: { ...campaign[0].getJson(), }
        };
        requestBody = await JSON.stringify(requestBody)
    
        // Replace "YOUR_CLOUD_FUNCTION_URL" with the actual URL of your Cloud Function
        const cloudFunctionUrl = "https://convertmarketplaceitem-x5obmgu23q-uc.a.run.app";
    
        // Make a POST request to the Cloud Function
        fetch(cloudFunctionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    
        let app = this.props.app;
        let dispatch = app.dispatch;
        dispatch({ popupSwitch: "downloadLibrary" , downloaded:true})
      }
    
    render(){
        
        let obj = this.props.obj
        return(
            <div className="DR-hover-shimmer Button-Type2" onClick={()=>{
                if(obj.getJson().mptype.toLowerCase().includes("campaign") ){
                    this.download(obj)
                }
                else{
                    this.props.app.dispatch({popupSwitch:"viewLibraryContent", viewContent:obj })
                    
                }}
                }>
                    {obj.getJson().mptype.toLowerCase().includes("campaign")?
                    (<>{this.state.downloaded?
                        (<>Downloaded</>)
                        :
                        (<>Download</>)}
                        </>)
                    :
                    (<>View</>)}
                </div>
        )
    
        
}
}
export default CustomDownloadItem