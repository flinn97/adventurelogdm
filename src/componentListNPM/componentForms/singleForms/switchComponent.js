import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import Switch from "react-switch";

class SwitchComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max
        };
    }
    async handleChange() {
        // Toggle internal state
        const newValue = !this.state.value;
        await this.setState({ value: newValue });
    
        // Notify parent of state change
        if (this.props.handleChange) {
            this.props.handleChange(newValue);
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
    render() {
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        let inputType = {
            
            normal: <Switch
            onChange={() => {
                this.handleChange(); // Call handleChange to manage internal state
                if (this.props.handleChange) {
                    this.props.handleChange(!this.state.value); // Notify parent component of the new state
                }
            }}
            id={this.props.id}
            checked={this.state.value} // Use internal state for checked attribute
            onColor={this.props.inputStyle ? this.props.inputStyle.backgroundColor : theme ? theme.switchStyle.backgroundColor : "#57BA8E"}
            name={this.props.name}
            uncheckedIcon={this.props.uncheckedIcon || false}
            checkedIcon={this.props.checkedIcon || false}
        />
         
        }




        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:theme!==undefined? theme.switchWrapperStyle:undefined} className={this.props.wrapperClass}>
                {this.props.label && (<label style={this.props.labelStyle?this.props.labelStyle:theme!==undefined? theme.switchLabelStyle:undefined} className={this.props.labelClass}>{this.props.label}</label>)}
                {inputType[this.props.input]}
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default SwitchComponent;