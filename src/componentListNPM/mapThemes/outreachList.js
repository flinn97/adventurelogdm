


class OutreachMap {
    getMapTheme(){
        let style={ 
        containerStyle: {
            default: {display:'flex', flexDirection:"row"},
            column: {display:'flex', flexDirection:"column"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
          },
          sectionStyle:{
            default:  {display:'flex', flexDirection:"column"},
            row: {display:'flex', flexDirection:"row"},
            wrapRow:{ display:'flex', flexDirection:"row", flexWrap:"wrap"},
            wrapColumn:{ display:'flex', flexDirection:"column", flexWrap:"wrap"},
            
          },
          imgStyle:{
            default: {width:'5vw', height:"5vw", borderRadius:"50%"}
          },

          cellStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", paddingRight:"5px", borderRight:"1px solid black", },
          },

          delstyle:{
            default: {color: "red", display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px"},
          },

          linkStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px"},
          },

          editstyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px"},
          },

          innerCellStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px",},
            
          }, 

          iCellStyle:{
            default: {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px"},
          },

        }
        return style
    }

   
}
export default new OutreachMap();
