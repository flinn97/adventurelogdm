import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';

class RunButton extends Component {
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

   
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }



        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle? this.props.wrapperStyle: theme!==undefined? theme.runbuttonWrapperStyle:{width:"100px", height:"20px", background:"red", borderRadius:"7px", display:"flex", justifyContent:"center", alignItems:"center"}} className={this.props.wrapperClass}>
                <div style={this.props.buttonTextStyle?{...this.props.buttonTextStyle}:theme!==undefined?theme.buttonTextStyle:{}} onClick={this.props.onClick?this.props.onClick: async()=>{
                   if(this.state.obj){
                    this.state.obj[0].getOperationsFactory().run();

                   }
                   else{
                    if(this.props.app){
                        this.props.app.state.opps.run();
                    }
                   }
                    this.props.app.dispatch({updateRun:true})
                }}
                >{this.props.text? this.props.text: "save"}</div>
            </div>
        );
    }
}



export default RunButton;