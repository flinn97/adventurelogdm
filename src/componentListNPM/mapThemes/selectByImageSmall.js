

class SelectByImageSmall {

  
    getMapTheme(){
       
        let style={
        containerStyle: { 
            default: {display:'flex', flexDirection:"row", marginTop:"08px",
           width:"100%",height:"fit-content",  position:"", alignItems:"center",
            flexWrap:"wrap", justifyContent:"space-around",
          },
            row: {display:'flex', flexDirection:"row", },
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
            small:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
          },

          iContainerStyle: { 
            default: {display:'flex', flexDirection:"column", },
            row: {display:'flex', flexDirection:"row"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
          },

          sectionStyle:{
            default:  {display:'flex', flexDirection:"row", alignItems:"center", height:"fit-content", 
             position:"relative", marginTop:"9px", width:"100%", maxWidth:"fit-content"
          },
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
            default: {display:'flex', flexDirection:"row", justifyContent:"center", alignItems:"center",
            maxWidth:"fit-content", height:"fit-content",  color:"#fd5259"+"dd"},
          },

          

          delstyle:{
            default: {color: "red", display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px", fontSize:"10px", },
          },

          linkStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px",},
          },

          editstyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px"},
          },

          individualCell:{
            default: {display:"flex", width:"100%",},
            bold: {fontWeight:"700"},
          },

          innerCellStyle:{
            default: {display:"flex", fontSize:"", width:window.innerWidth<600?"30vw":window.innerWidth<1000?"15vw":"9vw",},
            boldFont: {fontWeight:"700"},
          }, 
          iCellStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", },
          },

          imgStyle:{
            default: {width:'60px', height:"60px", borderRadius:"50%",}
          },

        }
        return style
    }

   
}
export default new SelectByImageSmall();
