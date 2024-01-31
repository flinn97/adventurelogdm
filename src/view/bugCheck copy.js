{state.currentLore!==undefined ? (<div style={{minWidth:"100%", height:"100%"}}>
        <LoreViewer app={app} type ="card" _id = {this.state.obj.getJson()._id}/>        
        </div>):(
        <>
                <div style={{display:"flex", flexDirection:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
                        
                        
                             <Worldbuilder app={app} type="card"/>
                </div>
                <div ref={this.loreRef}/> 
                <LoreSearch app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                />
        <hr></hr>

        <div 
                        style={{ display:"flex", justifyContent:"", width:"100%", flexDirection:"column", 
                        color:styles.colors.color4}}>
                            <div  style={{ display:"flex", width:"100%", justifyContent:"flex-start",}}> Encounters
                             
                             </div>

                             <div style={{display:"flex", flexDirection:"row",justifyItems:"center", width:"fit-content", marginTop:"11px"
                      }}>
                         
                          <Link to= {"/encountermanager/"  + this.state.obj?.getJson()._id} 
                        className="hover-btn" style={{...styles.buttons.buttonAdd, marginTop:"5px", backgroundColor:styles.colors.colorBlack+"99",
                        paddingLeft:"29px",  paddingRight:"29px", alignSelf:"flex-start", justifyItems:"center",  height:"36px",
                        borderRadius:"9px", fontSize:"21px", 
                      }}>
                                  Manage Encounters
                             </Link></div>
        </div>

        <div ref={this.encRef}/>
                             <div style={{marginBottom:"18px"}}>
            <MapComponent app={app} name={"encounter"} cells={[{custom:EncounterMapItem, props:{app:app}},]} 
            filter={{search: this.state.obj?.getJson()._id, attribute: "campaignId"}}
            theme={"selectByImageSmall"}
            />
          </div>

          <hr></hr>
          <div style={{display:"flex", flexDirection:"column", width:"100%", padding:".75%", justifyContent:"space-between",}}>
          <div ref={this.galRef}/> 
                        <div 
                        style={{ display:"flex", cursor:"pointer", background:"", border:"", cursor:"", color:styles.colors.color4, flexDirection:"column"}}>
                             Gallery
                             <div style={{display:"flex", justifyContent:"center", justifyItems:"center", marginTop:"8px",}}>

                             
                <GalleryViewer app={app} type="card" options={{tabType:"bigCardBorderless", cardType:undefined}}
                />                 
                            </div>
                      </div>
                </div>


                </>)}