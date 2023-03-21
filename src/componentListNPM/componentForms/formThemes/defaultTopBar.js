


class DefaultTopNav {
  getNavTheme(){
        let style={
        link: {
            default: {margin:"5px", textDecoration:"none"},
            
          },
          bar:{
            default: {display:'flex', flexDirection:"row", justifyContent:'center', background:"white", width:"100%", height:"100px", borderBottom:"1px solid black"},
            darkMode: {display:'flex', flexDirection:"row", justifyContent:'center', background:"black", width:"100%", height:"100px", borderBottom:"1px solid black"}
            
            
          },
          Spacing:{
            default:  {display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"5px"},
    
          },
          logoutButton:{
            default: {width:'100px', height:"50px", borderRadius:"7"}
          },
        }
        return style
    }
    

   
}
export default new DefaultTopNav();
