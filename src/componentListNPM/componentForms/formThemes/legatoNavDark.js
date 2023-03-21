import { redirect } from "react-router-dom";



class LegatoNavDark {
    getNavTheme(){
        let style={

          // Styling for Top Bar
          top: {
            navContainer: {top: "0", left: "0", flexDirection: "row", width: "100%", height: "65px", display:"flex", position: "absolute", backgroundColor:"#0c1520"},
            sectionsContainer: {display:"flex", flexDirection:"row", height:"100%", width:"100%"},

            logoStyle: {width:"86px", paddingTop:"4px"},
            logoWrapper: {display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center"},

            navItem: {textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0em", color:"#4B5563", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
            activeNavItem:{textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "700", color:"#E6F0FF", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
            linksWrapper: {display: "flex", flexDirection: "row", height: "auto", padding: "0"},
            singleLinkWrapper:{display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", margin: "0px 15px 0px 15px", padding: "7px 14px 7px 14px"},
            activeSingleLinkWrapper:{display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", backgroundColor: "#1a222c", margin: "0px 15px 0px 15px", padding: "7px 14px 7px 14px", borderRadius: "8px"},
            linkIcon:{width:"20px"},
            // notify:{backgroundColor: "#EBECED", color:"#4B5563", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"3px 10px 3px 10px"},
            notify:{backgroundColor:"#FF2E2E", color:"white", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"2px 9px 2px 9px"},
            
            profilePicWrapper: {display:"flex", flexDirection:"column", height:"100%", alignItems: "center", justifyContent: "center", paddingRight:"7px"},
            profilePicTheme: {fonts: {font1:"Inter"}, fontColors: {color1: "green"}, fontWeight: {bold: "800"}, fontSize: {fontSize1: "11px"}},
            profilePicInnerWrapper: {display:"flex", width:"147px", height:"42px"},
            profilePicImage:{width:"42px", borderRadius:"999px"},
            profilePicStyles:{
                innerWrapper: {flex:"1", height:"42px", display:"flex", flexDirection:"column", justifyContent: "center", marginLeft: "15px"},
                nameWrapper: {display:"flex", width:"100%", height:"14px", minWidth:"0", padding:"0", alignItems:"end"},
                name: {display:"flex", fontSize:"13px", fontWeight:"800", fontFamily:"Inter", color:"#E2E2E2"},
                arrowWrapper:{width:"10px", marginLeft:"4px"},
                arrow: {},
                logout: {color:"#656565", fontSize:"13px"}
            },

            sectionOne:{width: "215px"},
            sectionTwo:{display: "flex", alignItems: "center", padding: "0", marginRight:"auto"},
            sectionThree:{},
            sectionFour:{},
            sectionFive:{}
          },

          // Styling for Side Bar
          left: {
            navContainer: {top: "0", left: "0", flexDirection: "column", width: "210px", height: "100vh", display:"flex", position: "absolute", backgroundColor:"#0c1520"},
            sectionsContainer: {display:"flex", flexDirection:"column", height:"100%", width:"100%"},

            logoStyle: {width:"86px", paddingTop:"56px"},
            logoWrapper: {display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", paddingBottom: "20px"},
            
            outerLinkWrapper: {},
            navItem: {textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0em", color:"#919BA8", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
            activeNavItem:{textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "700", color:"#E6F0FF", paddingLeft: "11px", paddingRight: "15px", marginRight: "auto"},
            linksWrapper: {textDecoration:'none', display: "flex", flexDirection: "column"},
            singleLinkWrapper:{textDecoration:'none', display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", margin: "5px 15px 0px 15px", padding: "7px 14px 7px 14px"},
            activeSingleLinkWrapper:{textDecoration:'none', display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", backgroundColor: "#1a222c", margin: "5px 15px 0px 15px", padding: "7px 14px 7px 14px", borderRadius: "8px", outline: "1px solid #202733"},
            linkIcon:{textDecoration:'none', width:"20px"},
            // notify:{backgroundColor: "#EBECED", color:"#4B5563", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"3px 10px 3px 10px"},
            notify:{textDecoration:'none', backgroundColor:"#FF2E2E", color:"white", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"2px 9px 2px 9px"},
            
            profilePicWrapper: {display:"flex", flexDirection:"column", height:"100px", alignItems: "center", justifyContent: "center"},
            profilePicTheme: {fonts: {font1:"Inter"}, fontColors: {color1: "green"}, fontWeight: {bold: "800"}, fontSize: {fontSize1: "11px"}},
            profilePicInnerWrapper: {display:"flex", width:"147px", height:"42px"},
            profilePicImage:{width:"42px", borderRadius:"999px"},
            profilePicStyles:{
                innerWrapper: {flex:"1", height:"42px", display:"flex", flexDirection:"column", justifyContent: "center", marginLeft: "15px"},
                nameWrapper: {display:"flex", width:"100%", height:"14px", minWidth:"0", padding:"0", alignItems:"end"},
                name: {display:"flex", fontSize:"13px", fontWeight:"800", fontFamily:"Inter", color:"#E2E2E2"},
                arrowWrapper:{width:"10px", marginLeft:"4px"},
                arrow: {},
                logout: {color:"#656565", fontSize:"13px"}
            },

            sectionOne: {},
            sectionTwo:{marginBottom: "auto"},
            sectionThree:{},
            sectionFour:{},
            sectionFive:{}
            }
        }

        let phoneStyle={

            // Styling for Top Bar
            top: {
              navContainer: {top: "0", left: "0", flexDirection: "row", width: "100%", height: "65px", display:"flex", position: "absolute", backgroundColor:"#0c1520"},
              sectionsContainer: {display:"flex", flexDirection:"row", height:"100%", width:"100%"},
  
              logoStyle: {width:"86px", paddingTop:"4px"},
              logoWrapper: {display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center"},
  
              navItem: {textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0em", color:"#4B5563", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
              activeNavItem:{textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "700", color:"#E6F0FF", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
              linksWrapper: {display: "flex", flexDirection: "row", height: "auto", padding: "0"},
              singleLinkWrapper:{display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", margin: "0px 15px 0px 15px", padding: "7px 14px 7px 14px"},
              activeSingleLinkWrapper:{display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", backgroundColor: "#1a222c", margin: "0px 15px 0px 15px", padding: "7px 14px 7px 14px", borderRadius: "8px"},
              linkIcon:{width:"20px"},
              // notify:{backgroundColor: "#EBECED", color:"#4B5563", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"3px 10px 3px 10px"},
              notify:{backgroundColor:"#FF2E2E", color:"white", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"2px 9px 2px 9px"},
              
              profilePicWrapper: {display:"flex", flexDirection:"column", height:"100%", alignItems: "center", justifyContent: "center", paddingRight:"7px"},
              profilePicTheme: {fonts: {font1:"Inter"}, fontColors: {color1: "green"}, fontWeight: {bold: "800"}, fontSize: {fontSize1: "11px"}},
              profilePicInnerWrapper: {display:"flex", width:"147px", height:"42px"},
              profilePicImage:{width:"42px", borderRadius:"999px"},
              profilePicStyles:{
                  innerWrapper: {flex:"1", height:"42px", display:"flex", flexDirection:"column", justifyContent: "center", marginLeft: "15px"},
                  nameWrapper: {display:"flex", width:"100%", height:"14px", minWidth:"0", padding:"0", alignItems:"end"},
                  name: {display:"flex", fontSize:"13px", fontWeight:"800", fontFamily:"Inter", color:"#E2E2E2"},
                  arrowWrapper:{width:"10px", marginLeft:"4px"},
                  arrow: {},
                  logout: {color:"#656565", fontSize:"13px"}
              },
  
              sectionOne:{width: "215px"},
              sectionTwo:{display: "flex", alignItems: "center", padding: "0", marginRight:"auto"},
              sectionThree:{},
              sectionFour:{},
              sectionFive:{}
            },
  
            // Styling for Side Bar
            left: {
              navContainer: {top: "0", left: "0", flexDirection: "column", width: "210px", height: "100vh", display:"flex", position: "absolute", backgroundColor:"#0c1520"},
              sectionsContainer: {display:"flex", flexDirection:"column", height:"100%", width:"100%"},
  
              logoStyle: {width:"86px", paddingTop:"56px"},
              logoWrapper: {display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", paddingBottom: "20px"},
              
              outerLinkWrapper: {},
              navItem: {textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0em", color:"#919BA8", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
              activeNavItem:{textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "700", color:"#E6F0FF", paddingLeft: "11px", paddingRight: "15px", marginRight: "auto"},
              linksWrapper: {textDecoration:'none', display: "flex", flexDirection: "column"},
              singleLinkWrapper:{textDecoration:'none', display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", margin: "5px 15px 0px 15px", padding: "7px 14px 7px 14px"},
              activeSingleLinkWrapper:{textDecoration:'none', display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"left", backgroundColor: "#1a222c", margin: "5px 15px 0px 15px", padding: "7px 14px 7px 14px", borderRadius: "8px", outline: "1px solid #202733"},
              linkIcon:{textDecoration:'none', width:"20px"},
              // notify:{backgroundColor: "#EBECED", color:"#4B5563", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"3px 10px 3px 10px"},
              notify:{textDecoration:'none', backgroundColor:"#FF2E2E", color:"white", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"2px 9px 2px 9px"},
              
              profilePicWrapper: {display:"flex", flexDirection:"column", height:"100px", alignItems: "center", justifyContent: "center"},
              profilePicTheme: {fonts: {font1:"Inter"}, fontColors: {color1: "green"}, fontWeight: {bold: "800"}, fontSize: {fontSize1: "11px"}},
              profilePicInnerWrapper: {display:"flex", width:"147px", height:"42px"},
              profilePicImage:{width:"42px", borderRadius:"999px"},
              profilePicStyles:{
                  innerWrapper: {flex:"1", height:"42px", display:"flex", flexDirection:"column", justifyContent: "center", marginLeft: "15px"},
                  nameWrapper: {display:"flex", width:"100%", height:"14px", minWidth:"0", padding:"0", alignItems:"end"},
                  name: {display:"flex", fontSize:"13px", fontWeight:"800", fontFamily:"Inter", color:"#E2E2E2"},
                  arrowWrapper:{width:"10px", marginLeft:"4px"},
                  arrow: {},
                  logout: {color:"#656565", fontSize:"13px"}
              },
  
              sectionOne: {},
              sectionTwo:{marginBottom: "auto"},
              sectionThree:{},
              sectionFour:{},
              sectionFive:{}
              }
          }
          if(window.innerWidth < 600) {
            return phoneStyle
          } else {
            return style
          }
    }

   
}
export default new LegatoNavDark();


