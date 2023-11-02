

class SendtoChatService {
    constructor() {
      this.typeMap = {
        'image': this.logImage,
        'encounter': this.logInitiative,
        'newNote': this.logNote,
        'lore': this.logLoreDescription,
        'message': this.logMessage,
      };
    }

    dispatchLog = (obj, campID, callBack) => {
      const type = obj.getJson().type;
      if (this.typeMap[type]) {

        const div = this.typeMap[type](obj, campID, callBack);

      } else {
        console.error("Can't log "+obj.getJson().type, type);
        return null;
      }
    }

    logImage = (obj, campID, callBack) => {
          return(
          <div 
          onClick={()=>{            
            dispatch({currentPic:img, popupSwitch:"viewPic"})
          }}  
          >
            <img draggable="false" src={obj.getJson().picURL} style={{width:"200px"}}/>
          </div>
          )
        };

      logInitiative = (obj, campID, callBack) => {
        return(
          <div>
          </div>
          )
          };

        logNote = (obj, campID, callBack) => {
            return(
              <div>
              </div>
              )
            };

          logLoreDescription = (obj, campID, callBack) => {
                return(
                  <div>
                    {obj.getJson().desc}
                  </div>
                  )
                };

       logMessage = (obj, campID, callBack) => {
                  return(
                  <div 
                  onClick={()=>{            
                    dispatch({currentPic:img, popupSwitch:"viewPic"})
                  }}  
                  >
                    <img draggable="false" src={obj.getJson().picURL} style={{width:"200px"}}/>
                  </div>
                  )
                };

      };
  
  export default new SendtoChatService();