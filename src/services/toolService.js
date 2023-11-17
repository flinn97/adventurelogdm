         

class ToolService {
    constructor() {
    }

        checkURLforString(s){
            let href = window.location.href;
            return href.includes(s);
        }

       getIdFromURL(hyphen, index){
        let href = window.location.href;
        let splitURL = href.split("/");
        let id = splitURL[splitURL.length - 1];
        let idList = hyphen? id.split("-") :[id];
        let campId = index? idList[index]:idList[0];
        return campId;
       }

      
       convertStringToLink = (string) => {
        if (string) {
          if (!string.startsWith('http://') && !string.startsWith('https://')) {
            return 'https://' + string;
          } else {
            return string;
          }
        }
        return string;
      }

      /**
 * Navigate to a given URL.
 * 
 * @param {string} href - The URL to navigate to.
 * @param {boolean} [isBlank=true] - Determines if the URL should be opened in a new tab. Must be true or false.
 */
      navigateToLink = (href, isBlank) => {
        let ref = href;
    
        // Check if href is not a string, convert it to a string
        if (typeof ref !== 'string') {
            ref = ref.toString(); 
        }
    
        if (isBlank === true) {
            window.open(ref, '_blank');
        } else {
            window.location.href = ref; // Navigates in the same tab
        }
    }

  };
  export default new ToolService();