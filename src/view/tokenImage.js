import React, { Component } from 'react';
import placeholder from '../pics/dragon.jpg';
import background from '../pics/backToken.webp';
import colorService from '../services/colorService';

export default class TokenImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: this.props.pic,
      width: "110px",
      colors: this.props.colors,
    };
  };

  async componentDidUpdate(prevProps){
    let obj = this.props.app.state.currentComponent;
    
    
    if (prevProps.pic !== this.props.pic){
      this.setState({  pic: this.props.pic});

      await colorService.updateColors(this.props.pic, (paletteObject) => {
        this.setState({
          colors: paletteObject,
          width: this.props.width
        }, 
        () => console.log(this.state.colors))
      });
      // await obj?.setCompState({colors:this.state.colors});
    }
    
  };

  async componentDidMount() {
    this.setState({ width: this.props.width });
  
    await colorService.updateColors(this.props.pic, (paletteObject) => {
      // Directly use paletteObject without converting to an array
      this.setState({
        colors: paletteObject,
        width: this.props.width
      });

      // If necessary to update the component's prop object
      if (this.props.obj) {
        this.props.obj.setCompState({
          colors: paletteObject
        });
      }
    });
  }

  

  render() {
    let app = this.props.app;
    let state = app.state;
    
    let colors = Object.values(this.props?.colors);
    
    let width = this.state.width.toString();
    let widthSm = (this.state.width * 0.908).toString()+"px"
    let widthMd = (this.state.width * 0.959).toString()+"px"
    let pic = this.state.pic;
    let styles = state.styles;

    return (
      <div style={{minWidth:width+"px", minHeight:width+"px", maxWidth:width+"px", maxHeight:width+"px", boxShadow:"6px 10px 16px -3px"+styles.colors.colorBlack+"55",
          borderRadius:"50%", marginLeft:"2vw", display:"flex", alignItems:"center", justifyContent:"center",
          marginRight:"30px", 
          backgroundColor: colors?colors[1]: styles.popupSmall.border, 
          }}>
            
            <img src={background} draggable="false"  
                                style={{width:width+"px", height:width+"px",  position:"absolute",
                                  objectFit:"cover", borderRadius:"50%", opacity:"61%", 
                                  display: "flex", zIndex:2,
                                  mixBlendMode:"overlay"
                                  }}/>
                                  
                                 <div style={{width:widthSm, height:widthSm, position:"absolute", 
                                 mixBlendMode:"multiply",
                                 borderRadius:"50%",
                opacity:".75", opacity:"36%", 
                backgroundColor: colors?colors[2]: styles.popupSmall.border,}}>
        </div>
           
        <img src={pic||placeholder} draggable="false"
            style={{width:widthSm, height:widthSm, 
            objectFit:"cover", borderRadius:"50%",
            display: "flex", zIndex:2,
            }}/>
         <div style={{width:widthSm, height:widthSm, position:"absolute", borderRadius:"50%",
                opacity:".15", 
                backgroundColor: colors?colors[3]: styles.popupSmall.border,}}>
        </div>
        <div style={{width:widthMd, height:widthMd, position:"absolute", mixBlendMode:"overlay",
        borderRadius:"50%", zIndex:3,opacity:"50%",
        boxShadow:this.props.width>39?"inset 6px 10px 6px -6px"+styles.colors.colorBlack+",7px 11px 3px -8px"+ styles.colors.colorBlack+",inset 6px 12px 6px -14px"+ styles.colors.colorWhite+",-7px -11px 3px -11px"+ styles.colors.colorWhite:"",
        }}>
        </div>
        
        <div style={{width:widthSm, height:widthSm, position:"absolute", mixBlendMode:"overlay", zIndex:4,
       borderRadius:"50%", boxShadow:this.props.width>39?"7px 11px 3px -10px"+ styles.colors.colorWhite:"", 
         }}>
        </div>
      </div>
    )
  };
}