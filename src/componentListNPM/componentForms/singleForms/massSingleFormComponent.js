import React, { Component } from 'react';
// import FormsThemeFactory from '../componentListNPM/componentForms/formThemes/formThemeFactory';
// import InputFormComponent from '../componentListNPM/componentForms/singleForms/inputComponent.js'
// import RichTextComponent from '../componentListNPM/componentForms/singleForms/RichTextComponent.js';
// import TextBoxComponent from '../componentListNPM/componentForms/singleForms/TextBoxComponent.js';
// import SwitchComponent from '../componentListNPM/componentForms/singleForms/switchComponent.js';
// import RangeComponent from '../componentListNPM/componentForms/singleForms/rangeComponent.js';
// import RadioComponent from '../componentListNPM/componentForms/singleForms/radioComponent.js';
// import InputToTextBoxComponent from '../componentListNPM/componentForms/singleForms/inputToTextBoxComponent.js';
// import InputToRichTextComponent from '../componentListNPM/componentForms/singleForms/inputToRichEditor.js';
// import CheckBox from '../componentListNPM/componentForms/singleForms/checkComponent.js';
// import UpdateAndRunButton from '../componentListNPM/componentForms/buttons/updateAndRunButton';
// import SelectComponent from '../componentListNPM/componentForms/singleForms/selectComponent';
class ParentFormComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleHTMLChange=this.handleHTMLChange.bind(this);
        this.objDispatch=this.objDispatch.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChangeWithoutEvent=this.handleChangeWithoutEvent.bind(this)
        this.state = {
           
        };
    }

    /**
     * For rich editor to update html instead of plain text.
     * @param {*} change 
     */
    handleHTMLChange(change){
        
        this.setState({ [this.props.name]: change });
        this.props.formUpdate({[this.props.name]: change})
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
        this.props.formUpdate({[name]: value})
    }
    /**
     * update a value all at once. Same as handleHTMLChange but made to me more generic in clase the html change needs to be more complicated.
     * @param {} value 
     */
    objDispatch(value){
        
        this.setState({ [this.props.name]: value });
        this.props.formUpdate({[this.props.name]: value})
    }

     /**
     * @param {} value 
     */
     handleChangeWithoutEvent(obj){
        
        this.setState({ [obj.name]: obj.value });
        this.props.formUpdate({[obj.name]:obj.value})
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
            />,
            select: <SelectComponent 
            name={this.props.name}
        defaultValue={this.props.defaultValue}
        emitClickedOutside={this.props.emitClickedOutside}
        id={this.props.id}
        theme={this.props.theme}
        objDispatch={this.objDispatch}
        inputStyle={this.props.inputStyle}
            app={this.props.app}
            updateOnClickOutside= {this.props.updateOnClickOutside}
            label={this.props.label}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labelStyle}
            labelClass={this.props.labelClass}
            class={this.props.class}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperClass={this.props.wrapperClass}
            wrapperStyle={this.props.wrapperStyle}
            size={this.props.size}
            selectOptions={this.props.selectOptions}
            textOptions= {this.props.textOptions}
            handleChange={this.props.func? this.props.func:this.handleChange} 
            handleChangeWithoutEvent={this.props.handleChangeWithoutEvent? this.props.handleChangeWithoutEvent: this.handleChangeWithoutEvent}
            //  value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            requiredMessage={this.props.requiredMessage}
            input={this.props.required? "required": this.props.disabled? "disabled": this.props.inputType?this.props.inputType:"normal"}

            />
        }


        return (
            <>{this.state.start&&(
                <>{this.props.type? types[this.props.type]:types.text} </>
               )}</>
           
        );
    }
}

class ContactForm extends Component{
    constructor(props) {
      super(props);
      this.formUpdate=this.formUpdate.bind(this)
      this.state={

      }

      
    }

    formUpdate(obj){
        this.setState({...obj})
    }

    render(){
      let app = this.props.app;
      let dispatch = app.dispatch;
      let state = app.state;
      let componentList = state.componentList;
      let styles =state.styles;
  
      return(
        <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", position:"relative"}}>
            <ParentFormComponent app={app}  name="name" theme="default" placeholder="name" formUpdate={this.formUpdate}/>
      <ParentFormComponent app={app}  name="email" theme="default" placeholder="email" formUpdate={this.formUpdate}/>
      <ParentFormComponent app={app}  name="phone" theme="default" placeholder="phone" formUpdate={this.formUpdate}/>
      <ParentFormComponent app={app}  name="notes" type="textArea" theme="default" placeholder="notes" formUpdate={this.formUpdate}/>
      <ParentFormComponent app={app}  name="platform" theme="default" placeholder="platform" formUpdate={this.formUpdate}/>
      <ParentFormComponent app={app} type ="select" name="tag" defaultValue={state.currentComponent.getJson().tag}  theme="default"
      selectOptions={componentList.getList("tag").map((obj, index)=>{return obj.getJson().name})} formUpdate={this.formUpdate}/>
      <div style={{position:"absolute", bottom:"0", marginBottom:"10px"}}>
      <UpdateAndRunButton app={app} obj={state.currentComponent} theme={"default"} updateObj={{...this.state}} />
      </div>
            </div>
      )
    }
  }
    



export default ContactForm;