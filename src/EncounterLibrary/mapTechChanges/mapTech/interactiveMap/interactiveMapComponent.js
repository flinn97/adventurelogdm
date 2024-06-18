import BaseClass from '../baseClass';
import React from 'react';


//this could be updated to use the baseclass getHtml
export default class InteractiveMap extends BaseClass {
  constructor(props) {
    super(props);

    this.mapContainer = React.createRef();
    this.zoom = this.zoom.bind(this);


    this.state = {
      isDragging: undefined

    }
  }


  componentDidMount() {
    let props = this.props.props
    let list = props.list;
    let saveList = []
    for (let obj of list) {
      let listItem = document.getElementById(obj.getJson()._id);

      listItem.addEventListener("mousedown", (e) => {
        this.setState({ isDragging: document.getElementById(obj.getJson()._id) });
      });
      listItem.addEventListener("mouseup", (e) => {
        this.setState({ isDragging: undefined });
        // const containerRect = this.mapContainer.current.getBoundingClientRect();
        // Calculate relative x and y
        // const x = e.pageX - containerRect.left - 25;
        // const y = e.pageY - containerRect.top - 25;
        // console.log("x:", x);
        // console.log("y:", y)
      });

      saveList.push(listItem);
      this.setState({ saveList: saveList })
    }
    if (this.mapContainer?.current) {
      this.mapContainer.current.addEventListener("mouseup", (e) => {
        this.setState({ isDragging: undefined });
      });
      this.mapContainer.current.addEventListener("mousemove", (e) => {
        if (this.state.isDragging !== undefined) {
          let el = this.state.isDragging;
          let id = el.id;
          let comp = list.find(obj => obj.getJson()._id === id);
          if (comp.getJson().draggable !== false) {
            // Get the position of the container
            const containerRect = this.mapContainer.current.getBoundingClientRect();

            // Calculate relative x and y
            const x = e.pageX - containerRect.left - 25;
            const y = e.pageY - containerRect.top - 25;

            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
          }


        }

      })

    }
  }

  zoom(num) {
    
    let containerRect = this.mapContainer.current.getBoundingClientRect();
    let width = containerRect.width * num;
    let height = containerRect.height * num;
    this.mapContainer.current.style.width = width + "px";
    this.mapContainer.current.style.height = height + "px";

    let list = this.state.saveList;
    for (let el of list) {
      // Get the current style values
      const currentLeft = el.style.left || '0';
      const currentTop = el.style.top || '0';

      // Extract the numeric values using regex
      const leftMatch = currentLeft.match(/(-?\d*\.?\d+)/);
      const topMatch = currentTop.match(/(-?\d*\.?\d+)/);

      // Parse the values or use 0 if not found
      const leftValue = leftMatch ? parseFloat(leftMatch[0]) : 0;
      const topValue = topMatch ? parseFloat(topMatch[0]) : 0;

      // Multiply the values
      const newLeft = leftValue * num;
      const newTop = topValue * num;

      // Update the style attributes
      el.style.left = newLeft + "px";
      el.style.top = newTop + "px";
    }


  }

  componentDidUpdate(props, state) {
    if (this.props.props.list.length !== props.props.list.length) {
      this.componentDidMount();
    }
  }


  render() {
    let props = this.props.props
    let list = props.list
    let cells = props.cells;
    let factory = props.interface.getFactory();
    let themeFactory = props.interface.getThemeFactory();
    let theme = props.theme ? props.theme : "defaultColumn"
    theme = themeFactory.getComponent(theme);
    let picObj = props.picObj;

    let picSrc
    if (picObj) {
      picSrc = props.mapAttribute ? picObj.getJson()[props.mapAttribute] : picObj.getJson().picURL;
    }
    let addComponentButton = props.addComponentButton;
    if (addComponentButton !== undefined) {
      if (typeof addComponentButton === "string") {
        addComponentButton = factory.getComponent("addComponentButton", { ...props, mapId: picObj ? picObj.getJson()._id : undefined, addType: addComponentButton })
      }
      else {
        addComponentButton.type = addComponentButton.type ? addComponentButton.type : "addComponentButton";
        addComponentButton = factory.getComponent(addComponentButton.type, { ...props, mapId: picObj ? picObj.getJson()._id : undefined, addType: addComponentButton.type })

      }
    }



    return (
      <div ref={this.mapContainer} className={props.mapContainerClass ? props.mapContainerClass : theme.MCMapContainer} style={{ ...props.mapContainerStyle }}>
        <img src={picSrc} className={props.mapClass ? props.mapClass : theme.MCMap} style={{ ...props.mapStyle }} />

        {list.map((obj, index) => {
          let p = { obj: obj, props: props, interface: this.interface, cell: props.pinCell, theme: props.theme }
          return (<div id={obj.getJson()._id} className={props.mapSectionClass ? props.mapSectionClass : theme.MCMapSection} style={{ ...props.mapSectionStyle, left: obj.getJson().x + "px", top: obj.getJson().y + "px" }} key={index}>
            <>{factory.getComponent(props.pinType ? props.pinType : "attribute", p)}</>


          </div>)
        }

        )}
        {props.addComponentButton && <>{addComponentButton}</>}
        <div style={{ position: 'absolute', top: "0px", right: "0px" }} onClick={() => { this.zoom(.5) }}>zoom out</div>
        <div style={{ position: 'absolute', top: "20px", right: "0px" }} onClick={() => { this.zoom(2) }}>zoom in</div>
      </div>

    )
  }
}


