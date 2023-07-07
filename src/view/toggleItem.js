import React, { Component } from 'react';
import "../App.css"
import MapComponent from '../componentListNPM/mapTech/mapComponent';


export default class ToggleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
    toggleClicked:false,

    };}

    

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let items = this.props.items;
    let styles = state.styles;
    console.log('toggle is', this.state.toggleClicked);

    return (
   <div>
    <div>

    <div style={{...styles.buttons.buttonClose}}
                                      //TRUE OR FALSE
    onClick={() => {
      console.log('Button clicked')
      this.setState({toggleClicked:!this.state.toggleClicked})}}
    >
        ...
        </div>

                    {
                    this.state.toggleClicked && 
<div style={{color:styles.colors.colorWhite}}>
                          
                          {
                          this.props.props.items.map((item,index)=>
                          <div>
                <div>
                            {item ==="delete" && (
                            <div>delete</div>
                            )}
                </div>

                <div>

                            {item ==="edit" && (
                              <div>edit</div>
                            )}
                </div>

                <div>

                            {item ==="copy" && (
                              <div>copy</div>
                            )}
                </div>

                <div>           
                            {
                            typeof item ==='function' && (
                              <div>
                              <item app={{app}}/>
                                </div>
                            )}
                </div>
                          
                            
                            </div>
                            
                  )}


                   
</div>}



    </div>
   </div>
  )}
}

