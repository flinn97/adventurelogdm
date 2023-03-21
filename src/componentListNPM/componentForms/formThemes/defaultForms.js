


class DefaultForms {
    getFormsThemeDesktop(){
        let style={
              inputStyle:{width:"120px", height: "40px", fontSize:"25px", color:"purple", border:"1px solid purple" },
              wrapperStyle:{marginLeft:"20px", width:"120px"},
              labelStyle:{},
              textBoxLabelStyle:{},
              textBoxWrapperStyle:{width:"200px", height:"200px"},
              textBoxStyle:{width:"200px", height:"200px", fontSize:"25px", color:"purple", border:"1px solid purple"},
              richEditorStyle:{width:"200px", height:"400px"},
              richEditorLabelStyle:{},
              richEditorWrapperStyle:{},
              switchLabelStyle:{},
              switchWrapperStyle:{},
              switchStyle:{backgroundColor:"#FF0000"},
              selectWrapperStyle:{},
              selectLabelStyle:{},
              selectStyle:{},
              rangeBar:{width:"200px", height:"10px", backgroundColor:"gray", position:"relative", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center"},
              rangeWrapperStyle:{},
              rangeLabelStyle:{},
              rangeThumb:{width:"10px", height:"20px", position:"absolute", background:"purple", borderRadius:"10px",cursor:"pointer"},
              radioLabelStyle: {},
              radioWrapperStyle:{},
              radioStyle:{},
              inputStart:{width:"120px", height: "40px", fontSize:"25px", color:"purple", border:"1px solid purple" },
              checkWrapperStyle:{},
              checkLabelStyle:{},
              tickStyle:{},
              formsWrapperStyle:{},
              buttonTextStyle:{},
              runbuttonWrapperStyle:{}

            }
            
  
            
          return style
      }

      getFormsTheme(){
        return this.getFormsThemeDesktop();
      }
   
}
export default new DefaultForms();
