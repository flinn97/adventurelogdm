import React, { Component } from 'react';
import InputFormComponent from './singleForms/inputComponent.js'
import RichTextComponent from './singleForms/RichTextComponent.js';
import TextBoxComponent from './singleForms/TextBoxComponent.js';
import SwitchComponent from './singleForms/switchComponent.js';
import RangeComponent from './singleForms/rangeComponent.js';
import RadioComponent from './singleForms/radioComponent.js';
import InputToTextBoxComponent from './singleForms/inputToTextBoxComponent.js';
import InputToRichTextComponent from './singleForms/inputToRichEditor.js';
import CheckBox from './singleForms/checkComponent.js';
import FormWithUpdateAndRun from './buttons/formWithUpdateAndRun.js';
/**
 * Parent form component has every option that is a single form or a button
 * 
 */
class ParentFormComponent extends Component {
    constructor(props) {
        //create state
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.prepareOnClick=this.prepareOnClick.bind(this);
        this.handleHTMLChange=this.handleHTMLChange.bind(this);
        this.objDispatch=this.objDispatch.bind(this);
        this.state = {
            obj: undefined,
            start: false
        };
    }

    /**
     * For rich editor to update html instead of plain text.
     * @param {*} change 
     */
    handleHTMLChange(change){
          //debugger
          
          for(const key in this.state.obj){
              this.state.obj[key].setJson({...this.state.obj[key].getJson(), [this.props.name]:change});
              this.setState();
          }
          // this.setState({obj:this.state.obj});
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

    /**
     * check if prepare on click
     * if there is an object either in the current component or the obj change the obj into and array of objs if it isn't already and set state.
     */
    componentDidMount(){
        //debugger
        if(!this.props.prepareOnClick){

        
       let obj =   this.props.obj? this.props.obj: this.props.app?.state?.currentComponent;
       if(obj){
        obj = this.isArray(obj)
       }
       this.setState({
        obj:obj,
        start:true
       })
    }
    else{
        this.setState({
            start:true
           })
    }
    }

    /**
     * Prepare on click with a json object
     * prepareOnClick={operation:"exe cleanPrepare", operate:"exe addpost", }
     * Will not prepare on click multiple json objs instead you must specify a number and multiple will only work with adding an obj
     */
    async prepareOnClick(){
        
        if(this.props.prepareOnClick && this.props.app){
            let obj =  this.props.obj;
            if(obj){
             obj = this.isArray(obj)

            }
            obj =await this.props.app?.state.componentList.getOperationsFactory()[this.props.prepareOnClick.operation]({[this.props.prepareOnClick.operate]:obj});
                //obj should return a class object for 
            obj = obj[this.getSplice(this.props.prepareOnClick.operate)];
            if(obj){
                obj = this.isArray(obj)
               }
            this.setState({
                obj:obj
            })
        }
        
        
    }

    /**
     * 
     * @param {*} word 
     * @returns the operate register for this object 
     */
    getSplice(word){
        if( word.includes("add")){
            word="add";
        }
        else if(word.includes("update")){
            word="update";
        }
        else if(word.includes("del")){
            word="del";
        }
        return word;
    }

    /**
     * Directly updates the object(s)
     * @param {*} event 
     */
    handleChange = async (event) => {
        // //debugger
        const { name, value } = event.target
        for(const key in this.state.obj){
            this.state.obj[key].setJson({...this.state.obj[key].getJson(), [this.props.name]:value});
        }
        // this.setState({obj:this.state.obj});

    }
    /**
     * update a value all at once. Same as handleHTMLChange but made to me more generic in clase the html change needs to be more complicated.
     * @param {} value 
     */
    objDispatch(value){
        for(const key in this.state.obj){
            this.state.obj[key].setJson({...this.state.obj[key].getJson(), [this.props.name]:value});
            //for dev purposes
            this.setState();
        }
    }
    
    render() {
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
            labelStyle={this.props.labelStyle}
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
            labelStyle={this.props.labelStyle}
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
            labelStyle={this.props.labelStyle}
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
            labelStyle={this.props.labelStyle}
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
            labelStyle={this.props.labelStyle}
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
            labelStyle={this.props.labelStyle}
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
            labelStyle={this.props.labelStyle}
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
            handleHTMLChange={this.props.func?this.props.func: this.handleHTMLChange}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            app={this.props.app}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labelStyle}
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
            handleHTMLChange={this.props.func?this.props.func: this.handleHTMLChange}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labelStyle}
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
           
        }
        return (
           <>{this.state.start&&(
            <>{this.props.type? types[this.props.type]:types.text} </>
           )}</>
        );
    }
}

export default ParentFormComponent;