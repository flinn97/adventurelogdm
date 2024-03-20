import MapFactory from "./itemTypeFactory";
import { Component } from 'react';
import ThemeFactory from "./themes/themeFactory";
import FilterFactory from "./filterFacotry";
class MapComponentInterface {
    factory;
    componentList;
    app;
    themeFactory;
    appComponent;
    setUpArr;
    set;
    FilterFactory;
    constructor() {
        this.getFactory();
        this.getThemeFactory();
        this.getFilterFactory();

    }
    /**
     
     * @returns factory for map items
     */
    getFactory() {
        if (this.factory === undefined) {
            this.factory = new MapFactory();
        }
        return this.factory;
        
    }

    /**
     * 
     * @returns theme factory for map items
     */
    getThemeFactory() {
        if (this.themeFactory === undefined) {
            this.themeFactory = new ThemeFactory();
        }
        return this.themeFactory;
    }


    /**
     * 
     * @returns singleton filter factory;
     */
    getFilterFactory(){
        if (this.filterFactory === undefined) {
            this.filterFactory = new FilterFactory();
        }
        return this.filterFactory;
    }

    getMapComponent(props) {
        
        let type = props.type?props.type:"map"
        let map = this.factory.getComponent(type, props);
        return map;

    }
    getAppComponent(){
        return this.appComponent

    }
    setAppComponent(APP){
        this.appComponent = APP
    }

    setApp(arr) {
        let obj = {}
        for(let str of arr){
            obj[str] = this.appComponent[str]
        }

        this.app = obj;
        this.setUpArr = arr;
        return this.app
    }
    getApp() {
        return this.setApp(this.setUpArr); 
    }
    setComponentList(c) {
        this.componentList = c;
        this.set=true;
    }
    getComponentList() {
        if(!this.set){
            this.componentList = this.appComponent.getComponentList();

        }
        return this.componentList
    }


}
const mapInterface = new MapComponentInterface()



//model
class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        
        let mapComponentInterface = mapInterface;
        let filterFacotry = mapComponentInterface.getFilterFactory();
        let app = this.props.app?this.props.app:mapComponentInterface.getApp();
        let state = app?.state;
        let componentList = mapComponentInterface?.getComponentList();
        let cells = this.props.cells;
        let name = this.props.name;
        
        let filters = this.props.filters;
        let filterFunc = this.props.filterFunc;
        if(!filterFunc && filters!==undefined){
            let funcOb = filters?.find(obj=>obj.type==="filterFunc");
            if(funcOb){
                filterFunc = funcOb.func 
            }
        }
        let filter = this.props.filter;
        if(!filter&& filters!==undefined){
            let filterOb = filters?.find(obj=>obj.type==="filter");
            if(filterOb){
                filter = {...filterOb}
            }
        }

        
        let list = this.props.list ? this.props.list : filter ? componentList?.getList(name, filter?.search, filter?.attribute) : componentList?.getList(name);
        if (list) {
            list =list.filter((obj) => {
                if (filterFunc) {
                    return filterFunc(obj)
                }
                else {
                    return true
                }
            }
            );
        }

        if(filters){
            for(let obj of filters){
                let func = filterFacotry.getFilter(obj.type);
                if(func){
                    list = func({list:list, ...obj});
                }
            }

        }


        let props = { interface: mapComponentInterface, app: app, cells: cells, list: list, theme:this.props.theme, type:this.props.type, ...this.props }


        return (
            <>{mapComponentInterface.getMapComponent({...props})}</>
        )
    }
}


class SearchMapComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {

        }
    }


    render() {
        let mapComponentInterface = mapInterface;
        let app = this.props.app?this.props.app:mapComponentInterface.getApp();
        let componentList = mapComponentInterface?.getComponentList();
        let name = this.props.name;
        let attribute = this.props.attribute;
        let list = this.props.list?this.props.list: componentList.getList(name);

      

        return (<div style={{display:"flex", flexDirection:"row", }}>
        {this.props.imgLeft && <div style={{display:"flex", flexDirection:"column", justifyContent:"center", marginRight:"-41px"}}>
            <img src={this.props.imgLeft} style={{width:"32px", height:"32px", opacity:"71%"}} />
            </div>}
            <input autocomplete="off" name={attribute} placeholder={this.props.placeholder?this.props.placeholder:"Search..."} 
            style={this.props.style? this.props.style: {width:"120px"}} class={this.props.class? this.props.class: "flinntechInput"} onChange={(e)=>{
                
                const { name, value } = e.target
                
                if(this.props.onTextChange){
                    this.props.onTextChange(e);
                }
                else{
                    list = list.filter(obj=> obj.getJson()[attribute].includes(value));
                    app.dispatch({searchTags:[...list]})
                }

                if (this.props.callBackFunc){
                    this.props.callBackFunc(e, {list:list,attribute:attribute,name:name})
                }
            }}/>
            
            </div>
        )
    }
}

export { MapComponent, SearchMapComponent, mapInterface }

/**

 * TODO: TEST if I can create mulitple classes to add to the factory. and test adding different themes.
 * test everythingP
 * Test filtering
 * create other really cool map options.
 *  Create a new map type that allows for any type a list. (non getJson lists are fine. components that use them)
 * refactor the mapComponent so that we can use multiple and also make it so that we don't have to change two things all at once. also it needs to have style ability
 * Also refactor css so that things that are the same can be in one spot
 * Check for null pointers everywhere so people can put in whatever.
 * setup so that individual things can be setup with a different theme then the rest of the map *
 * set up searchMapComponent to be set up with themes *
 * make a component for zoom in zoom out and then use the type.
 * searchcomponent needs to be more refined to work with all sorts of searches
 * make it so that you can do dropdown search
 * make it so interactive map does not need pin type if they provide an object
 * The props do not update in the map component. Either we need to add an observer it can't be done that way. * This actually can't be done on the react side. So temporarily we will add the ability to pass in app as a prop.
 * 
 */