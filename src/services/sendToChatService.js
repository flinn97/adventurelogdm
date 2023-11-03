

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
      
    }

    

      };
  
  export default new SendtoChatService();