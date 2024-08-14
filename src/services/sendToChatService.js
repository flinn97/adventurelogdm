import toolService from "./toolService";

         

class SendtoChatService {
    constructor() {
    }

        dispatchLog = (obj, app, campaignId, forceValue, callBack) => {
          debugger
          
          let campId = campaignId?campaignId:toolService.getIdFromURL(true,);
         
          // Extract the JSON part of the obj
          const objJson = obj.getJson ? obj.getJson() : {};
          const { currentIndex,currentTurn,isRunning, _id, type, parentId, ...rest } = objJson;
          const postType = type || "message";
          let userRole = app.state.user.getJson().role;
          let role
          if (userRole === "GM"){
            role ="GM";
          }else{
            role ="player"
          }

          let val = forceValue?forceValue:"";
          
          const payload = {
              ...rest,
              campaignId: campId, senderId:app.state.user.getJson()._id,
              type: "post", sender:role, readAloud:val,
              postType: postType, itemId: obj.getJson()._id,
            };
          
          app.state.opps.cleanJsonPrepareRun({ "addpost": payload });
          app.dispatch({});
        };

  };
  export default new SendtoChatService();