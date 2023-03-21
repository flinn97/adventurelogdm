import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';

class RadioComponent extends Component {
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

        
        
        await this.setState({ value: !this.state.value });
        this.props.handleChange(this.state.value);
        if(this.props.onClick){
            this.props.onClick(this.state.value)
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
            
            normal: <input
            type='radio'
            className={this.props.class ? this.props.class : "form-control"}
            
            onChange={this.handleChange}
            name={this.props.name}
            value={this.state.value}

            onClick={this.props.onClick}
            
            style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.radioStyle:undefined}
            id={this.props.id}
            checked={this.props.checked}
            />
         
        }




        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:theme!==undefined? theme.switchWrapperStyle:undefined} className={this.props.radioWrapperClass}>
                {this.props.label && (<label style={this.props.labelStyle?this.props.labelStyle:theme!==undefined? theme.switchLabelStyle:undefined} className={this.props.radioLabelClass}>{this.props.label}</label>)}
                {inputType[this.props.input]}
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default RadioComponent;