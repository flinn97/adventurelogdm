import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import InputFormComponent from './singleForms/inputComponent.js'
import RichTextComponent from './singleForms/RichTextComponent.js';
import TextBoxComponent from './singleForms/TextBoxComponent.js';
import SwitchComponent from './singleForms/switchComponent.js';
import RangeComponent from './singleForms/rangeComponent.js';
import RadioComponent from './singleForms/radioComponent.js';
import InputToTextBoxComponent from './singleForms/inputToTextBoxComponent.js';
import InputToRichTextComponent from './singleForms/inputToRichEditor.js';
import CheckBox from './singleForms/checkComponent.js';
class MassSingleForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.prepareOnClick=this.prepareOnClick.bind(this);
        this.handleHTMLChange=this.handleHTMLChange.bind(this);
        this.objDispatch=this.objDispatch.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
           
        };
    }

    /**
     * For rich editor to update html instead of plain text.
     * @param {*} change 
     */
    handleHTMLChange(change){
        
        this.setState({ [this.props.name]: change });
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
    handleChange(e) {

        
        let { name, value } = e.target;
        
        this.setState({ [name]: value });
       
    }
    /**
     * update a value all at once. Same as handleHTMLChange but made to me more generic in clase the html change needs to be more complicated.
     * @param {} value 
     */
    objDispatch(value){
        
        this.setState({ [this.props.name]: value });
    }

    handleSubmit(e) {

        
        let obj = {...this.state};
        
        this.props.obj.setCompState({...obj})
       
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
            if(this.props.updateOnClickOutside){
                

            }
        }
    }

    render() {
       
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        let types ={
            text: <InputFormComponent 
            rows={this.props.rows}
            cols={this.props.cols}
            objDispatch={this.objDispatch}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            theme={this.props.theme}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.differentInputType? this.props.differentInputType: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labeStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />,

            checkbox: <CheckBox 
            
            objDispatch={this.objDispatch}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            theme={this.props.theme}
            inputStyle={this.props.inputStyle}
           
            label={this.props.label}
            
            labelClass={this.props.labelClass}
            labelStyle={this.props.labeStyle}
            onClick={this.props.onClickFunc}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            tickClass={this.props.tickClass}
            handleChange={this.props.func? this.props.func:this.objDispatch} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            
           
            requiredMessage={this.props.requiredMessage}
            />,
            switch: <SwitchComponent 
           
            objDispatch={this.objDispatch}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            theme={this.props.theme}
            inputStyle={this.props.inputStyle}
            label={this.props.label}
            labelStyle={this.props.labeStyle}
            onClick={this.props.onClickFunc}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            handleChange={this.props.func? this.props.func:this.objDispatch} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />,
            range: <RangeComponent 
           
            objDispatch={this.objDispatch}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            theme={this.props.theme}
            inputStyle={this.props.inputStyle}
            label={this.props.label}
            labelStyle={this.props.labeStyle}
            onClick={this.props.onClickFunc}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            handleChange={this.props.func? this.props.func:this.objDispatch} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />,
            radio: <RadioComponent 
           
            objDispatch={this.objDispatch}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            theme={this.props.theme}
            inputStyle={this.props.inputStyle}
            label={this.props.label}
            labelStyle={this.props.labeStyle}
            onClick={this.props.onClickFunc}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            checked={this.props.checked}
            handleChange={this.props.func? this.props.func:this.objDispatch} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />,
            textArea:<TextBoxComponent 
            rows={this.props.rows}
            theme={this.props.theme}
            objDispatch={this.objDispatch}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labeStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}/>,


            inputToTextArea:<InputToTextBoxComponent 
            rows={this.props.rows}
            app={this.props.app}
            inputStartStyle={this.props.inputStartStyle}
            theme={this.props.theme}
            objDispatch={this.objDispatch}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labeStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}/>,

            inputToRichEditor: <InputToRichTextComponent
            rows={this.props.rows}
            theme={this.props.theme}
            objDispatch={this.objDispatch}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            handleHTMLChange={this.handleHTMLChange}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            app={this.props.app}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labeStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            html ={!this.state.obj? undefined: this.state.obj[0].getJson().html}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />,

            richEditor: <RichTextComponent 
            rows={this.props.rows}
            theme={this.props.theme}
            objDispatch={this.objDispatch}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            handleHTMLChange={this.handleHTMLChange}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labeStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            html ={!this.state.obj? undefined: this.state.obj[0].getJson().html}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />
        }


        return (
            <div >
            </div>
        );
    }
}



export default MassSingleForm;