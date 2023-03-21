import React, { Component } from 'react';
import "./checkbox.css"
import FormsThemeFactory from '../formThemes/formThemeFactory';

class CheckBox extends Component {
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
    async markcheckbox() {
        await this.setState({checked:!this.state.checked})
        this.props.handleChange(this.state.checked);
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

export default CheckBox;