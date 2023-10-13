import ColorThief from 'colorthief';

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

class ColorService {
    constructor() {
      this.colorThief = new ColorThief()
    }
        

    updateColors = (pic, callBack) => {
        try {
            
            const img = new Image();
            img.src = pic;
            
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
                const hexPalette = palette.map(color => rgbToHex(color[0], color[1], color[2]));
                
                const colorObject = {};
                hexPalette.forEach((color, index) => {
                  colorObject[`color_${index}`] = color;
                });
                
                //console.log(colorObject);
                callBack(colorObject);
              };
            };
          } catch (error) {
            console.error(error);
          }
        };
      };
  
  export default new ColorService();