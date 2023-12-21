import { Component } from 'react';
import { Link } from 'react-router-dom';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';

export default class ConnectToCampaignLink extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
 


  render() {
    let app = this.props.app;
    let state = app.state;
    let dispatch= app.dispatch;
    let obj = this.props.obj

    let styles =state.styles;

    return (<div style={{display:"flex", flexDirection:"row", width:"100%",  alignContent:"center", justifyContent:"center" }}>
      <div className='hover-container' style={{width:"200px"}}> 
                <Link className='hover-btn'
                style={{ ...styles.buttons.buttonAdd, padding:"5px 10px",  width:"200px",
                
                fontSize:styles.fonts.fontNormal, textAlign:"center",
                color:styles.colors.color9+"d9",
                borderRadius:"11px", border:"2px solid "+styles.colors.color3}}
                to={"/connecttoadventure/" + obj.getJson().campaignId+ "-" +obj.getJson()._id}>
                  Play
                </Link>

              <div className='hover-div' style={{...styles.buttons.buttonAdd,height:"100%", zIndex:-90,
              position:"absolute", left:0, animation:"flash-off 1s 4", padding:"5px 10px",  width:"200px",
                background:styles.colors.color4+"1d",
                borderRadius:"11px",}}>
                
                    </div>
            </div>
        <div className='hover-containerInt' style={{height:"fit-content", width:"fit-content"}}>
              <div style={{marginLeft:"22px", marginTop:"4px", pointerEvents:"none"}}>
              <ParentFormComponent app={app}
              name="campaignId" obj={obj}
              maxLength={11}
              inputStyle={{ width:"7.2rem", padding:"4px 9px", color:styles.colors.color3+"99", height:"25px", 
              borderRadius:"4px",background:styles.colors.colorWhite+"00", borderWidth:"0px", cursor:"text",
              border:"solid 1px "+styles.colors.colorWhite+"22",
              textWrap:"wrap", fontSize:styles.fonts.fontSmall}}/>

              

              </div>
                    <div 
                     onClick={() => {
                      if (obj){                          
                          obj.setCompState({campaignId:""})
                          state.opps.run();
                           }         
                        }}
                    className='hover-divInt' style={{cursor:"pointer",width:"7.2rem", textAlign:"center", marginLeft:"22px", borderRadius:"6px",
                    justifyContent:"center",color:styles.colors.color5, height:"29px", fontSize:styles.fonts.fontSmall, cursor:"pointer",
                    padding:"3px",marginBottom:"-7px", pointerEvents:"all",
                    position:"absolute", background:"#000000f9"}}>
                        Disconnect
                    </div>
              </div>
             
             
      </div>
    )
  }
}
