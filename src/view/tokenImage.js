import React, { Component } from 'react';
import placeholder from '../pics/dragon.jpg';
import ColorThief from 'colorthief';

export default class TokenImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pic: this.props.pic,
      colors: this.props.colors,
      borderC: this.props.borderC,
    };

    this.colorThief = new ColorThief();
  }

  componentDidUpdate(prevProps) {
    // Compare the current props with the previous ones
    if (prevProps.pic !== this.props.pic || prevProps.colors !== this.props.colors) {
      // If they're different, update the component's state
      this.setState({
        pic: this.props.pic,
        colors: this.props.colors,
        borderC: this.props.borderC,
      });
    }
  }

  render() {
    // Destructure the necessary state variables
    const { pic, colors, borderC } = this.state;
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;

    return (
      <div style={{width:"110px", height:"110px", boxShadow:"6px 10px 6px -6px"+styles.colors.colorBlack,
          borderRadius:"50%", marginLeft:"10px", display:"flex", alignItems:"center", justifyContent:"center",
          marginRight:"30px", 
          backgroundColor:colors.length?`rgb(${colors[3].join(',')})`: styles.popupSmall.border,}}>
        <div style={{width:"100px", height:"100px", position:"absolute", mixBlendMode:"multiply",borderRadius:"50%",
                opacity:".65",
                backgroundColor:colors.length?`rgb(${colors[2].join(',')})`: styles.popupSmall.border,}}>
        </div>
        <img src={pic||placeholder} 
            style={{width:"100px", height:"100px", 
            objectFit:"cover", borderRadius:"50%",
            display: "flex", zIndex:2,
            }}/>
        
        <div style={{width:"107px", height:"107px", position:"absolute", mixBlendMode:"overlay",
        borderRadius:"50%", zIndex:3,
        boxShadow:"inset 6px 10px 6px -6px"+styles.colors.colorBlack+",inset 6px 12px 6px -14px"+ borderC+",-7px -11px 3px -11px"+ borderC}}>
        </div>
        
        <div style={{width:"100px", height:"100px", position:"absolute", mixBlendMode:"overlay", zIndex:4,
        borderRadius:"50%", boxShadow:"7px 11px 3px -10px"+ borderC }}>
        </div>
      </div>
    )
  }
}