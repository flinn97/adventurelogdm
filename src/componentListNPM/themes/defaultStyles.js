
class DefaultStyles {
    getstyles() {

        let appBorders =
        {
            borderThin: "1px solid #1B1B1B",
            borderThick: "2px solid #1B1B1B",
            borderThickest: "4px solid #1B1B1B",
            borderDouble: "double #32a999",
        }

        let appShadows =
        {
            shadow1: "1px 2px 3px #1B1B1B",
            shadow2: "2px 3px 4px #999999",
        }

        let appFonts= {
            //typeface
            appTitle: "'Roboto', sans-serif",
            appFont: "'Roboto', sans-serif",
            appBold: "",
            appItalic: "",
            appFont2: "",
            appFont3: "",

            //weight
            fontWeight100: "100",
            fontWeight300: "300",
            fontWeightNormal: "400",
            fontWeightBold: "700",
            fontWeightHeavy: "900",

            //letter spacing
            spacingNormal: "normal",
            spacingWide: ".11rem",
            spacingTight: "-.12vw",

            //size
            fontBody: "1.3vh",
            fontSmall: ".94vh",
            fontSubheader1: "1.6vh",
            fontSubheader2: "2vh",
            fontHeader1: "3vh",
            fontHeader2: "3.4vh",
            fontHeader3: "3.9vh",
            fontHeader4: "4.25vh",
            fontHeader5: "4.44vh",
        }

        let appColors =
        {
            color1:"#588b8b",
            color2:"#f28f3b",
            color3:"#ffffff",
            color4:"#c3c7c1",
            color5:"#c8553d",
            color6:"#add3d3",
            color7:"#0d0a0b",
            color8:"#313d5a",
            color9:"",
            color10:"",
            color11:"",
            color12:"",
            color13:"",
            colorWhite:"#ffffff",
            colorBlack:"#0d0a0b",


        }


        let styles = {
            //TODO: Create or check all styles
           
            smallestCard:
            {   border: appBorders.borderThin,
                width: "8.48958vw",
                height: "15.1282vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },

            smallerCard:
            {   border: appBorders.borderThin,
                width: "12.73437vw",
                height: "37.8205vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },

            smallCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "30.2564vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },

            bigCard:
            {   width: "29vw",
                height: "30.2564vh",
                border: appBorders.borderThin,
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            biggerCard:
            {   width: "52vw",
                height: "42.05vh",  
                border: appBorders.borderThin,
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            biggestCard:
            {   width: '72vw',
                height: "84.1vh",
                border: appBorders.borderThin,
                
                background: appColors.colorWhite,
                borderRadius: "11px",
                // boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            tallCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "42.05vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            tallerCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "42.05vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            
            tallestCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "42.05vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            colorTab:
            {   width:"100%", 
                height:"25%", 
                background: appColors.color1, 
                borderRadius:"23px 23px 0px 0px"
            },
           


            popupLarge:
            {
                width: "20.1234vw",
                height: "30.2564vh",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupMedium:
            {
                width: "16",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                width: "10",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },


            margins: {
                margin1w: "1vw",
                margin1h: "1vh",
            },

            buttons: {
                buttonClose:
                {
                    fontFamily: appFonts.appFont,
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "14vh",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px",
                    height: "fit-content",
                },

                buttonClear: {
                    cursor: "pointer",
                    background: appColors.color2,
                    color: appColors.colorWhite,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

                buttonAdd: {
                    cursor: "pointer",
                    background: appColors.color1,
                    color: appColors.colorBlack,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

            }
        }

        return styles;
    }

    resize1() {

        let appBorders =
        {
            borderThin: "1px solid #1B1B1B",
            borderThick: "2px solid #1B1B1B",
            borderThickest: "4px solid #1B1B1B",
            borderDouble: "double #32a999",
        }

        let appShadows =
        {
            shadow1: "1px 2px 3px #1B1B1B",
            shadow2: "2px 3px 4px #999999",
        }

        let appFonts= {
            //typeface
            appTitle: "'Roboto', sans-serif",
            appFont: "'Roboto', sans-serif",
            appBold: "",
            appItalic: "",
            appFont2: "",
            appFont3: "",

            //weight
            fontWeight100: "100",
            fontWeight300: "300",
            fontWeightNormal: "400",
            fontWeightBold: "700",
            fontWeightHeavy: "900",

            //letter spacing
            spacingNormal: "normal",
            spacingWide: ".11rem",
            spacingTight: "-.12vw",

            //size
            fontBody: "1.3vh",
            fontSmall: ".94vh",
            fontSubheader1: "1.6vh",
            fontSubheader2: "2vh",
            fontHeader1: "3vh",
            fontHeader2: "3.4vh",
            fontHeader3: "3.9vh",
            fontHeader4: "4.25vh",
            fontHeader5: "4.44vh",
        }

        let appColors =
        {
            color1:"#588b8b",
            color2:"#f28f3b",
            color3:"#ffffff",
            color4:"#c3c7c1",
            color5:"#c8553d",
            color6:"#add3d3",
            color7:"#0d0a0b",
            color8:"#313d5a",
            color9:"",
            color10:"",
            color11:"",
            color12:"",
            color13:"",
            colorWhite:"#ffffff",
            colorBlack:"#0d0a0b",


        }


        let styles = {
            //TODO: Create or check all styles
           
            smallestCard:
            {   border: appBorders.borderThin,
                width: "8.48958vw",
                height: "15.1282vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },

            smallerCard:
            {   border: appBorders.borderThin,
                width: "12.73437vw",
                height: "37.8205vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },

            smallCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "30.2564vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },

            bigCard:
            {   width: "29vw",
                height: "30.2564vh",
                border: appBorders.borderThin,
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            biggerCard:
            {   width: "52vw",
                height: "42.05vh",  
                border: appBorders.borderThin,
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            biggestCard:
            {   width: '72vw',
                height: "84.1vh",
                border: appBorders.borderThin,
                
                background: appColors.colorWhite,
                borderRadius: "11px",
                // boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            tallCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "42.05vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            tallerCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "42.05vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            
            tallestCard:
            {   border: appBorders.borderThin,
                width: "16.97916vw",
                height: "42.05vh",
                
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            colorTab:
            {   width:"100%", 
                height:"25%", 
                background: appColors.color1, 
                borderRadius:"23px 23px 0px 0px"
            },
           


            popupLarge:
            {
                width: "20.1234vw",
                height: "30.2564vh",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupMedium:
            {
                width: "16",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                width: "10",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },


            margins: {
                margin1w: "1vw",
                margin1h: "1vh",
            },

            buttons: {
                buttonClose:
                {
                    fontFamily: appFonts.appFont,
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "14vh",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px",
                    height: "fit-content",
                },

                buttonClear: {
                    cursor: "pointer",
                    background: appColors.color2,
                    color: appColors.colorWhite,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

                buttonAdd: {
                    cursor: "pointer",
                    background: appColors.color1,
                    color: appColors.colorBlack,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

            }
        }

        return styles;
    }

    getCustomCheckbox(big) {
        let changeLabelA = {
            change: "change-label2",
            csyncboxa: "csyncboxa",
            tick: "tickFix1",
        };
        let changeLabelB = {
            change: "change-label2b",
            csyncboxa: "csyncboxa",
            tick: "tickFix",
        };

        return big ? changeLabelA : changeLabelB;

    }
    getStylesByScreenSize(){
        let objkey = this.getstyles();
        if(window.innerWidth<650){
             objkey=this.resize1();
        }
        // else if(window.innerWidth<600){
        //     objKey = this.resize2();
        // }

        return objkey;
    }

}
export default new DefaultStyles();



