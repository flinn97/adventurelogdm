import toolService from "./toolService";

         

class SendtoChatService {
    constructor() {
    }

        dispatchLog = (obj, app, callBack) => {
          
          let campId = toolService.getIdFromURL(true,);
          console.log(campId);

          // Extract the JSON part of the obj
          const objJson = obj.getJson ? obj.getJson() : {};
          const { _id, type, parentId, ...rest } = objJson;
          const postType = type || "message";
          let userRole = app.state.user.getJson().role;
          let role
          if (userRole === "GM"){
            role ="GM";
          }else{
            role ="player"
          }
          
          const payload = {
              ...rest,
              campaignId: campId, senderId:app.state.user.getJson()._id,
              type: "post", sender:role,
              postType: postType,
            };
          console.log(app.state.user.getJson()._id)
          app.state.opps.cleanJsonPrepareRun({ "addpost": payload });
          app.dispatch({});
        };

  };
  export default new SendtoChatService();