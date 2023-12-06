import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import placeholder from '../../../pics/illustrations/loreScript.png';
import "../../App.css";


class ImageButton extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {

        };
    }
     /**
     * Allows for updating multiple objects with one form.
     * @param {*} obj 
     * @returns 
     */
     isArray(obj){
        let arr;
        if(Number.isInteger(obj)){
            arr = obj;
        }
        else{
            arr = Array.isArray(obj)? obj: [obj];
        }
        return arr
    }

    componentDidMount() {
        let obj =   this.props.obj? this.props.obj: this.props.app?.state?.currentComponent;
       if(obj){
        obj = this.isArray(obj)
       }
       this.setState({
        obj:obj,
        start:true
       })
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
        }
    }
    render() {
        let app = this.props.app;
        let dispatch = app.dispatch;
        let state = app.state;
        
        let styles = state.styles;
   
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }

        return (
            <div  ref={this.wrapperRef} 
            onClick={this.props.onClick?this.props.onClick: async ()=>{
                if(this.props.func){
                    this.props.func(this.state);
                }
                else{
                    for(let obj of this.state.obj){
                       await obj.setCompState({[this.props.name]: ""})
                    }
                    
                    this.state.obj[0].getOperationsFactory().run();
                    this.props.app.dispatch({clearRun:true});
                }
                
            }}
            style={this.props.wrapperStyle? this.props.wrapperStyle: theme!==undefined? theme.clearbuttonWrapperStyle:{width:"100px", height:"20px", background:"", borderRadius:"7px", display:"flex", justifyContent:"center", alignItems:"center"}} className={this.props.wrapperClass}>
                
                              <div 
                                  style={this.props.blurStyle? this.props.blurStyleStyle:{
                                      position: "absolute",top: 0,left: 0,height: "100%", opacity:".5",
                                      width: "100%",backgroundColor: styles.colors.color1,filter: "blur(18px)",
                                      zIndex: 1
                                  }}></div>

                                      <div 
                                      style={this.props.buttonTextStyle?{...this.props.buttonTextStyle}:theme!==undefined?theme.buttonTextStyle:{zIndex: 2}}
                                          >
                                          {this.props.text? this.props.text: "add props.text"}
                                      </div>
                                <img className='hover-img'
                                  src={this.props.image? this.props.image: placeholder}
                                  style={this.props.imageStyle? this.props.imageStyleStyle:{
                                      position: "absolute",top: 0, left: 0,
                                      borderRadius: "12px",
                                      minHeight: "95px",
                                      width: "300px",
                                      objectFit: 'cover', 
                                      filter: 'brightness(50%)', 
                                      zIndex: 0 }} />
                
                </div>
        );
    }
}


export default ImageButton;