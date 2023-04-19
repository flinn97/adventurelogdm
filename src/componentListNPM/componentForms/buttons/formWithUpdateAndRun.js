import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import ParentFormComponent from '../parentFormComponent';
import UpdateAndRunButton from './updateAndRunButton';

export default class FormWithUpdateAndRun extends Component {
    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);

        this.state={
            
        }
    }

    /**
     * For rich editor to update html instead of plain text.
     * @param {*} change 
     */
    handleHTMLChange(obj, change){
        
        this.setState({ [this.props.name]: change });
  }

	handleChange = async (obj, event) => {
        debugger
        if(!event.target){
            this.setState({ [this.props.name]: event });
        }
        else{
            let { name, value } = event.target;
            this.setState({
                [name]: value
            })
        }
        
        
	};



    render(){
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        let app = this.props.app;



        return(
                    <div style={this.props.formsWrapperStyle?{...this.props.formsWrapperStyle}:theme!==undefined?theme.formsWrapperStyle:{} }>
                        <ParentFormComponent app={app} obj={this.props.obj} 
                         rows={this.props.rows}
                         cols={this.props.cols}
                         
                         emitClickedOutside={this.props.emitClickedOutside}
                         id={this.props.id}
                         theme={this.props.theme}
                         inputStyle={this.props.inputStyle}
                         spellCheck={this.props.spellCheck}
                         label={this.props.label}
                         differentInputType={this.props.differentInputType}
                         type={this.props.type}
                         prepareOnClick={this.props.prepareOnClick}
                         labelStyle={this.props.labelStyle}
                         prepareOnClickFunc={this.props.prepareOnClickFunc}
                         wrapperStyle={this.props.wrapperStyle}
                         class = {this.props.class} 
                         placeholder={this.props.placeholder} 
                         func={this.handleChange} 
                         name={this.props.name} 
                          
                         min={this.props.min}
                         max={this.props.max}
                         autoComplete={this.props.autoComplete}
                         checked={this.props.checked}
                         minLength={this.props.minLength}
                         maxLength={this.props.maxLength}
                         updateOnClickOutside= {this.props.updateOnClickOutside}
                         required={this.props.required}
                         disabled={this.props.disabled}
                         
                         requiredMessage={this.props.requiredMessage}
            labelClass={this.props.labelClass}
            tickClass={this.props.tickClass}
            handleHTMLChange={this.handleHTMLChange}
                        
                        />
                        <UpdateAndRunButton app={app} obj={this.props.obj} theme={this.props.theme} updateObj={{...this.state}} wrapperStyle={this.props.runButtonStyle} text={this.props.text}
                        buttonTextStyle={this.props.buttonTextStyle}/>
                 </div>
             )
    }
	
}