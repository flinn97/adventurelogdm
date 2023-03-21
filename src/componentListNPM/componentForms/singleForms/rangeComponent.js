import React, { Component } from 'react';
import FormsThemeFactory from '../formThemes/formThemeFactory';

class RangeComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.createUUID = this.createUUID.bind(this);
        this.mouseDown=this.mouseDown.bind(this);
        this.onMouseUp=this.onMouseUp.bind(this);
        this.onMouseMove=this.onMouseMove.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.rangeRef = React.createRef();
        this.rangeBarRef=React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            id:this.props.id? this.props.id: this.createUUID(),
            moveSlider:false,
            left:"0px",
            right:"0px",
            x: 0
            
        };
    }

    createUUID(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        var charactersLength = characters.length;
        for(var i =0; i<length; i++){
            result +=characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }

    async handleChange() {

        
        
        await this.setState({ value: !this.state.value });
        this.props.handleChange(this.state.value);
        if(this.props.onClick){
            this.props.onClick(this.state.value)
        }

        
    }

    async onMouseMove(e){
        if(this.state.moveSlider){
            let x = this.state.x - e.x;
            let left =0;
            let right = 0;
            if(x<0){
               
                left = left-x+5;
                this.setState({left: left.toString()+"px"})
            }
            if(x>0){
                right = right+x+5;
                this.setState({right: right.toString()+"px"})
            }
        }

    }
    onMouseUp(e){
        if(this.state.moveSlider){
            this.setState({moveSlider:false})
        }
    }
    componentDidUpdate(props, state){
        if(this.state.moveSlider && !state.moveSlider){
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        }
        else if( !this.state.moveSlider&&state.moveSlider){
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.mouseDown);
        
        
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.mouseDown);
    }
    mouseDown(event){
        if (this.rangeRef && this.rangeRef.current.contains(event.target)) {
        console.log(this.rangeRef.current)
           this.setState({moveSlider:true, x:event.x})
                

            
        }
        this.handleClickOutside(event);
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
        else{
            theme = FormsThemeFactory.getFormsThemeFactory().default

        }
        let inputType = {
            
            normal: <div ref={this.rangeBarRef} style={this.props.inputStyle?this.props.inputStyle: theme.rangeBar}>
                {this.props.rangeIcon?(<img ref={this.rangeRef}  id ={this.props.id?this.props.id:this.state.id} src={this.props.rangeIcon} style={this.props.rangeThumbStyles?{...theme.rangeThumb, ...this.props.rangeThumbStyles}:{...theme.rangeThumb}}/>):
                (
                <div ref={this.rangeRef} id ={this.props.id?this.props.id:this.state.id} style={this.props.rangeThumbStyles?
                    {...theme.rangeThumb, ...this.props.rangeThumbStyles, marginLeft:this.state.left, marginRight:this.state.right
                }:{...theme.rangeThumb, marginLeft:this.state.left, marginRight:this.state.right}}></div>
                )}
            </div>
         
        }




        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:theme!==undefined? theme.rangeWrapperStyle:undefined} className={this.props.wrapperClass}>
                
                {this.props.label && (<label style={this.props.labelStyle?this.props.labelStyle:theme!==undefined? theme.rangeLabelStyle:undefined} className={this.props.labelClass}>{this.props.label}</label>)}
                {inputType[this.props.input]} 
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default RangeComponent;