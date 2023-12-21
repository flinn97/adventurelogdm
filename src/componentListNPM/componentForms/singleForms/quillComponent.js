import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import moment from 'moment';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import adventureLogStyles from "../../themes/adventureLogStyles";
import Quill from 'quill';

class QuillComponent extends Component {
    constructor(props) {
        let styles = adventureLogStyles.getStylesByScreenSize();
        super(props);
        // this.addTag=this.addTag.bind(this);
        this.wrapperRef = React.createRef();
        this.ref = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            html:<div></div>,
            textHtml:"<div></div>",
            index:1,
            n: 0,
            m:false,
            l:false,
            d:false,
            e:false,
            f:false,
            doubleSpace:false,
            backSlash: false,
            change:false,
            lastChar: "",
            colors:{
                m: 'orange',
                l: 'yellow',
                f: 'green',
                e: 'maroon',
                d:'#FFD700'

            }
        };
    }

    





    async componentDidMount() {
        // var quill = new Quill('#editor-container', {
        //     modules: {
        //       toolbar: [
        //         [{ header: [1, 2, false] }],
        //         ['bold', 'italic', 'underline'],
        //         ['image', 'code-block']
        //       ]
        //     },
        //     placeholder: 'Compose an epic...',
        //     theme: 'snow'  // or 'bubble'
        //   });
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
                this.props.handleHTMLChange(this.state.theHtml);
    
            }
        }
    }


    render() {
        let theme= undefined;
        if(this.props.theme){
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        // let inputType = {
        //     normal: <div 
        //     ref={this.ref} className={this.props.class ? this.props.class : "form-control"}
        //     style={this.props.inputStyle? this.props.inputStyle: theme!==undefined? theme.richEditorStyle: {height:"fit-content"}}
        //     id="quillEditor"
        //     onClick={()=>{
        //         this.setState({active:true})
        //         this.props.onClick();
        //     }}
        //     onBlur={()=>{this.setState({active:false})}}></div>
           
        // }




        return (
            <div ref={this.wrapperRef} 
            style={this.props.wrapperStyle? this.props.wrapperStyle:theme!==undefined?theme.richEditorWrapperStyle:undefined} 
            className={this.props.wrapperClass}>
                <div 
            ref={this.ref} className={this.props.class ? this.props.class : "form-control"}
            style={this.props.inputStyle? this.props.inputStyle: theme!==undefined? theme.richEditorStyle: {height:"fit-content"}}
            id="quillEditor"
            onClick={()=>{
                this.setState({active:true})
                this.props.onClick();
            }}
            onBlur={()=>{this.setState({active:false})}}></div>
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default QuillComponent;