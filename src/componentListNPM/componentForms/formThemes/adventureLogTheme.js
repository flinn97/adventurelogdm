import adventureLogStyles from "../../themes/adventureLogStyles";

class AdventureLogTheme {
  getFormsThemeDesktop(){
        let styles = adventureLogStyles.getStylesByScreenSize();
    let style={
          inputStyle:{padding:"4px 9px", color:styles.colors.colorBlack, borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px"},
          wrapperStyle:{display:"flex",flexDirection:"column", justifyItems:"space-between"},
          labelStyle:{},
          textBoxLabelStyle:{},
          textBoxWrapperStyle:{width:"200px", height:"100px", marginTop:"10px",},
          textBoxStyle:{width:"200px", height:"100px", fontSize:"14px", color:"black", border:"1px solid purple", borderRadius:"3px"},
          richEditorStyle:{padding:"4px 9px", color:styles.colors.colorBlack, borderRadius:"4px",background:styles.colors.colorWhite+"aa", borderWidth:"0px"},
          richEditorLabelStyle:{},
          richEditorWrapperStyle:{},
          switchLabelStyle:{},
          switchWrapperStyle:{},
          switchStyle:{backgroundColor:"#31333c"},
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
          formsWrapperStyle:{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"10px"},
          buttonTextStyle:{},
          runbuttonWrapperStyle:{ cursor:"pointer", marginTop:"5px"},
          delbuttonWrapperStyle:{},
          clearbuttonWrapperStyle:{}

        }
        

        
      return style
  }

  getFormsTheme(){
    return this.getFormsThemeDesktop();
  }

}
export default new AdventureLogTheme();


