

class SelectByImageSmall {

  
    getMapTheme(){
       
        let style={
        containerStyle: { 
            default: {display:'flex', flexDirection:"column", backgroundColor:"#ffdead01",
            width:"270px",height:"fit-content", alignItems:"center", flexDirection:"center",
            flexWrap:"wrap", alignContent:"center", justifyItems:"center", 
          },
            row: {display:'flex', flexDirection:"row", },
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
            small:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
          },

          iContainerStyle: { 
            default: {display:'flex', flexDirection:"column", alignItems:"center", },
            row: {display:'flex', flexDirection:"row"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
          },

          sectionStyle:{
            default:  {display:'flex', flexDirection:"column", alignItems:"center", height:"fit-content",  marginBottom:"2px",
            border:"solid 1px #C1A71B55", alignContent:"center", justifyItems:"center",
              borderRadius:"2px", width:"100%", borderRightStyle:"",  borderLeftStyle:"",
            
            mixBlendMode:""
          },
            row:  {display:'flex', flexDirection:"row"},
            column: {display:'flex', flexDirection:"column"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
            
          },
          iSectionStyle:{
            default:  {display:'flex', flexDirection:"column",  alignContent:"center", justifyItems:"center", 
             },
            row:  {display:'flex', flexDirection:"row"},
            column: {display:'flex', flexDirection:"column", },
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
            
          },
//this should be the rest
          cellStyle:{
            default: {display:'flex', flexDirection:"row", alignItems:"center", 
             alignContent:"center", justifyItems:"center", 
            },
          },

          

          delstyle:{
            default: {color: "red", display:"flex", justifyContent:"center", alignItems:"center", },
          },

          linkStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", },
          },

          editstyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center",},
          },

          individualCell:{
            default: {display:"flex", width:"100%", alignContent:"center", },
            bold: {fontWeight:"700"},
          },
//THIS IS the Title I think
          innerCellStyle:{
            default: {display:"flex", cursor: "pointer", justifyContent:"center",alignItems:"center", marginBottom:"8px",
            width:"fit-content", alignContent:"center", fontSize:"2px"},
            boldFont: {fontWeight:"500"},
          }, 
          iCellStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", alignContent:"center",},
          },

          imgStyle:{
            default: {width:'60px', height:"60px", borderRadius:"50%",}
          },

        }
        return style
    }

   
}
export default new SelectByImageSmall();
