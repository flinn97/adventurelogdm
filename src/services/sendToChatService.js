         

class SendtoChatService {
    constructor() {
    }

        dispatchLog = (obj, app, callBack) => {
          let href = window.location.href;
          let splitURL = href.split("/");
          let id = splitURL[splitURL.length - 1];
          let idList = id.split("-");
          let campId = idList[0];

          // Extract the JSON part of the obj
          const objJson = obj.getJson ? obj.getJson() : {};
          const { _id, type, parentId, ...rest } = objJson;
          const postType = type || "message";
          
          const payload = {
              ...rest,
              campaignId: campId,
              type: "post",
              postType: postType,
            };
          
          app.state.opps.cleanJsonPrepareRun({ "addpost": payload });
          app.dispatch({});
        };

  };
  export default new SendtoChatService();