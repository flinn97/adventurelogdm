
class styleService {
    getstyles() {

        let borders =
        {
            borderthin: "0px solid #1B1B1B",
            borderthick: "0px solid #1B1B1B",
            allmargins: "2vw",
            allmarginsH: "4vh",
        }
        let fontApp= {
            appTitle: "'Roboto', sans-serif",
            appFont: "'Roboto', sans-serif",}

        let colorpick =
        {
            appGreen: "#57BA8E",
            appGreenfaded: "#C9F5E1",
            appBlack: "#1B1B1B",
            appWhite: "#FFFFFF",
            appGrey: "#797979",
            appLightgrey: "#D1D1D1",
            appOffwhite: "#EFF1F2",
            appBlue: "#6C86F4",
            appRed: "#AF4133",
            appGreentrans: "#ADCDBA",

        }


        let styles = {

            //alignment options
            alignMain: {
                fontFamily: fontApp.appFont,
                display: "flex",
                flexDirection: "row",
                justifycontent: "space-between",
            },
            alignStudent:{fontFamily: fontApp.appFont,
                display:"flex", flexDirection:"row", justifycontent:"center"
            },
            sizeSpecStud:{fontFamily: fontApp.appFont,
                marginLeft:"0px",
                imageSize: "40px",
                width:"10vw",
                position:"",
                width1: "50vw",
                width2: "35vw"
            },
            starPostion:{fontFamily: fontApp.appFont,
                position:'absolute', marginTop:"35px", width:"13vw"
            },

            side: {fontFamily: fontApp.appFont,
                sideWidth: window.innerWidth < 1300 ? "20vw" : "15.625vw",
                sidePadding: borders.allmargins,
            },

            // homework.js layout //
            homework: {fontFamily: fontApp.appFont,
                leftmargin: "2vw",
            },

            mystudents: {fontFamily: fontApp.appFont,
                studentWidth: "100%",
                studentMargin: "9px",
                heigth: "6vh",

            },

            resizecard:
            {fontFamily: fontApp.appFont,
                border: borders.borderthin,
                width: "16.97916vw",
                height: "30.2564vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            smallcard:
            {fontFamily: fontApp.appFont,
                width: "16.97916vw",
                height: "30.2564vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appBlue,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            smallcardGreen:
            {fontFamily: fontApp.appFont,
                width: "16.97916vw",
                height: "30.2564vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appGreen,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            tallcard:
            {fontFamily: fontApp.appFont,
                width: "16.97916vw",
                height: "42.05vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            smallcardleft:
            {fontFamily: fontApp.appFont,
                width: "20.1234vw",
                height: "30.2564vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",

                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            bigcard:
            {fontFamily: fontApp.appFont,
                border: borders.borderthin,
                width: "29vw",
                height: "30.2564vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            bigcardChat:
            {fontFamily: fontApp.appFont,
                border: borders.borderthin,
                width: "31vw",
                height: "30.2564vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                // marginLeft: borders.allmargins,
                userSelect: "none"
            },

            biggercard:
            {fontFamily: fontApp.appFont,
                border: borders.borderthin,
                width: "52vw",
                height: "42.05vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                // marginLeft: borders.allmargins,

            },

            biggestcard:
            {fontFamily: fontApp.appFont,
                border: borders.borderthin,
                width: '72vw',
                height: "84.1vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                // marginLeft: borders.allmargins,
                userSelect: "none"
            },


            popup1:
            {fontFamily: fontApp.appFont,
                position: "relative",
                display: "flex",
                padding: "1% 2% 2% 2%",
                backgroundColor: "white",
                boxShadow: "2px 3px 8px " + colorpick.appBlack + "aa",
                borderRadius: "23px",
                height: "35vh",
                width: "20%",
                margin: "0 auto auto auto",
                marginTop: "10%",
                alignSelf: "center",
                flexDirection: "column",
                userSelect: "none",
                zIndex: "1100"
            },

            // dash.js layout //
            dashboard:
            {fontFamily: fontApp.appFont,
                display: "flex",
                flexColumn: "column",
                flexRow: "row",
                flexDirection: "row",
                justifycontent: "center"
            },

            borders:
            {fontFamily: fontApp.appFont,
                borderMain: "1pc solid black",
                borderSide: "1px solid #EFF1F2",
                dropShadow: "4px 0px 16px #D1D1D1",
                borderPic: "1px solid #ADCDBA",
                borderMet: "1.2px solid #338353",
                paddingSpace: "5px 0px 5px",
            },

            // checkboxes control //
            checkbox: {fontFamily: fontApp.appFont,
                size1: "change-label2a",
                size2: "22px",
            },

            // fonts control here //
            fonts: {
                appTitle: "fontApp.appFont",
                appFont: "fontApp.appFont",
                fontsizeAppName: "35px",
                fontsizeTitle: "22px/25px",
                fontweightMain: "400",
                fontweightMed: "600",

                appSpacing: ".9px",
                appSpacing2: ".6px",

                fontsize1: "18px",
                fontsize3: "16px",
                fontsize5: "12px",
                fontSide: "'normal normal normal 18px/21px Roboto'",
                fontEdit: "'normal normal normal 16px/21px Roboto'",

                fontsizeMod: "44."
            },

            colors: {fontFamily: fontApp.appFont,
                color1: colorpick.appGreen,
                color2: colorpick.appGreenfaded,
                color3: colorpick.appBlack,
                color4: colorpick.appGreen,
                color5: colorpick.appGreenfaded,
                color6: colorpick.appWhite,
                colorTransparent: colorpick.appGreentrans,
                colorSubtext: colorpick.appGrey,
                colorShadow: colorpick.appLightgrey,
                colorBackground: colorpick.appOffwhite,
                colorLink: colorpick.appBlue,
                colorWarning: colorpick.appRed,
                colorOffBlack: "#3A3F45",
                colorBlue: colorpick.appBlue,
                colorGreen: colorpick.appGreen,
            },

            daytag: {fontFamily: fontApp.appFont,
                background: colorpick.appBlue,
                borderRadius: "20px",
                cursor: "pointer",
                border: borders.borderthin,
                height: "22px",
                color: colorpick.appOffwhite,
                fontWeight: "500",
                fontSize: "14px",
                width: "36px",
                marginLeft: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none"
            },

            daytagUnselect: {
                fontFamily: fontApp.appFont,
                background: colorpick.appWhite,
                borderRadius: ".5vw",
                cursor: "pointer",
                border: borders.borderthin,
                height: "22px",
                color: colorpick.appOffwhite,
                fontWeight: "500",
                fontSize: "14px",
                width: "36px",
                marginLeft: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none"
            },

            margins: {fontFamily: fontApp.appFont,
                margin1: "2vw",
                margin2: "2vh",
                margin3: "40px",
                margin3a: "50px",
                margin4: "10px",
                marginStudent: "10px 10px 10px 10px",
                margin5: "5.5px",
                margin6: "-15px"
            },

            buttons: {
                buttonLog: {fontFamily: fontApp.appFont,
                    background: colorpick.appGreen,

                    borderRadius: "16px",
                    boxShadow: "1px 2px 3px" + colorpick.appLightgrey,
                    border: borders.borderthin,
                    width: "90%",
                    cursor: "pointer",

                    height: "10%",
                    color: "#F0F2EF",
                    fontWeight: "500",
                    fontSize: "18px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                closeicon:
                {fontFamily: fontApp.appFont,
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "28px",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px",
                    height: "4%",
                },

                buttonExpand: {fontFamily: fontApp.appFont,
                    marginRight: "10px 10px 10px 10px",
                    color: "#639EFE",
                    //letterSpacing: styles.fonts.appSpacing,   
                    alignItems: "right",
                    cursor: "pointer",
                },

                buttonRound: {fontFamily: fontApp.appFont,
                    background: colorpick.appOffwhite,

                    borderRadius: "20px",
                    //boxShadow: "1px 2px 3px"+colorpick.appLightgrey,
                    cursor: "pointer",
                    border: borders.borderthin,

                    height: "29px",
                    color: colorpick.appBlue,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: "56px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonRound2: {fontFamily: fontApp.appFont,
                    background: colorpick.appOffwhite,

                    borderRadius: "20px",
                    //boxShadow: "1px 2px 3px"+colorpick.appLightgrey,
                    cursor: "pointer",
                    border: borders.borderthin,

                    height: "29px",
                    color: colorpick.appGreen,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: "56px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonClear: {fontFamily: fontApp.appFont,
                    background: "",
                    height: "30px",
                    color: colorpick.appRed,

                    cursor: "pointer",

                    borderRadius: "5px",
                    boxShadow: "1px 2px 3px" + colorpick.appLightgrey,
                    border: borders.borderthin,

                    fontWeight: "550",
                    fontSize: "13px",
                    width: "119px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonAdd: {fontFamily: fontApp.appFont,
                    background: "",
                    height: "16px",

                    cursor: "pointer",

                    color: colorpick.appWhite + "e9",
                    //marginRight:"6%",

                    width: "28%",
                    fontSize: "16px",
                    fontWeight: "500",
                    display: "flex",
                    //flexDirection: "row",
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

    resize1() {
        let borders =
        {
            borderthin: "0px solid #1B1B1B",
            borderthick: "0px solid #1B1B1B",
            allmargins: "1.8vw",
            allmarginsH: "2vh",
        }

        let colorpick =
        {
            appGreen: "#57BA8E",
            appGreenfaded: "#C9F5E1",
            appBlack: "#1B1B1B",
            appWhite: "#FFFFFF",
            appGrey: "#797979",
            appLightgrey: "#D1D1D1",
            appOffwhite: "#EFF1F2",
            appBlue: "#6C86F4",
            appRed: "#AF4133",
            appGreentrans: "#ADCDBA",

        }


        let styles = {
            //alignment options Ipad
            alignMain: {
                display: "flex",
                flexDirection: "row",
                justifycontent: "space-between",
            },
            alignStudent:{
                display:"flex", flexDirection:"row", justifycontent:"center"
            },
            sizeSpecStud:{
                marginLeft:"3vw",
                imageSize: "2vw",
                width:"50vw",
                position:"",
                width1: "65vw",
                width2: "60vw"
            },
            starPostion:{
                position:'absolute', marginTop:"35px", width:"13vw"
            },
            // dashWidth: {
            //     width:"100%",
            //     height:"100%"
            // },
            side: {
                sideWidth: "5vw",
                sidePadding: borders.allmargins,
            },

            // homework.js layout //
            homework: {
                leftmargin: "2vw",
            },

            mystudents: {
                studentWidth: "100%",
                studentMargin: "9px",
                heigth: "8vh",

            },

            resizecard:
            {
                border: borders.borderthin,
                width: "24vw",
                height: "35vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                // borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            smallcard:
            {
                width: "24vw",
                height: "35vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appBlue,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: "2vw",
                userSelect: "none"
            },

            smallcardGreen:
            {
                width: "24vw",
                height: "35vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appGreen,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            tallcard:
            {
                width: "24vw",
                height: "38vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "0px",
                // borders.allmargins,
                marginBottom: borders.allmarginsH,
                marginRight: "0px",
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            smallcardleft:
            {
                width: "20.1234vw",
                height: "30.2564vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",

                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            bigcard:
            {
                border: borders.borderthin,
                width: "34.5vw",
                height: "35vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },
            bigcardChat:
            {
                border: borders.borderthin,
                width: "34.5vw",
                height: "35vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },


            biggercard:
            {
                border: borders.borderthin,
                width: "62vw",
                height: "38vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "0px",
                // borders.allmargins,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,

            },

            biggestcard:
            {
                border: borders.borderthin,
                width: "90vw",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "0px",
                // borders.allmargins,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },


            popup1:
            {
                position: "relative",
                display: "flex",
                padding: "1% 2% 2% 2%",
                backgroundColor: "white",
                boxShadow: "2px 3px 8px " + colorpick.appBlack + "aa",
                borderRadius: "23px",
                height: "49vh",
                width: "30%",
                margin: "0 auto auto auto",
                marginTop: "10%",
                alignSelf: "center",
                flexDirection: "column",
                userSelect: "none",
                zIndex: "1100"
            },

            // dash.js layout //
            dashboard:
            {
                display: "flex",
                flexColumn: "column",
                flexRow: "row",
                justifycontent: "center",
                flexDirection: "row",
            },

            borders:
            {
                borderMain: "1pc solid black",
                borderSide: "1px solid #EFF1F2",
                dropShadow: "4px 0px 16px #D1D1D1",
                borderPic: "1px solid #ADCDBA",
                borderMet: "1.2px solid #338353",
                paddingSpace: "5px 0px 5px",
            },

            // checkboxes control //
            checkbox: {
                size1: "change-label2a",
                size2: "22px",
            },

            // fonts control here //
            fonts: {
                appTitle: "'Roboto Slab'",
                appFont: "Roboto",
                fontsizeAppName: "35px",
                fontsizeTitle: "22px/25px",
                fontweightMain: "400",
                fontweightMed: "600",

                appSpacing: ".9px",
                appSpacing2: ".6px",

                fontsize1: "18px",
                fontsize3: "16px",
                fontsize5: "12px",
                fontSide: "'normal normal normal 18px/21px Roboto'",
                fontEdit: "'normal normal normal 16px/21px Roboto'",

                fontsizeMod: "44."
            },

            colors: {
                color1: colorpick.appGreen,
                color2: colorpick.appGreenfaded,
                color3: colorpick.appBlack,
                color4: colorpick.appGreen,
                color5: colorpick.appGreenfaded,
                color6: colorpick.appWhite,
                colorTransparent: colorpick.appGreentrans,
                colorSubtext: colorpick.appGrey,
                colorShadow: colorpick.appLightgrey,
                colorBackground: colorpick.appOffwhite,
                colorLink: colorpick.appBlue,
                colorWarning: colorpick.appRed,
                colorOffBlack: "#3A3F45",
                colorBlue: colorpick.appBlue,
                colorGreen: colorpick.appGreen,
            },

            daytag: {
                background: colorpick.appBlue,
                borderRadius: "20px",
                cursor: "pointer",
                border: borders.borderthin,
                height: "22px",
                color: colorpick.appOffwhite,
                fontWeight: "500",
                fontSize: "14px",
                width: "36px",
                marginLeft: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none"
            },

            margins: {
                margin1: "2vw",
                margin2: "2vh",
                margin3: "40px",
                margin4: "10px",
                marginStudent: "10px 10px 10px 10px",
                margin5: "5.5px",
                margin6: "-15px"
            },

            buttons: {
                buttonLog: {
                    background: colorpick.appGreen,

                    borderRadius: "16px",
                    boxShadow: "1px 2px 3px" + colorpick.appLightgrey,
                    border: borders.borderthin,
                    width: "90%",
                    cursor: "pointer",

                    height: "10%",
                    color: "#F0F2EF",
                    fontWeight: "500",
                    fontSize: "18px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                closeicon:
                {
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "28px",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px",
                    height: "4%",
                },

                buttonExpand: {
                    marginRight: "10px 10px 10px 10px",
                    color: "#639EFE",
                    //letterSpacing: styles.fonts.appSpacing,   
                    alignItems: "right",
                    cursor: "pointer",
                },

                buttonRound: {
                    background: colorpick.appOffwhite,

                    borderRadius: "20px",
                    //boxShadow: "1px 2px 3px"+colorpick.appLightgrey,
                    cursor: "pointer",
                    border: borders.borderthin,

                    height: "29px",
                    color: colorpick.appBlue,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: "56px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonRound2: {
                    background: colorpick.appOffwhite,

                    borderRadius: "20px",
                    //boxShadow: "1px 2px 3px"+colorpick.appLightgrey,
                    cursor: "pointer",
                    border: borders.borderthin,

                    height: "29px",
                    color: colorpick.appGreen,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: "56px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonClear: {
                    background: "",
                    height: "30px",
                    color: colorpick.appRed,

                    cursor: "pointer",

                    borderRadius: "5px",
                    boxShadow: "1px 2px 3px" + colorpick.appLightgrey,
                    border: borders.borderthin,

                    fontWeight: "550",
                    fontSize: "13px",
                    width: "119px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonAdd: {
                    background: "",
                    height: "16px",

                    cursor: "pointer",

                    color: colorpick.appWhite + "e9",
                    //marginRight:"6%",

                    width: "28%",
                    fontSize: "16px",
                    fontWeight: "500",
                    display: "flex",
                    //flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Roboto, Tahoma, sans-serif"
                },

            }
        }

        return styles;
    }
    resize2() {
        let borders =
        {
            borderthin: "0px solid #1B1B1B",
            borderthick: "0px solid #1B1B1B",
            allmargins: "1.8vw",
            allmarginsH: "2vh",
        }

        let colorpick =
        {
            appGreen: "#57BA8E",
            appGreenfaded: "#C9F5E1",
            appBlack: "#1B1B1B",
            appWhite: "#FFFFFF",
            appGrey: "#797979",
            appLightgrey: "#D1D1D1",
            appOffwhite: "#EFF1F2",
            appBlue: "#6C86F4",
            appRed: "#AF4133",
            appGreentrans: "#ADCDBA",

        }


        let styles = {

            //alignment options iphone
            alignMain: {
                display: "flex",
                flexDirection: "column",
                justifycontent: "space-between",
            },
            alignStudent:{
                display:"flex", flexDirection:"column", justifycontent:"center", alignItems:"center"
            },
            dashWidth: {
                width:"100%",
                height:"100%"
            },
            starPostion:{
                marginTop:"-20px", width:"60vw", 
            },
            iPhoneAlign:{
                display: "flex",
                flexDirection: "column",
                justifycontent: "center",
                alignItems:"center"
            },
            sizeSpecStud:{
                marginLeft:"0px",
                imageSize: "7vw",
                width:"50vw",
                position:"relative",
                width1: "95vw",
                width2: "95vw"
            },
            iphoneHelp:{
                marginLeft:"15px"
            },

            side: {
                sideWidth: "5vw",
                sidePadding: borders.allmargins,
            },

            // homework.js layout //
            homework: {
                leftmargin: "2vw",
            },

            mystudents: {
                studentWidth: "100%",
                studentMargin: "9px",
                heigth: "8vh",

            },

            resizecard:
            {
                border: borders.borderthin,
                width: "95vw",
                height: "40vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                // borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            smallcard:
            {
                width: "95vw",
                height: "35vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appBlue,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: "80vh",
                marginRight: borders.allmargins,
                marginLeft: "2vw",
                userSelect: "none"
            },

            smallcardGreen:
            {
                width: "95vw",
                height: "35vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appGreen,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            tallcard:
            {
                width: "95vw",
                height: "55vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                // borders.allmargins,
                marginBottom: borders.allmarginsH,
                marginRight: "0px",
                // marginLeft: borders.allmargins,
                userSelect: "none"
            },

            smallcardleft:
            {
                width: "20.1234vw",
                height: "30.2564vh",
                border: borders.borderthin,
                display: "flex",
                flexDirection: "column",

                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: borders.allmarginsH,
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },

            bigcard:
            {
                border: borders.borderthin,
                width: "95vw",
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },
            bigcardChat:
            {
                border: borders.borderthin,
                width: "95vw",
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "2vh",
                marginBottom: borders.allmarginsH,
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },


            biggercard:
            {
                border: borders.borderthin,
                width: "95vw",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "0px",
                // borders.allmargins,
                marginBottom: borders.allmarginsH,
                

            },

            biggestcard:
            {
                border: borders.borderthin,
                width: "95vw",
                height: "70vh",
                display: "flex",
                flexDirection: "column",
                //justifyContent:"space-between",
                background: colorpick.appWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + colorpick.appLightgrey,

                marginTop: "0px",
                // borders.allmargins,
                marginBottom: "40vh",
                marginRight: borders.allmargins,
                marginLeft: borders.allmargins,
                userSelect: "none"
            },


            popup1:
            {
                position: "relative",
                display: "flex",
                padding: "1vw 2vw 2vw 2vw",
                paddingTop:"5vh",
                backgroundColor: "white",
                boxShadow: "2px 3px 8px " + colorpick.appBlack + "aa",
                borderRadius: "23px",
                height: "49vh",
                width: "95vw",
                margin: "0 auto auto auto",
                marginTop: "8vh",
                alignSelf: "center",
                flexDirection: "column",
                userSelect: "none",
                zIndex: "1100"
            },

            // dash.js layout //
            dashboard:
            {
                display: "flex",
                flexColumn: "column",
                flexRow: "row",
                flexDirection: "column",
                justifycontent: "center"
            },

            borders:
            {
                borderMain: "1pc solid black",
                borderSide: "1px solid #EFF1F2",
                dropShadow: "4px 0px 16px #D1D1D1",
                borderPic: "1px solid #ADCDBA",
                borderMet: "1.2px solid #338353",
                paddingSpace: "5px 0px 5px",
            },

            // checkboxes control //
            checkbox: {
                size1: "change-label2a",
                size2: "22px",
            },

            // fonts control here //
            fonts: {
                appTitle: "'Roboto Slab'",
                appFont: "Roboto",
                fontsizeAppName: "35px",
                fontsizeTitle: "22px/25px",
                fontweightMain: "400",
                fontweightMed: "600",

                appSpacing: ".9px",
                appSpacing2: ".6px",

                fontsize1: "18px",
                fontsize3: "16px",
                fontsize5: "12px",
                fontSide: "'normal normal normal 18px/21px Roboto'",
                fontEdit: "'normal normal normal 16px/21px Roboto'",

                fontsizeMod: "44."
            },

            colors: {
                color1: colorpick.appGreen,
                color2: colorpick.appGreenfaded,
                color3: colorpick.appBlack,
                color4: colorpick.appGreen,
                color5: colorpick.appGreenfaded,
                color6: colorpick.appWhite,
                colorTransparent: colorpick.appGreentrans,
                colorSubtext: colorpick.appGrey,
                colorShadow: colorpick.appLightgrey,
                colorBackground: colorpick.appOffwhite,
                colorLink: colorpick.appBlue,
                colorWarning: colorpick.appRed,
                colorOffBlack: "#3A3F45",
                colorBlue: colorpick.appBlue,
                colorGreen: colorpick.appGreen,
            },

            daytag: {
                background: colorpick.appBlue,
                borderRadius: "20px",
                cursor: "pointer",
                border: borders.borderthin,
                height: "22px",
                color: colorpick.appOffwhite,
                fontWeight: "500",
                fontSize: "14px",
                width: "36px",
                marginLeft: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none"
            },

            margins: {
                margin1: "2vw",
                margin2: "2vh",
                margin3: "40px",
                margin4: "10px",
                marginStudent: "10px 10px 10px 10px",
                margin5: "5.5px",
                margin6: "-15px"
            },

            buttons: {
                buttonLog: {
                    background: colorpick.appGreen,

                    borderRadius: "16px",
                    boxShadow: "1px 2px 3px" + colorpick.appLightgrey,
                    border: borders.borderthin,
                    width: "90%",
                    cursor: "pointer",

                    height: "10%",
                    color: "#F0F2EF",
                    fontWeight: "500",
                    fontSize: "18px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                closeicon:
                {
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "28px",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "4%",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px"
                },

                buttonExpand: {
                    marginRight: "10px 10px 10px 10px",
                    color: "#639EFE",
                    //letterSpacing: styles.fonts.appSpacing,   
                    alignItems: "right",
                    cursor: "pointer",
                },

                buttonRound: {
                    background: colorpick.appOffwhite,

                    borderRadius: "20px",
                    //boxShadow: "1px 2px 3px"+colorpick.appLightgrey,
                    cursor: "pointer",
                    border: borders.borderthin,

                    height: "29px",
                    color: colorpick.appBlue,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: "56px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonRound2: {
                    background: colorpick.appOffwhite,

                    borderRadius: "20px",
                    //boxShadow: "1px 2px 3px"+colorpick.appLightgrey,
                    cursor: "pointer",
                    border: borders.borderthin,

                    height: "29px",
                    color: colorpick.appGreen,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: "56px",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonClear: {
                    background: "",
                    height: "30px",
                    color: colorpick.appRed,

                    cursor: "pointer",

                    borderRadius: "5px",
                    boxShadow: "1px 2px 3px" + colorpick.appLightgrey,
                    border: borders.borderthin,

                    fontWeight: "550",
                    fontSize: "13px",
                    width: "119px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },

                buttonAdd: {
                    background: "",
                    height: "16px",

                    cursor: "pointer",

                    color: colorpick.appWhite + "e9",
                    //marginRight:"6%",

                    width: "28%",
                    fontSize: "16px",
                    fontWeight: "500",
                    display: "flex",
                    //flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Roboto, Tahoma, sans-serif"
                },

            }
        }

        return styles;
    }

}


export default new styleService();



