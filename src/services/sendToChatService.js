

class SendtoChatService {
    constructor() {
      
    }

    logImage = (obj, callBack) => {
          console.log("Sent an Image to the Adventure Log")
        };

    logInitiative = (obj, callBack) => {
          console.log("Sent Initiative Order to the Adventure Log")
        };

    logNote = (obj, callBack) => {
          console.log("Sent Note to the Adventure Log")
        };

      };
  
  export default new SendtoChatService();