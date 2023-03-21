
class LegatoStyles {
    getstyles() {
        
                let appBorders =
                {
                    borderThin: "1px solid #1B1B1B",
                    borderThick: "2px solid #1B1B1B",
                    borderThickest: "4px solid #1B1B1B",
                    borderDouble: "double #32a999",
                    allmargins: ".1vw",
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
                    appBold: "'Roboto', sans-serif",
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
                    color1:"#57BA8E",
                    color2:"#C9F5E1",
                    color3:"#797979",
                    color4:"#D1D1D1",
                    color5:"#EFF1F2",
                    color6:"#6C86F4",
                    color7:"#AF4133",
                    color8:"#ADCDBA",
                    color9:"",
                    color10:"",
                    color11:"",
                    color12:"",
                    color13:"",
                    colorWhite:"#FFFFFF",
                    colorBlack:"#1B1B1B",
                }
        
        
                let styles = {
        
                   
                    smallestCard:
                    {   
                        border: appBorders.borderThin,
                        width: "8.48958vw",
                        height: "15.1282vh",
                        
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
        
                    tallCard:
                    {   border: appBorders.borderThin,
                        width: "16.97916vw",
                        height: "42.05vh",
                        
                        background: appColors.colorWhite,
                        borderRadius: "23px",
                        boxShadow: "2px 3px 6px" + appColors.colorBlack,
                        userSelect: "none"
                    },
        
                    smallCardleft:
                    {   width: "20.1234vw",
                        height: "30.2564vh",
                        border: appBorders.borderThin,
                        
                        background: appColors.colorWhite,
                        borderRadius: "23px",
                        boxShadow: "2px 3px 6px" + appColors.colorBlack,
                        userSelect: "none"
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
                        borderRadius: "23px",
                        boxShadow: "2px 3px 6px" + appColors.colorBlack,
                        userSelect: "none"
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
                        width: "16",
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
        


    //     let styles = {

    //         //alignment options
    //         alignMain: {
    //             fontFamily: fontApp.appFont,
    //             display: "flex",
    //             flexDirection: "row",
    //             justifycontent: "space-between",
    //         },
    //         alignStudent:{fontFamily: fontApp.appFont,
    //             display:"flex", flexDirection:"row", justifycontent:"center"
    //         },
    //         sizeSpecStud:{fontFamily: fontApp.appFont,
    //             marginLeft:"0px",
    //             imageSize: "40px",
    //             width:"10vw",
    //             position:"",
    //             width1: "50vw",
    //             width2: "35vw"
    //         },
    //         starPostion:{fontFamily: fontApp.appFont,
    //             position:'absolute', marginTop:"35px", width:"13vw"
    //         },

    //         side: {fontFamily: fontApp.appFont,
    //             sideWidth: window.innerWidth < 1300 ? "20vw" : "15.625vw",
    //             sidePadding: appBorders.allmargins,
    //         },

    //         // homework.js layout //
    //         homework: {fontFamily: fontApp.appFont,
    //             leftmargin: "2vw",
    //         },

    //         mystudents: {fontFamily: fontApp.appFont,
    //             studentWidth: "100%",
    //             studentMargin: "9px",
    //             heigth: "6vh",

    //         },

    //         resizecard:
    //         {fontFamily: fontApp.appFont,
    //             border: appBorders.borderthin,
    //             width: "16.97916vw",
    //             height: "30.2564vh",
    //             display: "flex",
    //             flexDirection: "column",
    //             //justifyContent:"space-between",
    //             background: appColors.colorWhite,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },

    //         smallcard:
    //         {fontFamily: fontApp.appFont,
    //             width: "16.97916vw",
    //             height: "30.2564vh",
    //             border: appBorders.borderthin,
    //             display: "flex",
    //             flexDirection: "column",
    //             background: appColors.color6,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },

    //         smallcardGreen:
    //         {fontFamily: fontApp.appFont,
    //             width: "16.97916vw",
    //             height: "30.2564vh",
    //             border: appBorders.borderthin,
    //             display: "flex",
    //             flexDirection: "column",
    //             background: appColors.color1,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },

    //         tallcard:
    //         {fontFamily: fontApp.appFont,
    //             width: "16.97916vw",
    //             height: "42.05vh",
    //             border: appBorders.borderthin,
    //             display: "flex",
    //             flexDirection: "column",
    //             background: appColors.colorWhite,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },

    //         smallcardleft:
    //         {fontFamily: fontApp.appFont,
    //             width: "20.1234vw",
    //             height: "30.2564vh",
    //             border: appBorders.borderthin,
    //             display: "flex",
    //             flexDirection: "column",

    //             background: appColors.colorWhite,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },

    //         bigcard:
    //         {fontFamily: fontApp.appFont,
    //             border: appBorders.borderthin,
    //             width: "29vw",
    //             height: "30.2564vh",
    //             display: "flex",
    //             flexDirection: "column",
    //             //justifyContent:"space-between",
    //             background: appColors.colorWhite,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },

    //         bigcardChat:
    //         {fontFamily: fontApp.appFont,
    //             border: appBorders.borderthin,
    //             width: "31vw",
    //             height: "30.2564vh",
    //             display: "flex",
    //             flexDirection: "column",
    //             //justifyContent:"space-between",
    //             background: appColors.colorWhite,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             // marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },

    //         biggercard:
    //         {fontFamily: fontApp.appFont,
    //             border: appBorders.borderthin,
    //             width: "52vw",
    //             height: "42.05vh",
    //             display: "flex",
    //             flexDirection: "column",
    //             //justifyContent:"space-between",
    //             background: appColors.colorWhite,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             // marginLeft: appBorders.allmargins,

    //         },

    //         biggestcard:
    //         {fontFamily: fontApp.appFont,
    //             border: appBorders.borderthin,
    //             width: '72vw',
    //             height: "84.1vh",
    //             display: "flex",
    //             flexDirection: "column",
    //             //justifyContent:"space-between",
    //             background: appColors.colorWhite,
    //             borderRadius: "23px",
    //             boxShadow: "2px 3px 6px" + appColors.color4,

    //             marginTop: appBorders.allmarginsH,
    //             marginBottom: appBorders.allmarginsH,
    //             marginRight: appBorders.allmargins,
    //             // marginLeft: appBorders.allmargins,
    //             userSelect: "none"
    //         },


    //         popup1:
    //         {fontFamily: fontApp.appFont,
    //             position: "relative",
    //             display: "flex",
    //             padding: "1% 2% 2% 2%",
    //             backgroundColor: "white",
    //             boxShadow: "2px 3px 8px " + appColors.colorBlack + "aa",
    //             borderRadius: "23px",
    //             height: "35vh",
    //             width: "20%",
    //             margin: "0 auto auto auto",
    //             marginTop: "10%",
    //             alignSelf: "center",
    //             flexDirection: "column",
    //             userSelect: "none",
    //             zIndex: "1100"
    //         },

    //         // dash.js layout //
    //         dashboard:
    //         {fontFamily: fontApp.appFont,
    //             display: "flex",
    //             flexColumn: "column",
    //             flexRow: "row",
    //             flexDirection: "row",
    //             justifycontent: "center"
    //         },

    //         borders:
    //         {fontFamily: fontApp.appFont,
    //             borderMain: "1pc solid black",
    //             borderSide: "1px solid #EFF1F2",
    //             dropShadow: "4px 0px 16px #D1D1D1",
    //             borderPic: "1px solid #ADCDBA",
    //             borderMet: "1.2px solid #338353",
    //             paddingSpace: "5px 0px 5px",
    //         },

    //         // checkboxes control //
    //         checkbox: {fontFamily: fontApp.appFont,
    //             size1: "change-label2a",
    //             size2: "22px",
    //         },

    //         // fonts control here //
    //         fonts: {
    //             appTitle: "fontApp.appFont",
    //             appFont: "fontApp.appFont",
    //             fontsizeAppName: "35px",
    //             fontsizeTitle: "22px/25px",
    //             fontweightMain: "400",
    //             fontweightMed: "600",

    //             appSpacing: ".9px",
    //             appSpacing2: ".6px",

    //             fontsize1: "18px",
    //             fontsize3: "16px",
    //             fontsize5: "12px",
    //             fontSide: "'normal normal normal 18px/21px Roboto'",
    //             fontEdit: "'normal normal normal 16px/21px Roboto'",

    //             fontsizeMod: "44."
    //         },

    //         colors: {fontFamily: fontApp.appFont,
    //             color1: appColors.color1,
    //             color2: appColors.color2,
    //             color3: appColors.colorBlack,
    //             color4: appColors.color1,
    //             color5: appColors.color2,
    //             color6: appColors.colorWhite,
    //             colorTransparent: appColors.color8,
    //             colorSubtext: appColors.color3,
    //             colorShadow: appColors.color4,
    //             colorBackground: appColors.color5,
    //             colorLink: appColors.color6,
    //             colorWarning: appColors.color7,
    //             colorOffBlack: "#3A3F45",
    //             colorBlue: appColors.color6,
    //             colorGreen: appColors.color1,
    //         },

    //         daytag: {fontFamily: fontApp.appFont,
    //             background: appColors.color6,
    //             borderRadius: "20px",
    //             cursor: "pointer",
    //             border: appBorders.borderthin,
    //             height: "22px",
    //             color: appColors.color5,
    //             fontWeight: "500",
    //             fontSize: "14px",
    //             width: "36px",
    //             marginLeft: "5px",
    //             display: "flex",
    //             flexDirection: "column",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             userSelect: "none"
    //         },

    //         daytagUnselect: {
    //             fontFamily: fontApp.appFont,
    //             background: appColors.colorWhite,
    //             borderRadius: ".5vw",
    //             cursor: "pointer",
    //             border: appBorders.borderthin,
    //             height: "22px",
    //             color: appColors.color5,
    //             fontWeight: "500",
    //             fontSize: "14px",
    //             width: "36px",
    //             marginLeft: "5px",
    //             display: "flex",
    //             flexDirection: "column",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             userSelect: "none"
    //         },

    //         margins: {fontFamily: fontApp.appFont,
    //             margin1: "2vw",
    //             margin2: "2vh",
    //             margin3: "40px",
    //             margin3a: "50px",
    //             margin4: "10px",
    //             marginStudent: "10px 10px 10px 10px",
    //             margin5: "5.5px",
    //             margin6: "-15px"
    //         },

    //         buttons: {
    //             buttonLog: {fontFamily: fontApp.appFont,
    //                 background: appColors.color1,

    //                 borderRadius: "16px",
    //                 boxShadow: "1px 2px 3px" + appColors.color4,
    //                 border: appBorders.borderthin,
    //                 width: "90%",
    //                 cursor: "pointer",

    //                 height: "10%",
    //                 color: "#F0F2EF",
    //                 fontWeight: "500",
    //                 fontSize: "18px",

    //                 display: "flex",
    //                 flexDirection: "column",
    //                 justifyContent: "center",
    //                 alignItems: "center"
    //             },

    //             closeicon:
    //             {fontFamily: fontApp.appFont,
    //                 display: "flex",
    //                 flexDirection: "row",
    //                 width: "",
    //                 color: "#ACACAC",
    //                 cursor: "pointer",
    //                 fontSize: "28px",
    //                 alignItems: "center",
    //                 justifyContent: "flex-end",
    //                 position:"absolute",
    //                 right:"0",
    //                 top:"0",
    //                 marginRight:"10px",
    //                 marginTop:"10px",
    //                 height: "4%",
    //             },

    //             buttonExpand: {fontFamily: fontApp.appFont,
    //                 marginRight: "10px 10px 10px 10px",
    //                 color: "#639EFE",
    //                 //letterSpacing: styles.fonts.appSpacing,   
    //                 alignItems: "right",
    //                 cursor: "pointer",
    //             },

    //             buttonRound: {fontFamily: fontApp.appFont,
    //                 background: appColors.color5,

    //                 borderRadius: "20px",
    //                 //boxShadow: "1px 2px 3px"+appColors.color4,
    //                 cursor: "pointer",
    //                 border: appBorders.borderthin,

    //                 height: "29px",
    //                 color: appColors.color6,
    //                 fontWeight: "500",
    //                 fontSize: "14px",
    //                 width: "56px",

    //                 display: "flex",
    //                 flexDirection: "column",
    //                 justifyContent: "center",
    //                 alignItems: "center"
    //             },

    //             buttonRound2: {fontFamily: fontApp.appFont,
    //                 background: appColors.color5,

    //                 borderRadius: "20px",
    //                 //boxShadow: "1px 2px 3px"+appColors.color4,
    //                 cursor: "pointer",
    //                 border: appBorders.borderthin,

    //                 height: "29px",
    //                 color: appColors.color1,
    //                 fontWeight: "500",
    //                 fontSize: "14px",
    //                 width: "56px",

    //                 display: "flex",
    //                 flexDirection: "column",
    //                 justifyContent: "center",
    //                 alignItems: "center"
    //             },

    //             buttonClear: {fontFamily: fontApp.appFont,
    //                 background: "",
    //                 height: "30px",
    //                 color: appColors.color7,

    //                 cursor: "pointer",

    //                 borderRadius: "5px",
    //                 boxShadow: "1px 2px 3px" + appColors.color4,
    //                 border: appBorders.borderthin,

    //                 fontWeight: "550",
    //                 fontSize: "13px",
    //                 width: "119px",
    //                 display: "flex",
    //                 flexDirection: "column",
    //                 justifyContent: "center",
    //                 alignItems: "center"
    //             },

    //             buttonAdd: {fontFamily: fontApp.appFont,
    //                 background: "",
    //                 height: "16px",

    //                 cursor: "pointer",

    //                 color: appColors.colorWhite + "e9",
    //                 //marginRight:"6%",

    //                 width: "28%",
    //                 fontSize: "16px",
    //                 fontWeight: "500",
    //                 display: "flex",
    //                 //flexDirection: "row",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //             },

           


    // getCustomCheckbox(big) {
    //     let changeLabelA = {
    //         change: "change-label2",
    //         csyncboxa: "csyncboxa",
    //         tick: "tickFix1",
    //     };
    //     let changeLabelB = {
    //         change: "change-label2b",
    //         csyncboxa: "csyncboxa",
    //         tick: "tickFix",
    //     };

    //     return big ? changeLabelA : changeLabelB;

    // } }}

    getStylesByScreenSize(){
        let objkey = this.getstyles();
        // if(window.innerWidth<1300){
        //     objKey=this.resize1();
        // }
        // else if(window.innerWidth<600){
        //     objKey = this.resize2();
        // }

        return objkey;
    }
}

export default new LegatoStyles();



