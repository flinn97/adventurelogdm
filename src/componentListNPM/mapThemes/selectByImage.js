


class SelectByImage {
    getMapTheme(){
        let style={
        containerStyle: { 
            default: {display:'flex', flexDirection:"column", marginTop:"10px", justifyContent:"left", width:"100%", padding:"1%",  alignItems:"center", justifyContent:"center",},
            row: {display:'flex', flexDirection:"row"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
          },

          iContainerStyle: { 
            default: {display:'flex', flexDirection:"column"},
            row: {display:'flex', flexDirection:"row"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
          },

          sectionStyle:{
            default:  {display:'flex', flexDirection:"row", marginBottom:"3vh",alignItems:"center" },
            row:  {display:'flex', flexDirection:"row"},
            column: {display:'flex', flexDirection:"column"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
            
          },
          iSectionStyle:{
            default:  {display:'flex', flexDirection:"row", },
            row:  {display:'flex', flexDirection:"row"},
            column: {display:'flex', flexDirection:"column"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
            
          },

          cellStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", width:"100%",},
          },

          

          delstyle:{
            default: {color: "red", display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px", },
          },

          linkStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px",},
          },

          editstyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px"},
          },

          individualCell:{
            default: {display:"flex", width:"100%", },
            bold: {fontWeight:"700"},
          },

          innerCellStyle:{
            default: {display:"flex", fontSize:"18px", width:window.innerWidth<600?"30vw":window.innerWidth<1000?"15vw":"9vw",},
            boldFont: {fontWeight:"700"},
          }, 
          iCellStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", },
          },

          imgStyle:{
            default: {width:'5vw', height:"5vw", borderRadius:"50%",}
          },

        }
        return style
    }

   
}
export default new SelectByImage();
