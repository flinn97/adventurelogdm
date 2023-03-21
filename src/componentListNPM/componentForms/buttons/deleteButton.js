import React, { Component } from 'react';

class DelButton extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {

        };
    }
    handleChange(e) {

  
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

   




        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle? this.props.wrapperStyle: {width:"100px", height:"20px", background:"red", borderRadius:"7px", display:"flex", justifyContent:"center", alignItems:"center"}} className={this.props.wrapperClass}>
                <div onClick={this.props.onClick?this.props.onClick: ()=>{
                    this.props.obj.getOperationsFactory().cleanPrepareRun({del:this.props.obj});
                    if(this.props.onChange){
                        this.props.onChange();
                    }
                }}
                >{this.props.text? this.props.text: "delete"}</div>
            </div>
        );
    }
}



export default DelButton;