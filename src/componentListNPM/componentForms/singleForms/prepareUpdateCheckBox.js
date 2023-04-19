import React, { Component } from 'react';
import "./checkbox.css"
import FormsThemeFactory from '../formThemes/formThemeFactory';


/**
 * props
 * emitClickedOutside
 * handleChange
 * wrapperStyle
 * theme
 * id
 * onClick
 * labelClass
 * labelStyle
 * tickClass
 * tickStyle
 * app
 */
class PrepareUpdateCheckBox extends Component {
    constructor(props) {
        super(props);
        this.markcheckbox = this.markcheckbox.bind(this);
        this.state = {
            checked:this.props.value
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    async componentDidUpdate(){
        if(this.props.app?.state?.unMarkCheck){
            await this.props.app?.dispatch({unMarkCheck:false});
            this.setState({checked:false});
        }
        
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
           
        }
    }
    /**
     * 
     * @param {*} e 
     * @param {*} day 
     * check the box send to backend.
     */
    async  markcheckbox() {
        await this.setState({checked:!this.state.checked})
        if(this.props.handleChange){
            this.props.handleChange(this.state.checked);
        }
        else{
            if(this.state.checked){
                await this.props.app.state.opps.prepare({update:this.props.obj});

            }
            else{
                await this.props.app.state.opps.removeFromRegister(this.props.obj)
            }
            this.props.app.dispatch({checkComplete:true, checkObj:this.props.obj})
        }
    }

    render() {
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        return (

            <div className={this.props.class} style={this.props.wrapperStyle?{...this.props.wrapperStyle}:theme!==undefined? {...theme.checkWrapperStyle}:{}}>
                <input id={this.props.id} type="checkbox"  checked={this.state.checked }/>
                <label onClick={this.props.onClick?this.props.onClick:this.markcheckbox} className={this.props.labelClass?this.props.labelClass:"change-label2"} 
                style={this.props.labelStyle?{...this.props.labelStyle, cursor:"pointer"}:theme!==undefined? {...theme.checkLabelStyle, cursor:"pointer"}:{cursor:"pointer"}}>

                <div className={this.props.tickClass?this.props.tickClass:"tickFix1"} style={this.props.tickStyle?this.props.tickStyle:theme!==undefined?theme.tickStyle:undefined}></div>
                        </label>  
  
           </div>
            )
}
}

export default PrepareUpdateCheckBox;