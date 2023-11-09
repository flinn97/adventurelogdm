         

class ToolService {
    constructor() {
    }

        checkURLforString(s){
            let href = window.location.href;
            return href.includes(s);

        }

       getIdFromURL(hyphen){
        let href = window.location.href;
        let splitURL = href.split("/");
        let id = splitURL[splitURL.length - 1];
        let idList = hyphen? id.split("-") :[id];
        let campId = idList[0];
        return campId;
       }

  };
  export default new ToolService();