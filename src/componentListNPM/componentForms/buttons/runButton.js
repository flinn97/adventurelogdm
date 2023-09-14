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
        let app = this.props.app;
        let dispatch = app.dispatch;
        let state = app.state;
        
        let styles =state.styles;
   
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }



        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle? this.props.wrapperStyle: theme!==undefined? theme.runbuttonWrapperStyle:{...styles.buttons.buttonAdd, width:"50%", backgroundColor:styles.colors.color2+"99",}}
            className={this.props.wrapperClass}>
                <div 
                //TAYLOR
                    style={this.props.buttonTextStyle? {...this.props.buttonTextStyle} : theme !== undefined ? theme.buttonTextStyle : {}}
                    onClick={async () => {
                        if(this.props.runFunc){
                            this.props.runFunc(this.state.obj?this.state.obj: [this.props.app.currentComponent]);
                            return
                        }
                        let obj;
                        if (this.state.obj) {
                        this.state.obj[0].getOperationsFactory().run();
                        obj = this.state.obj
                        } else {
                        if (this.props.app) {
                            this.props.app.state.opps.run();
                        obj = [this.props.app.currentComponent];
                        }
                        }
                        this.props.app.dispatch({updateRun:true})

                        if (this.props.callBack) {
                            
                        this.props.callBack(obj);
                        }
                    }}
                    >
                    {this.props.text ? this.props.text : "text='Create'"}
                </div>
            </div>
        );
    }
}



export default RunButton;