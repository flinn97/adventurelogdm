import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import diceService from '../../../services/diceService';
class PriceFormComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.formatPrice = this.formatPrice.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            rerender: false,
        };
    }


    handleChange(e) {
        
        let { name, value } = e.target;

        if (!value.match(/^\d*\.?\d*$/)) {
            return; // Early return if input is not a number or contains more than one period
        }
        
        this.setState({ value });
       
        if(!this.props.updateOnClickOutside){
            this.props.handleChange({target: { name, value: this.formatPrice(value) }});

        }
    }

    formatPrice(value) {
        if (!value) return '0.00'; // Return 0.00 if value is empty
    
        const numericValue = parseFloat(value);
        return numericValue.toFixed(2); // Convert to float and format as price
    }

    async check(){
        
        await this.setState({value:!this.state.value})
        this.props.objDispatch(this.state.value);
    }

    componentDidUpdate(props, state){
        if(this.props.value!==props.value){
            this.setState({value:this.props.value})
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        if (this.props.doesMath){
        document.addEventListener('keydown', this.handleKeyDown);
            const calculatedValue = this.calculateMath(this.props.value);
            this.setState({ value: calculatedValue });
            if (this.props.updateOnClickOutside) {
                this.props.objDispatch(calculatedValue);
            }
        
        }
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' && this.props.doesMath) {
            const calculatedValue = this.calculateMath(this.state.value);
            this.setState({ value: calculatedValue });
            if (this.props.objDispatch) {
                this.props.objDispatch(calculatedValue);
            }
            event.preventDefault();
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
            if(this.props.updateOnClickOutside){
                
                this.props.objDispatch(this.state.value);

            }
        }

        if (this.props.doesMath) {
            const calculatedValue = this.calculateMath(this.state.value);
            this.setState({ value: calculatedValue });
            if (this.props.updateOnClickOutside) {
                this.props.objDispatch(calculatedValue);
            }
        } else if (this.props.updateOnClickOutside) {
            this.props.objDispatch(this.state.value);
        }
    }

    handleBlur(e) {
        const { value } = e.target;
        const formattedValue = this.formatPrice(value);
        this.setState({ value: formattedValue });
        if (this.props.handleChange) {
            this.props.handleChange({ target: { name: e.target.name, value: formattedValue } });
        }
    }

    render() {
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }


        let inputType = {
            required: <input 
            onBlur={(e) => this.handleBlur(e)}
            type={this.props.type}
            onFocus={this.props.onFocus}
            className={this.props.class ? this.props.class : "form-control"}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            name={this.props.name}
            value={this.state.value}
            min={this.state.min}
            max={this.state.max}
            autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
            style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.inputStyle:undefined}
            id={this.props.id}
            checked={this.props.checked}
            spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            onClick={this.props.onClick}
                required
               
            />,

            normal: <input
            onFocus={this.props.onFocus}
            onBlur={(e) => this.handleBlur(e)}
                type={this.props.type}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                name={this.props.name}
                value={this.state.value}
                min={this.state.min}
                max={this.state.max}
                onClick={this.props.onClick}
                autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
                style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.inputStyle:undefined}
                id={this.props.id}
                checked={this.props.checked}
                spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
                minLength={this.props.minLength}
                maxLength={this.props.maxLength}
            />,
            disabled: <input
            id={this.props.id}
            onFocus={this.props.onFocus}
                type={this.props.type}
                style={this.props.inputStyle?this.props.inputStyle:theme!==undefined? theme.inputStyle:undefined}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onClick={this.props.onClick}
                disabled


            />
        }
        



        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:theme!==undefined? theme.wrapperStyle:undefined} className={this.props.wrapperClass}>
                {this.props.label && (<label style={this.props.labelStyle?this.props.labelStyle:theme!==undefined? theme.labelStyle:undefined} className={this.props.labelClass}>{this.props.label}</label>)}
            <div style={{display:"flex", flexDirection:"row"}}>  
                <div style={this.props.unitStyle?this.props.unitStyle:{...this.props.unitStyle
                    ,color:"#555555", fontSize:"1.2rem", marginRight:"5px"}}>{this.props.unit}</div>
                <div>{inputType[this.props.input]}</div>
            </div> 

                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default PriceFormComponent;