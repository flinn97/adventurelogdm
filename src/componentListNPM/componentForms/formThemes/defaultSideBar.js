


class DefaultSideNav {
    getNavTheme(){
        let style={
        link: {
          default: {margin:"5px", textDecoration:"none"},
           
          },
          bar:{
            default: {display:'flex', flexDirection:"column", width:"300px", height:"100%", background:"white",  borderRight:"1px solid black"},
            
          },
          Spacing:{
            default:  {display:"flex",  alignItems:"center", marginLeft:"5px"},
    
          },
          logoutButton:{
            default: {width:'100px', height:"50px", borderRadius:"7"}
          },
        }
        return style
    }

   
}
export default new DefaultSideNav();
