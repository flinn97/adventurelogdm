import { getQueriesForElement } from "@testing-library/react";
import { redirect } from "react-router-dom";



class MinimalNav {
    getNavTheme(){
        let style={

          // Styling for Top Bar
          top: {
            navContainer: {top: "0", left: "0", flexDirection: "row", width: "100%", height: "71px", display:"flex", position: "absolute", backgroundColor:"#FEFEFE"},
            sectionsContainer: {display:"flex", flexDirection:"row", height:"100%", width:"100%"},

            logoStyle: {width:"15px", paddingTop:"4px"},
            logoWrapper: {display:"flex", width:"15px", height:"100%", alignItems:"center", justifyContent:"center", paddingLeft:"40px"},

            navItem: {textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0em", color:"#4B5563", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
            activeNavItem:{textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "700", color:"#4B5563", paddingLeft: "11px", paddingRight: "15px", marginRight: "auto"},
            linksWrapper: {display: "flex", flexDirection: "row"},
            singleLinkWrapper:{position:"relative", display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"center", margin: "15px 0px 15px 10px", padding: "7px 7px 7px 7px"},
            activeSingleLinkWrapper:{position:"relative", display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"center", backgroundColor: "#F4F5F7", margin: "15px 0px 15px 10px", padding: "7px 7px 7px 7px", borderRadius: "8px"},
            linkIcon:{width:"25px"},
            // notify:{backgroundColor: "#EBECED", color:"#4B5563", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"3px 10px 3px 10px"},
            notify:{position: "absolute", top: "5px", right:"5px", width: "10px", height: "10px", backgroundColor:"#FF2E2E", marginRight:"0px", borderRadius:"999px"},
            
            profilePicWrapper: {display:"flex", flexDirection:"column", height:"100%", alignItems: "center", justifyContent: "center"},
            profilePicTheme: {fonts: {font1:"Inter"}, fontColors: {color1: "green"}, fontWeight: {bold: "800"}, fontSize: {fontSize1: "11px"}},
            profilePicInnerWrapper: {display:"flex", width:"100%", height:"42px"},
            profilePicImage:{width:"42px", borderRadius:"999px", margin: "auto"},

            sectionOne: {width: "100px"},
            sectionTwo:{display: "flex", alignItems: "center", padding: "0", margin:"auto"},
            sectionThree:{width: "100px"},
            sectionFour:{},
            sectionFive:{}
          },

          // Styling for Side Bar
          left: {
            navContainer: {top: "0", left: "0", flexDirection: "column", width: "71px", height: "100vh", display:"flex", position: "absolute", backgroundColor:"#FEFEFE"},
            sectionsContainer: {display:"flex", flexDirection:"column", height:"100%", width:"100%"},

            logoStyle: {width:"15px", paddingTop:"30px"},
            logoWrapper: {display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", paddingBottom: "20px"},

            navItem: {textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0em", color:"#4B5563", paddingLeft: "11px", paddingRight: "10px", marginRight: "auto"},
            activeNavItem:{textDecoration:'none', fontSize: "14px", fontFamily: "'Inter', sans-serif", fontWeight: "700", color:"#4B5563", paddingLeft: "11px", paddingRight: "15px", marginRight: "auto"},
            linksWrapper: {display: "flex", flexDirection: "column"},
            singleLinkWrapper:{position:"relative", display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"center", margin: "5px 0px 0px 0px", margin: "5px 15px 0px 15px", padding: "7px 0px 7px 0px"},
            activeSingleLinkWrapper:{position:"relative", display:'flex', flexDirection:'row', alignItems:"center", justifyContent:"center", backgroundColor: "#F4F5F7", margin: "5px 15px 0px 15px", padding: "7px 0px 7px 0px", borderRadius: "8px"},
            linkIcon:{width:"25px"},
            // notify:{backgroundColor: "#EBECED", color:"#4B5563", fontSize: "12px", fontWeight: "600", marginRight:"0px", borderRadius:"10px", padding:"3px 10px 3px 10px"},
            notify:{position: "absolute", top: "5px", right:"5px", width: "10px", height: "10px", backgroundColor:"#FF2E2E", marginRight:"0px", borderRadius:"999px"},
            
            profilePicWrapper: {display:"flex", flexDirection:"column", height:"100px", alignItems: "center", justifyContent: "center"},
            profilePicTheme: {fonts: {font1:"Inter"}, fontColors: {color1: "green"}, fontWeight: {bold: "800"}, fontSize: {fontSize1: "11px"}},
            profilePicInnerWrapper: {display:"flex", width:"100%", height:"42px"},
            profilePicImage:{width:"42px", borderRadius:"999px", margin: "auto"},

            sectionOne: {},
            sectionTwo:{marginBottom: "auto", marginTop:"20px"},
            sectionThree:{},
            sectionFour:{},
            sectionFive:{}
            }
        }
        return style
    }

   
}
export default new MinimalNav();


