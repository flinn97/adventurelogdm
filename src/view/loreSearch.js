import { Component } from 'react';
import Upload from './upload';

export default class LoreSearch extends Component {
  constructor(props) {
    super(props);
    this.getId = this.getId.bind(this);  
    this.state = {
      searchTerm:""
    }
  }
 
    
  getId() {
    const path = window.location.pathname;
  const parts = path.split('/');
  const idSegment = parts.pop();
  const idParts = idSegment.split('-');
  
  return idParts.length > 1 ? idParts[1] : idParts[0]
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  navigateToLink = (obj) => {
    let href = window.location.href;
    let splitURL = href.split("/");
    let id = splitURL[splitURL.length - 1];
    let newLink = "";
  
    if (id.includes("-")) {
      let idList = id.split('-');
      newLink = idList[0] + "-" + obj.getJson()._id;
    } else {
      newLink = id + "-" + obj.getJson()._id;
    }
  
  
    window.open("../campaign/" + newLink, '_blank');
  }


  render() {
    let obj = this.props.obj;
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let dispatch = app.dispatch;
    let currentState = app.state;
    let componentList = currentState.componentList;
    
    let id = this.getId();

    let listTerm = state.currentLore?"parentId":"campaignId";

    let path = window.location.pathname;
    let parts = path.split('/');
    let idSegment = parts.pop();
    let idParts = idSegment.split('-');
    let campId = idParts[0]

    console.log(campId)

    let loreList = componentList.getList("lore", id, listTerm)
    .filter(loreItem => {
      const name = loreItem?.getJson()?.name || "";
      return name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = a?.getJson()?.name || "";
      const nameB = b?.getJson()?.name || "";
      return nameA.localeCompare(nameB);
    });

    let loreListTotalLength = componentList.getList("lore", id, listTerm).length
    

    return (
      <div style={{width:"100%", minHeight:"200px",}}>
                <div style={{marginTop:"-10px", color:styles.colors.colorWhite+"55", fontSize:styles.fonts.fontSmall}}>Other Connected Lore</div>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", justifyItems:"center", marginBottom:"270px",}}>
                                <div style={{...styles.buttons.buttonAdd, marginTop:"15px", 
                                      paddingLeft:"29px",  paddingRight:"29px", alignSelf:"flex-start", justifyItems:"center", 
                                      borderRadius:"9px", fontSize:"21px", 
                                    }}
                                      onClick={()=>{

                                        const newName = this.props.app.state.currentLore?this.props.app.state.currentLore.getJson().name:"";
                                        // const newId = state.currentLore ? state.currentLore.getJson()._id: this.props.obj?.getJson().campaignId;
                                        dispatch(
                                          {operate:"addlore", operation:"cleanJsonPrepareRun",
                                          //                                      CHANGE NAME later
                                          object:{ parentId:id, type:"lore", name: newName+" New Lore", campaignId: campId}}
                                        )
                                      }}
                                      >+ Create Lore</div> 

                                {loreListTotalLength > 8 &&
                              <div style={{ display:"flex", justifyContent:"flex-end", position:"relative", marginTop:"-42px" }}>
                              
                                      <input app={app}
                                      
                                      type="input" 
                                      placeholder="Search..." 
                                      value={this.state.searchTerm} 
                                      onChange={this.handleSearchChange}
                                      style={{ backgroundColor: styles.colors.color1+"ee",  
                                      color: styles.colors.colorWhite,  
                                      borderRadius:"11px",
                                      width:"420px", 
                                      padding: '8px',  
                                      fontSize: '16px', }}
                                    />
                              </div>}
                                
                                          
                                <div style={{ alignContent:"flex-start", alignItems:"center", alignSelf:"center",
                                              justifyContent:"space-between", borderRadius:"11px", 
                                              width:"78%", height:"500px",
                                              marginTop:"18px", display: 'flex', flexDirection: 'row', flexWrap: 'wrap'  }}>
                                                {
                                                  loreList
                                                  .slice(0, 12)
                                                  .map((loreItem, index) => (
                                                    loreItem.getJson().name !== "" && loreItem.getJson().name !== undefined?
                                              <div className="hover-img" key={index} 
                                                    onClick={() => this.navigateToLink(loreItem)}
                                                    style={{backgroundColor:"#00000055", padding:"3px 4px", cursor:"pointer", border:"1px solid "+"#ffffff22", textAlign:"center",
                                                    minWidth:"410px", margin:"8px 3px", maxHeight:"39px", borderRadius:"8px"}}>
                                                    
                                                      <div style={{color:styles.colors.colorWhite, fontSize:styles.fonts.fontNormal }}>
                                                        {loreItem.getJson().name.substring(0, 33)}
                                                        </div>

                                            </div> : null
                                                  ))
                                                }
                                            </div>
                                            
                                    

                          </div>
      </div>

    )
  }
}

