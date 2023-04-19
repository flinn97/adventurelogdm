import { Component } from 'react';
import "../App.css"
import ParentFormComponent from '../componentForms/parentFormComponent';
import { Link } from 'react-router-dom';
import MapThemeFactory from '../mapThemes/mapThemeFactory';


export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.cellMap =this.cellMap.bind(this);
    this.cellMap2 = this.cellMap2.bind(this);

    this.state = {
      f: new MapThemeFactory()


    }
  }
  cellMap2(item, index, arr) {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let f = this.state.f;
    let styles =  f.getMapThemeFactory().default;
    if(this.props.theme){
      styles= f.getMapThemeFactory()[this.props.theme]
    }
    let inputTypes=["text", "textArea", "richEditor"];
    let mapThemes=["default", "keep", "mySpawn", "calendar", "defaultBorder", "defaultTable", "defaultAlternate", ];

    return <div style={this.props.iSectionStyle? //if
    this.props.iSectionStyle: //then
  this.props.iSectionTheme? //else if
    mapThemes.includes(this.props.iSectionTheme)?//if
     f.getMapThemeFactory()[this.props.iSectionTheme]?.iSectionStyle?.default: //then
     styles?.iSectionStyle[this.props.iSectionTheme]://otherwise
  styles?.iSectionStyle?.default//otherwise
 } key={index}> 
    {arr.map((c, index)=><div style={
      this.props.iCellStyle? //if
      {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...this.props.iCellStyle}: //then
    this.props.iCellTheme? //else if
      mapThemes.includes(this.props.iCellTheme)?//if
       {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...f.getMapThemeFactory()[this.props.iCellTheme]?.iCellStyle?.default}: //then
       {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...styles?.iCellStyle[this.props.iCellTheme]}://otherwise
    {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...styles?.iCellStyle?.default}//otherwise
      }> 
      
      
      {/* IS CELL JUST AN ATTRIBUTE */}
      {((Object.prototype.toString.call(c) === "[object String]" || c.json !== undefined) && c!=="delete" && c!=="edit") && (<div style={{...c.style}} 
      onClick={this.props.innerFunctions?.cells.includes(index)&&(
      ()=>{
        this.props.innerFunctions.functions[this.props.innerFunctions?.cells.indexOf(index)](item);
      })
      }>
         {this.props.innerlinkOptions?.cells?.includes(index)?(
          <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
      <div style={{color:c.style?.color, fontSize:c.style?.fontSize, }}>{item.getJson()[c.json?c.json:c]}</div></Link>
      ):(
      <div style={{color:c.style?.color, fontSize:c.style?.fontSize, }}>{item.getJson()[c.json?c.json:c]}</div>)}</div>
      )}

    {/* IS CELL PLAIN TEXT */}
        
    {( c.txt !== undefined) && (<div style={{...c.style}} 
          onClick={this.props.innerFunctions?.cells.includes(index)&&(
          ()=>{
            this.props.innerFunctions.functions[this.props.innerFunctions?.cells.indexOf(index)](item);
          })
          }>
            {this.props.innerlinkOptions?.cells?.includes(index)?(
              <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
          <div style={{color:c.style?.color, fontSize:c.style?.fontSize, }}>{c.txt}</div></Link>
          ):(
          <div style={{color:c.style?.color, fontSize:c.style?.fontSize, }}>{c.txt}</div>)}</div>
          )}

  

      {/* IS CELL A SPECIAL WORD */}

      {(c==="delete") &&(
      <div style={
          this.props.delOptions?.style?
            {cursor:"pointer", ...this.props.delOptions?.style }:
          this.props.delOptions?.theme?
          {cursor:"pointer", ...f.getMapThemeFactory()[this.props.delOptions?.theme].delstyle }: 
          {cursor:"pointer", ...styles.delstyle }} onClick={this.props.delOptions?.func? this.props.delOptions.func: ()=>{
            
            componentList.getOperationsFactory().cleanPrepareRun({del:item})}}>
              
       {this.props.linkOptions?.cells?.includes(index)?(
       <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
        {this.props.delOptions?.picURL?(<img style={{width:"20px", height:"20px"}} src={this.props.delOptions.picURL}/>):(<>{this.props.delOptions?.name? this.props.delOptions.name:c}</>)}
       </Link>):(
         <>{this.props.delOptions?.picURL?(<img style={{width:"20px", height:"20px"}}  src={this.props.delOptions.picURL}/>):(<>{this.props.delOptions?.name? this.props.delOptions.name:c}</>)}</>
        )}
        
        </div>
        )}

        {c==="edit"&&(
      <div style={
        this.props.editOptions?.style?
          {cursor:"pointer", ...this.props.editOptions?.style }:
        this.props.editOptions?.theme?
        {cursor:"pointer", ...f.getMapThemeFactory()[this.props.editOptions?.theme].editstyle }: 
        {cursor:"pointer", ...styles.editstyle }} onClick={this.props.editOptions?.func&& this.props.editOptions.func}>
       {this.props.innerlinkOptions?.cells?.includes(index)?(
       <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
        {this.props.editOptions?.picURL?(<img style={{width:"20px", height:"20px"}}  src={this.props.editOptions.picURL}/>):(<>{this.props.editOptions?.name? this.props.editOptions.name:c}</>)}
       </Link>):(
         <>{this.props.editOptions?.picURL?(<img  style={{width:"20px", height:"20px"}}  src={this.props.editOptions.picURL}/>):(<>{this.props.editOptions?.name? this.props.editOptions.name:c}</>)}</>
        )}
        
        </div>
        )}

      {/* IS CELL AN IMG */}
      {c.img && (<div style={{...c.style}} onClick={this.props.innerFunctions?.cells.includes(index)&&(
      ()=>{
        this.props.innerFunctions.functions[this.props.innerFunctions?.cells.indexOf(index)](item);
      })}>
        {this.props.innerlinkOptions?.cells?.includes(index)?(
          <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
    
      <img style={c.imgStyle? c.imgStyle: 
        this.props.imgStyle? this.props.imgStyle: 
        this.props.imgTheme? mapThemes.includes(this.props.imgTheme)?
        f.getMapThemeFactory()[this.props.imgTheme]?.imgStyle?.default:
        styles.imgStyle[this.props.imgTheme]:
        styles.imgStyle.default} /></Link>):(<img style={c.imgStyle? c.imgStyle: 
          this.props.imgStyle? this.props.imgStyle: 
          this.props.imgTheme? mapThemes.includes(this.props.imgTheme)?
          f.getMapThemeFactory()[this.props.imgTheme]?.imgStyle?.default:
          styles.imgStyle[this.props.imgTheme]:
          styles.imgStyle.default} src={item.getJson()[c.img]} />)} </div>
      )}


      {/* IS CELL A CUSTOM REACT CLASS */}
      {c.custom && (<div onClick={this.props.innerFunctions?.cells.includes(index)&&(
      ()=>{
        this.props.innerFunctions.functions[this.props.innerFunctions?.cells.indexOf(index)](item);
      })}>
       {this.props.innerlinkOptions?.cells?.includes(index)?(
        <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
  <c.custom props={{...c.props}} app={{...c.props.app}} obj={item} style={{...c.style}}/></Link>):(<c.custom app={{...c.props.app}} props={{...c.props}} obj={item} style={{...c.style}}/>)}</div>)}

      {/* IS CELL AN INPUTTYPE */}
      {inputTypes.includes(Object.keys(c)[0]) &&(
      <div style={{...c.style}} onClick={this.props.innerFunctions?.cells.includes(index)&&(
        ()=>{
          this.props.innerFunctions.functions[this.props.innerFunctions?.cells.indexOf(index)](item);
        })}>
      {this.props.innerlinkOptions?.cells?.includes(index)?(
        <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
  <ParentFormComponent type={c.inputType} obj = {item} name={c.name}
    rows={c.rows}
    theme={c.theme}
    updateOnClickOutside= {c.updateOnClickOutside}
    func={c.func}
    cols={c.cols}
    emitClickedOutside={c.emitClickedOutside}
    id={c.id}
    
    inputStyle={c.inputStyle}
    spellCheck={c.spellCheck}
    label={c.label}
    prepareOnClick={c.prepareOnClick}
    labelStyle={c.labelStyle}
    wrapperStyle={c.wrapperStyle}
    class = {c.class} 
    placeholder={c.placeholder} 
    cleanPrepareRun={c.cleanPrepareRun}
    prepareRun={c.prepareRun}
    sendUpdate={c.sendUpdate}
    min={c.min}
    max={c.max}
    autoComplete={c.autoComplete}
    checked={c.checked}
    minLength={c.minLength}
    maxLength={c.maxLength}
    
    required={c.required}
    disabled={c.disabled}
    requiredMessage={c.requiredMessage}
    defaultValue={c.defaultValue}
        app={this.props.app}
        labelClass={c.labelClass}
        onClick={c.prepareOnClickFunc}
        wrapperClass={c.wrapperClass}
        size={c.size}
        selectOptions={c.selectOptions}
        textOptions= {c.textOptions}
        update={c.update}
        handleChangeWithoutEvent={c.handleChangeWithoutEvent}
           
            tickClass={c.tickClass}/></Link>):(<ParentFormComponent type={c.inputType} obj = {item} name={c.name}
              rows={c.rows}
              theme={c.theme}
              updateOnClickOutside= {c.updateOnClickOutside}
              func={c.func}
              cols={c.cols}
              emitClickedOutside={c.emitClickedOutside}
              id={c.id}
              sendUpdate={c.sendUpdate}
              inputStyle={c.inputStyle}
              spellCheck={c.spellCheck}
              label={c.label}
              prepareOnClick={c.prepareOnClick}
              labelStyle={c.labelStyle}
              wrapperStyle={c.wrapperStyle}
              class = {c.class} 
              placeholder={c.placeholder} 
              cleanPrepareRun={c.cleanPrepareRun}
              prepareRun={c.prepareRun}
          
              min={c.min}
              max={c.max}
              autoComplete={c.autoComplete}
              checked={c.checked}
              minLength={c.minLength}
              maxLength={c.maxLength}
              required={c.required}
              disabled={c.disabled}
              requiredMessage={c.requiredMessage}
              defaultValue={c.defaultValue}
                  app={this.props.app}
                  labelClass={c.labelClass}
                  onClick={c.prepareOnClickFunc}
                  wrapperClass={c.wrapperClass}
                  size={c.size}
                  selectOptions={c.selectOptions}
                  textOptions= {c.textOptions}
                  update={c.update}
                  handleChangeWithoutEvent={c.handleChangeWithoutEvent}
                     
                      tickClass={c.tickClass}/>)}
  </div>)}
  {/* IS CELL A LIST OF CELLS */}
  {Array.isArray(c) &&(<div style={{...this.props.innerCell?.style}} onClick={this.props.innerFunctions?.cells.includes(index)&&(
      ()=>{
        this.props.innerFunctions.functions[this.props.innerFunctions?.cells.indexOf(index)](item);
      })}>
          <> 
          {this.props.innerlinkOptions?.cells?.includes(index)?(
            <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
      
          
            {this.cellMap2(item, index, c)}
            
        
        </Link>):(<div>
            {this.cellMap2(item, index, c)}
            
        </div>)}
        </>
        </div>)}
  
    </div>)}
    </div>;}




  cellMap(item, index) {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let f = this.state.f;
    let styles =  f.getMapThemeFactory().default;
    if(this.props.theme){
      styles= f.getMapThemeFactory()[this.props.theme]
    }
    let inputTypes=["text", "textArea", "richEditor", "checkbox", ];
    let mapThemes=["default", "keep", "mySpawn", "calendar", "defaultBorder", "defaultTable", "defaultAlternate", ];
    let html = <>
    
      {this.props.cells.map((c, index)=><div style={this.props.cellStyle? //if
             this.props.cellStyle: //then
           this.props.cellTheme? //else if
             mapThemes.includes(this.props.cellTheme)?//if
              f.getMapThemeFactory()[this.props.cellTheme]?.cellStyle?.default: //then
              styles.cellStyle[this.props.cellTheme]://otherwise
           styles.cellStyle.default//otherwise
      }> 
        
        
        {/* IS CELL JUST AN ATTRIBUTE */}
        {((Object.prototype.toString.call(c) === "[object String]" ||c.json) && c!=="delete" && c!=="edit") && (<div style={c.style? //if
        c.style://then
        this.props.innerCellStyle?//else if
             this.props.innerCellStyle: //then
           this.props.innerCellTheme? //else if
             mapThemes.includes(this.props.innerCellTheme)?//if
              f.getMapThemeFactory()[this.props.innerCellTheme]?.innerCellStyle?.default: //then
              styles.innerCellStyle[this.props.innerCellTheme]://otherwise
           styles.innerCellStyle.default//otherwise
      }
          onClick={this.props.functions?.cells.includes(index)&&(
      ()=>{
        this.props.functions.functions.length===1?this.props.functions?.functions[0](item):this.props.functions.functions[this.props.functions?.cells.indexOf(index)](item);
      })
          }>
           {this.props.linkOptions?.cells?.includes(index)?(
            <Link className="mapLink" style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={
              this.props.linkOptions?.path[this.props.linkOptions.cells.indexOf(index)]? 
              this.props.linkOptions.path[this.props.linkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.linkOptions.path[this.props.linkOptions.path.length-1]+ item.getJson()._id}
              >
        <div style={{color:c.style?.color, fontSize:c.style?.fontSize}}>{item.getJson()[c]}</div></Link>):(<div style={{color:c.style?.color, fontSize:c.style?.fontSize, cursor: this.props.functions?.cells.includes(index)&&"pointer"}}>{item.getJson()[c]}</div>)}</div>
        )}

   {/* IS CELL PLAIN TEXT */}
        
    {( c.txt !== undefined) && (<div style={{...c.style}} 
          onClick={this.props.innerFunctions?.cells.includes(index)&&(
          ()=>{
            this.props.innerFunctions.functions[this.props.innerFunctions?.cells.indexOf(index)](item);
          })
          }>
            {this.props.innerlinkOptions?.cells?.includes(index)?(
              <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.innerlinkOptions?.path[this.props.innerlinkOptions.cells.indexOf(index)]? this.props.innerlinkOptions.path[this.props.innerlinkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.innerlinkOptions.path[this.props.innerlinkOptions.path.length-1]+ item.getJson()._id}>
          <div style={{color:c.style?.color, fontSize:c.style?.fontSize, }}>{c.txt}</div></Link>
          ):(
          <div style={{color:c.style?.color, fontSize:c.style?.fontSize, }}>{c.txt}</div>)}</div>
          )}

  
        {/* IS CELL A SPECIAL WORD */}
        {(c==="delete") &&(
        <div style={
          this.props.delOptions?.style?
            {cursor:"pointer", ...this.props.delOptions?.style }:
          this.props.delOptions?.theme?
          {cursor:"pointer", ...f.getMapThemeFactory()[this.props.delOptions?.theme].delstyle }: 
          {cursor:"pointer", ...styles.delstyle }} onClick={this.props.delOptions?.func? this.props.delOptions.func: ()=>{
            debugger
            componentList.getOperationsFactory().cleanPrepareRun({del:item})}}>
         {this.props.linkOptions?.cells?.includes(index)?(
         <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.linkOptions?.path[this.props.linkOptions.cells.indexOf(index)]? this.props.linkOptions.path[this.props.linkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.linkOptions.path[this.props.linkOptions.path.length-1]+ item.getJson()._id}>
          {this.props.delOptions?.picURL?(<img style={{width:"20px", height:"20px"}} src={this.props.delOptions.picURL}/>):(<>{this.props.delOptions?.name? this.props.delOptions.name:c}</>)}
         </Link>):(
           <>{this.props.delOptions?.picURL?(<img style={{width:"20px", height:"20px"}}  src={this.props.delOptions.picURL}/>):(<>{this.props.delOptions?.name? this.props.delOptions.name:c}</>)}</>
          )}
          
          </div>
          )}
  
          {c==="edit"&&(
        <div style={
          this.props.editOptions?.style?
            {cursor:"pointer", ...this.props.editOptions?.style }:
          this.props.editOptions?.theme?
          {cursor:"pointer", ...f.getMapThemeFactory()[this.props.editOptions?.theme].editstyle }: 
          {cursor:"pointer", ...styles.editstyle }}
        onClick={this.props.editOptions?.func&& this.props.editOptions.func}>
         {this.props.linkOptions?.cells?.includes(index)?(
         <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.linkOptions?.path[this.props.linkOptions.cells.indexOf(index)]? this.props.linkOptions.path[this.props.linkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.linkOptions.path[this.props.linkOptions.path.length-1]+ item.getJson()._id}>
          {this.props.editOptions?.picURL?(<img style={{width:"20px", height:"20px"}}  src={this.props.editOptions.picURL}/>):(<>{this.props.editOptions?.name? this.props.editOptions.name:c}</>)}
         </Link>):(
           <>{this.props.editOptions?.picURL?(<img  style={{width:"20px", height:"20px"}}  src={this.props.editOptions.picURL}/>):(<>{this.props.editOptions?.name? this.props.editOptions.name:c}</>)}</>
          )}
          
          </div>
          )}
  
        {/* IS CELL AN IMG */}
        {c.img && (<div style={c.style? //if
        c.style://then
        this.props.innerCellStyle?//else if
             this.props.innerCellStyle: //then
           this.props.innerCellTheme? //else if
             mapThemes.includes(this.props.innerCellTheme)?//if
              f.getMapThemeFactory()[this.props.innerCellTheme]?.cellStyle?.default: //then
              styles.innerCellStyle[this.props.innerCellTheme]://otherwise
           styles.innerCellStyle.default//otherwise
      } onClick={this.props.functions?.cells.includes(index)&&(
      ()=>{
        this.props.functions.functions[this.props.functions?.cells.indexOf(index)](item);
      })}>
          {this.props.linkOptions?.cells?.includes(index)?(
            <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.linkOptions?.path[this.props.linkOptions?.cells?.indexOf(index)]? this.props?.linkOptions?.path[this.props.linkOptions?.cells?.indexOf(index)]+ item.getJson()._id: this.props.linkOptions?.path[this.props.linkOptions?.path?.length-1]+ item.getJson()?._id}>
      
        <img style={c.imgStyle? c.imgStyle: 
        this.props.imgStyle? this.props.imgStyle: 
        this.props.imgTheme? mapThemes.includes(this.props.imgTheme)?
        f.getMapThemeFactory()[this.props.imgTheme]?.imgStyle?.default:
        styles.imgStyle[this.props.imgTheme]:
        styles.imgStyle.default} src={item.getJson()[c.img]} /></Link>):(<img style={
          c.imgStyle? {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...c.imgStyle}: 
          this.props.imgStyle? {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...this.props.imgStyle}: 
          this.props.imgTheme? mapThemes.includes(this.props.imgTheme)?
          {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...f.getMapThemeFactory()[this.props.imgTheme]?.imgStyle?.default}:
          {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...styles.imgStyle[this.props.imgTheme]}:
          {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...styles.imgStyle.default}} src={item.getJson()[c.img]} />)} </div>
        )}
  
  
        {/* IS CELL A CUSTOM REACT CLASS */}
        {c.custom && (<div onClick={this.props.functions?.cells.includes(index)&&(
      ()=>{
        this.props.functions.functions[this.props.functions?.cells.indexOf(index)](item);
      })}>
         {this.props.linkOptions?.cells?.includes(index)?(
          <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.linkOptions?.path[this.props.linkOptions.cells.indexOf(index)]? this.props.linkOptions.path[this.props.linkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.linkOptions.path[this.props.linkOptions.path.length-1]+ item.getJson()._id}>
    <c.custom props={{...c.props}} app={{...c.props.app}} obj={item} style={c.style? //if
        c.style://then
        this.props.innerCellStyle?//else if
             this.props.innerCellStyle: //then
           this.props.innerCellTheme? //else if
             mapThemes.includes(this.props.innerCellTheme)?//if
              f.getMapThemeFactory()[this.props.innerCellTheme]?.innerCellStyle?.default: //then
              styles.innerCellStyle[this.props.innerCellTheme]://otherwise
           styles.innerCellStyle.default//otherwise
      }/></Link>):(<c.custom props={{...c.props, }} app={{...c.props.app}} obj={item} style={c.style? //if
      c.style://then
      this.props.innerCellStyle?//else if
           this.props.innerCellStyle: //then
         this.props.innerCellTheme? //else if
           mapThemes.includes(this.props.innerCellTheme)?//if
            f.getMapThemeFactory()[this.props.innerCellTheme]?.innerCellStyle?.default: //then
            styles.innerCellStyle[this.props.innerCellTheme]://otherwise
         styles.innerCellStyle.default//otherwise
    }/>)}</div>)}
  
        {/* IS CELL AN INPUTTYPE */}
        {c.inputType &&(
        <div style={c.style? //if
        c.style://then
        this.props.innerCellStyle?//else if
             this.props.innerCellStyle: //then
           this.props.innerCellTheme? //else if
             mapThemes.includes(this.props.innerCellTheme)?//if
              f.getMapThemeFactory()[this.props.innerCellTheme]?.innerCellStyle?.default: //then
              styles.innerCellStyle[this.props.innerCellTheme]://otherwise
           styles.innerCellStyle.default//otherwise
      } onClick={this.props.functions?.cells.includes(index)&&(
          ()=>{
            this.props.functions.functions[this.props.functions?.cells.indexOf(index)](item);
          })}> 
        {this.props.linkOptions?.cells?.includes(index)?(
          <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.linkOptions?.path[this.props.linkOptions.cells.indexOf(index)]? this.props.linkOptions.path[this.props.linkOptions.cells.indexOf(index)]+ item.getJson()._id: this.props.linkOptions.path[this.props.linkOptions.path.length-1]+ item.getJson()._id}>
    <ParentFormComponent type={c.inputType} obj = {item} name={c.name}
    rows={c.rows}
    theme={c.theme}
    sendUpdate={c.sendUpdate}
    updateOnClickOutside= {c.updateOnClickOutside}
    func={c.func}
    cols={c.cols}
    emitClickedOutside={c.emitClickedOutside}
    id={c.id}
    cleanPrepareRun={c.cleanPrepareRun}
    prepareRun={c.prepareRun}

  
     
    inputStyle={c.inputStyle}
    spellCheck={c.spellCheck}
    label={c.label}
    prepareOnClick={c.prepareOnClick}
    labelStyle={c.labelStyle}
    wrapperStyle={c.wrapperStyle}
    class = {c.class} 
    placeholder={c.placeholder} 
        
    min={c.min}
    max={c.max}
    autoComplete={c.autoComplete}
    checked={c.checked}
    minLength={c.minLength}
    maxLength={c.maxLength}
    required={c.required}
    disabled={c.disabled}
    requiredMessage={c.requiredMessage}
    defaultValue={c.defaultValue}
        app={this.props.app}
        labelClass={c.labelClass}
        onClick={c.prepareOnClickFunc}
        wrapperClass={c.wrapperClass}
        size={c.size}
        selectOptions={c.selectOptions}
        textOptions= {c.textOptions}
        update={c.update}
        handleChangeWithoutEvent={c.handleChangeWithoutEvent}
           
            tickClass={c.tickClass}/></Link>):(
    <ParentFormComponent type={c.inputType} obj = {item} name={c.name}
    rows={c.rows}
    theme={c.theme}
    updateOnClickOutside= {c.updateOnClickOutside}
    func={c.func}
    cols={c.cols}
    emitClickedOutside={c.emitClickedOutside}
    id={c.id}
    cleanPrepareRun={c.cleanPrepareRun}
    prepareRun={c.prepareRun}
    sendUpdate={c.sendUpdate}
    inputStyle={c.inputStyle}
    spellCheck={c.spellCheck}
    label={c.label}
    prepareOnClick={c.prepareOnClick}
    labelStyle={c.labelStyle}
    wrapperStyle={c.wrapperStyle}
    class = {c.class} 
    placeholder={c.placeholder} 
        
    min={c.min}
    max={c.max}
    autoComplete={c.autoComplete}
    checked={c.checked}
    minLength={c.minLength}
    maxLength={c.maxLength}
    required={c.required}
    disabled={c.disabled}
    requiredMessage={c.requiredMessage}
    defaultValue={c.defaultValue}
        app={this.props.app}
        labelClass={c.labelClass}
        onClick={c.prepareOnClickFunc}
        wrapperClass={c.wrapperClass}
        size={c.size}
        selectOptions={c.selectOptions}
        textOptions= {c.textOptions}
        update={c.update}
        handleChangeWithoutEvent={c.handleChangeWithoutEvent}
           
            tickClass={c.tickClass}
      />
    )}
    </div>)}
        {/* IS CELL A LIST OF CELLS */}
        {Array.isArray(c) &&(<div style={
          this.props.innerArrOptions?.style? //if
        {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...this.props.innerArrOptions?.style}://then
        this.props.innerCellStyle?//else if
             {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...this.props.innerCellStyle}: //then
           this.props.innerCellTheme? //else if
             mapThemes.includes(this.props.innerCellTheme)?//if
              {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...f.getMapThemeFactory()[this.props.innerCellTheme].innerCellStyle.default}: //then
              {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...styles.innerCellStyle[this.props.innerCellTheme]}://otherwise
           {cursor: this.props.functions?.cells.includes(index)&&"pointer", ...styles.innerCellStyle.default}//otherwise
      }
        onClick={this.props.functions?.cells.includes(index)&&(
      ()=>{
        this.props.functions.functions[this.props.functions?.cells.indexOf(index)](item);
      })}>
          <> 
          {this.props.linkOptions?.cells?.includes(index)?(
            <Link style={this.props.linkOptions?.styles&&this.props.linkOptions?.styles[index]? this.props.linkOptions?.styles[index]: state.linkStyleDefault} to={this.props.linkOptions?.path[this.props.linkOptions.cells.indexOf(index)]? this.props.linkOptions.path[this.props.linkOptions.cells.indexOf(index)]: this.props.linkOptions.path[this.props.linkOptions.path.length-1]+ item.getJson()._id}>
      
          
            {this.cellMap2(item, index, c)}
            
        
        </Link>):(<div>
            {this.cellMap2(item, index, c)}
            
        </div>)}
        </>
        </div>)}
      </div>)}
      </>;

    return html}




  render() {
    
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let f = this.state.f;
    let styles =  f.getMapThemeFactory().default;
    if(this.props.theme){
      styles= f.getMapThemeFactory()[this.props.theme]
    }
    let inputTypes=["text", "textArea", "richEditor"];
    let mapThemes=["default", "keep", "mySpawn", "calendar", "defaultBorder", "defaultTable", "defaultAlternate", ];
    

    let types={
      //InnerMap type
      innerMap:
      <div> 
      </div>,

      //Default Type
      default:<div style={
        this.props.containerStyle? //if
          this.props.containerStyle: //then
        this.props.containerTheme? //else if
          mapThemes.includes(this.props.containerStyle)? //if
           f.getMapThemeFactory()[this.props.containerTheme]?.containerStyle?.default: //then
           styles.containerStyle[this.props.containerTheme]://otherwise
        styles.containerStyle?.default//otherwise
        }>
      {componentList.getList(this.props.name).map((item, index)=>
             <div style={this.props.sectionStyle? //if
             this.props.sectionStyle: //then
           this.props.sectionTheme? //else if
             mapThemes.includes(this.props.sectionTheme)?//if
              f.getMapThemeFactory()[this.props.sectionTheme]?.sectionStyle?.default: //then
              styles.sectionStyle[this.props.sectionTheme]://otherwise
           styles.sectionStyle.default//otherwise
      } key={index}> {this.cellMap(item, index)}</div>

      )}
      </div>,

      // filiterd MAP
      filteredMap: <div style={ this.props.containerStyle? //if
      this.props.containerStyle: //then
    this.props.containerTheme? //else if
      mapThemes.includes(this.props.containerStyle)? //if
       f.getMapThemeFactory()[this.props.containerTheme]?.containerStyle?.default: //then
       styles.containerStyle[this.props.containerTheme]://otherwise
    styles.containerStyle.default//otherwise
  }>
        
      {componentList.getList(this.props.name, this.props.filter?.search, this.props.filter?.attribute).map((item, index)=>
       <div style={this.props.sectionStyle? //if
       this.props.sectionStyle: //then
     this.props.sectionTheme? //else if
       mapThemes.includes(this.props.sectionTheme)?//if
        f.getMapThemeFactory()[this.props.sectionTheme]?.sectionStyle?.default: //then
        styles.sectionStyle[this.props.sectionTheme]://otherwise
     styles.sectionStyle.default//otherwise
    } key={index}> {this.cellMap(item, index)}</div>
      )}
      </div>,
    }

    return (<div style={{width:"100%", height:"100%"}}>
      {/* {this.props.type} */}
      
      {types[this.props.type?this.props.type:this.props.filter?"filteredMap":"default"]}
      </div>
      
      // <div style={{width:"100vw", paddingTop: "10px"}}><>
      //     <ParentFormComponent style={{height:"200px", border:"1px solid black"}} type="richEditor" name="html" app={app} prepareOnClick={{operation: "cleanJsonPrepare", operate:"addadventureLog"}} obj={{owner: "123", type:"adventureLog"}} />
      //     <RunButton app={app} />
      //     <div >{list?.map((log, index)=>
          
      //     <div ><div onClick={()=>{
      //       this.setState({
      //         [index+"edit"]:!this.state[index+"edit"]})
      //         dispatch({operate: "update", operation: "cleanPrepare", obj: log})
      //       }
            
          
      //     }>edit</div> <DelButton obj={log}/> {this.state[index+ "edit"]?(  <>       
      //       <ParentFormComponent style={{height:"200px", border:"1px solid black"}} type="richEditor" name="html" app={app}  obj={log} /><RunButton onChange={()=>{this.setState({[index+"edit"]:false})}} app={app} /></> 
      //       ):( <div dangerouslySetInnerHTML={{__html: log.getJson().html}}  />)}</div>
      //     )}</div>
      // </div>
    )
  }
}

