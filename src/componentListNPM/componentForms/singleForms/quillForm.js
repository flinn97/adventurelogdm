import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './snowDark.css'


export default class QuillForm extends Component {
  constructor(props){
    super(props);
    this.state={
      value:''
    }
  
  }

  componentDidMount(){
    if(this.props.value){
      this.setState({value:this.props.value})
    }
  }
  componentDidUpdate(props, state){
    if(this.props.value){
      if(this.props.value!==props.value){
        this.setState({value:this.props.value})

      }
    }
  }




  render(){
  
  return (


      <div style={{width:"500px", height:"500px", background: "white"}}>
        <ReactQuill modules={{toolbar:[
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],                        // text direction
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }], 
  [{ 'align': [] }],
  ['clean']                                         // remove formatting button
]}} style={{width:"100%", height:"80%", background:"white"}} theme="snow" value={this.state.value} onChange={(value)=>{
          debugger
          this.setState({value: value});
          this.props.handleChange(value);
          
        }} />
      </div>
  )}
}