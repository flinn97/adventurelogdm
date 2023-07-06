import ColorThief from 'colorthief';

class ColorService {
    constructor() {
      this.colorThief = new ColorThief()
    }
        

    updateColors = (pic, callBack) => {
        try {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
              //convert pic into data url
            img.src = pic;
              
    
            img.onload = () => {
              const palette = this.colorThief.getPalette(img, 7);
              callBack(palette);
            };
        } catch (error) {
            console.log(error)
        }
      };
    }
  
  export default new ColorService();