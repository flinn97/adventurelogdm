
class SpawnStyles {
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
            appTitle: "Luminari",
            appFont: "'Inria'",
            appBold: "'InriaBold'",
            appItalic: "",
            appFont2: "'InriaLight'",
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
            color1:"#EF3E23",
            color2:"#A80303",
            color3:"#0000CC",
            color4:"#491778",
            color5:"#F2F2F2",
            color6:"#F2F2F2",
            color7:"#D8D9DA",
            color8:"#2e2e2e",
            color9:"",
            color10:"",
            color11:"",
            color12:"",
            color13:"",
            colorWhite:"#FBFFFF",
            colorBlack:"#000000",


        }

            
            let styles = {
                colors: {
                
                ///greyscales
                    White1:appColors.colorWhite,
                    Black1: appColors.colorBlack,
                    Grey1: appColors.color5,
                    Grey2: appColors.color7,
                    Grey3: appColors.color8,
                ///font settings
                    darkFontColor: appColors.colorBlack,
                    lightFontColor: appColors.color8,
                    linkFontColor: appColors.color3,
                    linkVisitedColor: appColors.color4,
                },

                shadows: {
                /// h-offset v-offset blur spread color
                    sideShadow: "1px 10px 30px -2px "+ appColors.color5,
                    homeShadow: "0px 0px 30px white",
                },

                mySpawn: {
                    imgW: "15.1vw",
                    keepcardW: "2vw",
                    keepcardMargin: "1vw",
                    satFilter: "saturate(.04)",
                    keepSpacing: "9vw",
                    keepWidth: "18.3vw",
                    itemMarginLeft: ".17vw",
                    bioW: "80%",
                    editH: "1.96vh",
                    border: "0 0 2px 0",
                },

                myFeed: {
                    imgW: "12.1vw",
                    keepH: "5vh",            
                    keepItemW: "6vw",

                    editW: "1.18vw",   
                                   

                    likeItemW: "2.5vw",
                    likeCounter: "22%",

                    subWidth: "56vw",

                    arrowSizeW: "3.5vw",
                    arrowSizeH: "auto",
                    arrowMargin: "1vw",

                    feedW: "58vw",
                    feedH: "60vh",
                },

                comments: {
                    display: "flex",
                    
                    fontFamily: 'Inria',
                    fontSize: "1vw",
                    background: "linear-gradient(to left, rgba(10,10,10,.00), #F9F5F4",
                    marginBottom: "1vh",
                    borderRadius: ".3vw",
                    paddingLeft: ".2vw",
                    veticalAlign: "middle",
                },

                margins: {
                    marginSmallW: ".7vw",
                    marginSmallH: ".7vh",

                    marginMediumH: "2vh",
                    marginMediumW: "2vw",
                    

                    marginLargeH: "8vh",
                    marginLargeW: "8vh",

                    marginXLW: "10vh"
                },

                buttons: {
                buttonComment:
                {
                    fontFamily: 'Inria',
                    fontSize: ".9vw",
                    color: appColors.color3,
                    marginTop: ".4vh",
                    cursor: "pointer",
                    userSelect: "none"
                },

                buttonUnfollow:
                {
                    fontFamily: 'InriaBold',
                    fontSize: "1.4vh",
                    color: appColors.color2,
                    marginTop: ".4vh",
                    textDecoration: "underline #D8D9DA 2px",
                    padding: ".19vh",
                    paddingLeft: ".19vw",
                    paddingRight: ".19vw",
                    justifyContent: "center",
                    alignContent: "center",     
                    alignItems: "center",   
                    width:"fit-content",
                    height:"fit-content",
                    display: "flex",
                        cursor: "pointer",
                        marginLeft: "",
                    background: appColors.colorWhite,
                    borderRadius: "1vw",
                    border: ".1rem solid rgba(15,15,15,.55)",
                    userSelect: "none"
                    
                },

                buttonEdit:
                {
                    fontFamily: 'InriaBold',
                    fontSize: ".8vw",
                    marginLeft: ".2vw",
                    color: appColors.color3,
                    textDecoration: "dashed underline #D8D9DA 2px",
                    cursor: "pointer",
                    userSelect: "none"
                },

                buttonSubmit:
                {
                    fontFamily: 'InriaBold',
                    fontSize: "1.4vh",
                    marginTop: ".5vh",
                    cursor: "pointer",
                },

                buttonCreate:
                {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "rgba(255,255,255,.52)",
                    borderRadius: "1vw",
                    border: ".1rem solid rgba(15,15,15,.15)",
                    borderStyle: "none groove none groove",
                    color: appColors.color8,
                    fontSize: "1.2vw",
                    width: "fit-content",
                    height: "fit-content",
                    textDecoration: "underline "+appColors.colorWhite,
                    fontWeight: "700",
                    cursor: "pointer",
                },

                buttonFollow:
                {
                    width:"8vw",
                    display: "flex",

                    background: appColors.color1,
                    borderRadius: "1vw",
                    border: ".1rem solid rgba(15,15,15,.55)",
                    justifyContent: "center",
                    alignContent: "center",     
                    alignItems: "center",   
                    color: appColors.colorWhite,
                    fontSize: ".68vw",
                    
                    padding: ".1vh",
                    textAlign: "center",

                    fontWeight: "600",
                    fontFamily: 'InriaLight',
                    cursor: "pointer"
                    
                },

                buttonFollowing:
                {
                    display: "flex",
                    textAlign: "center",
                    color: appColors.color8, 
                    background: appColors.color5 , 
                    borderRadius: "1vw", 
                    fontSize: ".68vw",      
                    width: "108%",
                    textAlign: "center",
                    justifyContent: "center",  
                    alignContent: "center",      
                    alignItems: "center",     
                    padding: ".1vh",
                    border: ".1rem solid rgba(15,15,15,.00)",

                    fontWeight: "600",
                    fontFamily: 'InriaLight',
                    cursor: "pointer"

                },

                buttonX:
                {
                    display: "flex",
                    cursor: "pointer",
                    textAlign: "center",
                    fontFamily: 'InriaBold',
                    fontSize: '1vw',
                    color: appColors.color2,
                    
                },
            },
                logoTop:
                {
                    stripHeight: "10.5vh",
                    stripHalved: "5.25vh",
                    //100 - stripH
                    stripRemainder: "fit-content",

                    imgHeight: "auto",
                    imgWidth: "23.2vh",
                    marginLeft: "1vw",
                    marginTop: ".89vh",
                    marginBottom: "1vh"
                },

                borders:{
                    radius1: "2vw 2vw 2vw 2vw",
                },

                menu:{
                    menuW: "100vw",
                    menuInnerW: "fit-content",
                    // SUBTRACT FROM 100 then add .menu.MarginLeft
                    // remainderW: "82vw",
                    // AUTO PADDING, SUBTRACT FROM remainderW
                    innerPad: "2vw",

                    // marginLeft: "1vw",
                    // marginLeftGreater: "4vw",
                    marginTop: "5vh",
                    // marginBottom: "1.2vh",

                    menuSpacing: ".04rem",
                    
                    menuCardh: "4vh",
                    menuListh: "4vh",
                    menuCardmargin: "1vw",
                    position: "absolute",
                    top: "50",
                    left: 0,
                },

                fonts:
                {
                fontNormal: 'Inria',
                fontBold: 'InriaBold',
                fontLight: 'InriaLight',
                fontTitle:'Luminari',
                
                fontweightMain: "400",
                fontweightMenu: "600",
                fontweightMed: "700",

                appSpacing: ".9px",
                appSpacing2: ".6px",

                fontBody: "1.3vh",
                fontSubheader1: "1.6vh",
                fontSubheader2: "2vh",
                fontHeader1: "3vh",
                fontHeader2: "3.4vh",
                fontHeader3: "3.9vh",
                fontHeader4: "4.25vh",
                fontHeader5: "4.44vh",
                },
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
                    },}
                
            }

            
            return styles;
        }
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
    
    export default new SpawnStyles();
