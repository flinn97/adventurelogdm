

class SendtoChatService {
    constructor() {
      
    }

        dispatchLog = (obj, dispatch, callBack) => {
          let href = window.location.href;
          let splitURL = href.split("/");
          let id = splitURL[splitURL.length - 1];
          let idList = id.split("-");
          let campId = idList[0];


          const { _id, type, ...rest } = obj; // Extract _id and type, rest contains the other properties
          // dispatch({
          //   operate: "addpost",
          //   operation: "cleanJsonPrepareRun",
          //   object: { ...rest, campaignId: campId, type: "post" } // Use rest to spread the remaining properties
          // });
        };




  };
  export default new SendtoChatService();