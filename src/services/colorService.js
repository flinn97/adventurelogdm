import ColorThief from 'colorthief';

class ColorService {
    constructor() {
      this.colorThief = new ColorThief()
    }
        

    updateColors = (pic, callBack) => {
        try {
            
            const img = new Image();
            img.src = pic;
            debugger
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
              // Create a new canvas element and get its 2d context
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
      
              // Draw the image onto the canvas
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0, img.width, img.height);
      
              // Get a data URL of the canvas' contents
              const dataUrl = canvas.toDataURL();
      
              // Create a new image element from the data URL
              const newImg = new Image();
              newImg.src = dataUrl;
      
              newImg.onload = () => {
                const palette = this.colorThief.getPalette(newImg, 7);
                callBack(palette);
              };
            };
      
            img.src = pic;
      
          } catch (error) {
            // console.log(error)
          }
        };
      }
  
  export default new ColorService();