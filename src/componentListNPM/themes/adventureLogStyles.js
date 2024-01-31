import { normalizeUnits } from "moment";



class AdventureLogStyles {
    //********FULL SCREEN DESKTOP********/
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
            appTitle: "'serif'",
            appFont: "'sans-serif'",
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
            fontSmallest: "calc(0.45rem + 0.35vw)",
            fontSmall: "calc(0.75rem + 0.35vw)",

            fontBody: "calc(1rem + 0.35vw)",
            
            fontSubheader1: "calc(1.25rem + 0.35vw)",
            fontSubheader2: "calc(1.5rem + 0.35vw)",
            fontHeader1: "calc(2rem + 0.35vw)",
            fontHeader2: "calc(2.25rem + .35vw)",
            fontHeader3: "calc(2.5rem + .35vw)",
            fontHeader4: "calc(2.75rem + .35vw)",
            fontHeader5: "calc(3rem + .35vw)",
        }

        let colorPalette =
        {
            color1:"#0f141c",//dark
            color2:"#ecd23a",//gold
            color3:"#fd5259",//red
            color4:"#31333c",//gray
            color5:"#1E90FF",//blue
            color6:"#4B0082",//purple
        }

        let appColors =
        {
            color1: colorPalette.color1,//dark
            color2:"#1B1D24", //dark lighter
            color3: colorPalette.color2,//gold
            color4:"#C1A71B",//gold dark
            color5: colorPalette.color3,//red
            color6:"#5F0C0C",//red dark
            color7: colorPalette.color4,//greys
            color8:"#919191",//graylighter
            color9: colorPalette.color5,//
            color10:"#0000CDaa",//
            color11: colorPalette.color6,//
            color12:"#8B008Baa",//
            color13:"#8B4513aa",//
            colorWhite:"#F4F5F8",
            colorBlack:colorPalette.color1,
            }

        let background = {
            backgroundColor: colorPalette.color1+"00",//dark
            backgroundBlend: "overlay",
        }

        
        let styles = {
            fonts:appFonts, colors:appColors, backgrounds:background,
            //TODO: Create or check all styles

            backgroundContent:{
                display: "flex", marginTop:"1vmin", flexDirection: 'column', borderRadius:"2vmin",
      justifyContent:"space-evenly", position:"relative",
      transition:"all 2s ease-in-out",
      width: '100%', height: 'fit-content',  zIndex:"20",
      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover",
            },

            smallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "55%"
            },

            smallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "75%"
            },

            smallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "83%"
            },

            bigCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            biggerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            biggestCardContentWithTab:
            {   padding: ".5rem 1rem",
            
                top: "50%",
                height: "85%"
            },

            tallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            tallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            tallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "91%"
            },

            cardContent:
            {   padding: ".5rem 1rem",
                height: "100%",
            },
           
            smallestCard:
            {   
                width: "15vw",
                height: "25vh",
                
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            // smallestCardBorderless:
            // {   width: "8.5vw",
            //     height: "15vh",
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },


            smallerCard:
            {   border: appBorders.borderThin,
                width: "19vw",
                height: "26.5vh",
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            // smallerCardBorderless:
            // {   width: "19vw",
            //     height: "26.5vh",
                 
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },

            smallCard:
            {   border: appBorders.borderThin,
                width: "29.5vw",
                height: "38vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            // smallCardBorderless:
            // {   width: "29.5vw",
            //     height: "38vh",
                 
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },


            bigCard:
            {   border: appBorders.borderThin,
                width: "40vw",
                height: "70.5vh",
                 

                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            // bigCardBorderless:
            // {   width: "40vw",
            //     height: "49.5vh",
                 
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },


            biggerCard:
            {   border: appBorders.borderThin,
                width: "50.5vw",
                height: "61vh", 
                  

                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            // biggerCardBorderless:
            // {   width: "50.5vw",
            //     height: "61vh",
                 
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },
            

            biggestCard:
            {   border: appBorders.borderThin,
                width: '80vw',
                height: "80.5vh",
                 
                                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                // boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            biggestCardBorderless:
            {   width: "100%",
                height: "100%",
                marginBottom: "2.75vh",
                userSelect: "none",
            },
            

            tallCard:
            {   border: appBorders.borderThin,
                width: "19vw",
                height: "50vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            // tallCardBorderless:
            // {   width: "19vw",
            //     height: "50vh",
                 
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },
            

            tallerCard:
            {   border: appBorders.borderThin,
                width: "19vw",
                height: "62vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            // tallerCardBorderless:
            // {   width: "19vw",
            //     height: "62vh",
                 
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },
            
            
            tallestCard:
            {   
                width: "fit-content",
                overflow:"auto",
                marginTop:"-3vh",
                
                minHeight: "100vh",
                height:"fit-content",
                marginLeft:"2vh",
                borderLeftStyle:"double",
                borderLeftColor:appColors.color4,
                background:appColors.color1,
               
                
                //border: ".1rem double " + appColors.color3,
                userSelect: "none"
            },
            // tallestCardBorderless:
            // {   width: "19vw",
            //     height: "75vh",
                 
                
            //     background: appColors.colorWhite,
            //     userSelect: "none",
            // },
            


            borderlessTab:
            {   width:"100%", 
                height:"fit-content", 
                fontSize: appFonts.fontSubheader2,
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem", marginTop:"3vmin"
            },
            colorTab:
            {   
                // border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: colorPalette.color1, 
                borderRadius:"15px 15px 0px 0px",
                padding: "1rem",
            },
            colorTab1:
            {   border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: appColors.color1, 
                borderRadius:"1.5rem 23px 0px 0px",
                padding: "1rem",
            },
            colorTab2:
            {   border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: appColors.color2, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab3:
            {   border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: appColors.color3, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab4:
            {   border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: appColors.color4, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab5:
            {   border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: appColors.color5, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab6:
            {   border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: appColors.color6, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab7:
            {   border: appBorders.borderThin,
                width:"100%", 
                height: "3rem", 
                background: appColors.color7, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab8:
            {   border: appBorders.borderThin,
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color8, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab9:
            {   border: appBorders.borderThin,
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color9, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab10:
            {   border: appBorders.borderThin,
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color10, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab11:
            {   border: appBorders.borderThin,
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color11, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab12:
            {   border: appBorders.borderThin,
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color12, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab13:
            {   border: appBorders.borderThin,
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color13, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTabWhite:
            {   
                width:"100%", 
                height: "50%", 
                background: appColors.colorWhite, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTabBlack:
            {   border: appBorders.borderThin,
                color: "#ffffff",
                width:"100%", 
                height:"3rem", 
                background: appColors.colorBlack, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
         
            popupLarge:
                            {
                                width: "fit-content",
                                height:"fit-content", 
                                maxHeight:"80vh", maxWidth:"70vw",
                               alignSelf:"center",
                                border: appBorders.borderThick,
                                background: appColors.color1,
                                borderRadius: "23px",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none"
                            },

            popupCreate:
                                    {     width: "70%",
                                    height: "75%",
                                    border: "3px solid #ffffff55",
                                    background: appColors.colorBlack,
                                    borderRadius: "23px",
                                    boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                    userSelect: "none",
                                    alignSelf: "center",
                                    justifySelf: "center"
                                },
            popupMedium:
            {
                width: "fit-content",
                height: "68vh",
                border: appBorders.borderThick,
                background: appColors.color1,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                opacity:"100%", 
                background: appColors.colorBlack+"75", 
                padding:"10px", 
                borderRadius:"2vmin", 
                // borderStyle:"solid", 
                // borderColor:appColors.color3+"22", 
                display:"flex", flexDirection:"column",
                border: "2px solid "+appColors.color9+"22",
            },
            popupSmallSolid:
            {
                opacity:"100%", 
                background: appColors.colorBlack+"f9", 
                padding:"10px", 
                borderRadius:"2vmin", 
                // borderStyle:"solid", 
                // borderColor:appColors.color3+"22", 
                display:"flex", flexDirection:"column",
                border: "2px solid "+appColors.color9+"22",
            },

            popupSmallest:
            {
                opacity:"100%", 
                height:"fit-content",
                width:"fit-content",
                backgroundColor: appColors.colorBlack+"ff", 
                color:appColors.colorWhite,
                padding:"10px", 
                borderRadius:"2vmin", 
                // borderStyle:"solid", 
                // borderColor:appColors.color3+"22", 
                display:"flex", flexDirection:"column",
                border: "2px solid "+appColors.color9+"22",
            },


            margins: {
                margin1w: "1vw",
                margin1h: "1vh",
            },

            buttons: {
                buttonClose:
                {   alignItems:"center", justifyContent:"center",
                    justifyItems:"center", justifySelf:"center",
                
                    display:"flex", 
                    fontFamily: appFonts.appFont,
                    width: "fit-content",
                    color: appColors.color5,
                    padding: "2px 6px",
                    cursor: "pointer",
                    fontSize: "1.4rem",
                    borderRadius: "50%",
                    verticalAlign: "center",
                    textAlign: "center",
                    
                    height: "fit-content",
                    background: appColors.color1+"44",
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
                    boxShadow:"0px 10px 6px -6px"+appColors.colorBlack,
                    cursor: "pointer",
                    borderRadius:"12px",
                    background: appColors.color7+"77",
                    border: "1px solid "+appColors.colorWhite+"44",
                    color: appColors.color3,
                    padding: "12px 45px",
                    width: "fit-content", height: "fit-content",
                    display: "flex",
                    transition: "all 0.3s",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration:"none"
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
                            fontSmallest: "calc(0.45rem + 0.35vw)",
                            fontSmall: "calc(0.75rem + 0.35vw)",

                            fontBody: "calc(1rem + 0.35vw)",
                            
                            fontSubheader1: "calc(1.25rem + 0.35vw)",
                            fontSubheader2: "calc(1.5rem + 0.35vw)",
                            fontHeader1: "calc(2rem + 0.35vw)",
                            fontHeader2: "calc(2.25rem + .35vw)",
                            fontHeader3: "calc(2.5rem + .35vw)",
                            fontHeader4: "calc(2.75rem + .35vw)",
                            fontHeader5: "calc(3rem + .35vw)",
                        }

                        let colorPalette =
                        {
                            color1:"#FF0000",//red
                            color2:"#FFA500",//orange
                            color3:"#FFFF00",//yellow
                            color4:"#3CB371",//green
                            color5:"#1E90FF",//blue
                            color6:"#4B0082",//purple
                        }

                        

                        let background = {
                            backgroundColor: colorPalette.color1,//dark
                            backgroundBlend: "overlay",
                        }

                        let appColors =
                        {
                            color1: colorPalette.color1,//red
                            color2:"#FF7F50",//red orange
                            color3: colorPalette.color2,//orange
                            color4:"#FFD700",//orange yellow
                            color5: colorPalette.color3,//yellow
                            color6:"#ADFF2F",//yellow green
                            color7: colorPalette.color4,//green
                            color8:"#008B8B",//green blue
                            color9: colorPalette.color5,//blue
                            color10:"#0000CD",//blue purple
                            color11: colorPalette.color6,//purple
                            color12:"#8B008B",//purple red
                            color13:"#8B4513",//brown
                            colorWhite:"#ffffff",
                            colorBlack:"#0d0a0b",


                        }


                        let styles = {
                            fonts:appFonts, colors:appColors, backgrounds:background, 
                            //TODO: Create or check all styles
                //CARD CONTENT
                backgroundContent:{
                    display: "flex", marginTop:"1vmin", flexDirection: 'column', borderRadius:"2vmin",
          justifyContent:"space-evenly", position:"relative",
          transition:"all 2s ease-in-out",
          width: '60%', height: 'fit-content',  zIndex:"20",
          backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover",
                },

                            smallestCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "55%"
                            },

                            smallerCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "75%"
                            },

                            smallCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "83%"
                            },

                            bigCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "87%"
                            },

                            biggerCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "89%"
                            },

                            biggestCardContentWithTab:
                            {   padding: ".5rem 1rem",
                            
                                top: "50%",
                                height: "85%"
                            },

                            tallCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "87%"
                            },

                            tallerCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "89%"
                            },

                            tallestCardContentWithTab:
                            {   padding: ".5rem 1rem",
                                top: "50%",
                                height: "91%"
                            },

                            cardContent:
                            {   padding: "5px",
                                height: "100%",
                            },

                //CARDS      
                            smallestCard:
                            {   
                                width: "20vw",
                                height: "15vh",
                                
                                
                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none",
                            },
                            smallestCardBorderless:
                            {   width: "8.5vw",
                                height: "15vh",
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },


                            smallerCard:
                            {   border: appBorders.borderThin,
                                width: "25vw",
                                height: "26.5vh",
                                
                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none",
                            },
                            smallerCardBorderless:
                            {   width: "19vw",
                                height: "26.5vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },


                            smallCard:
                            {   border: appBorders.borderThin,
                                width: "35vw",
                                height: "38vh",
                                
                                
                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none",
                            },
                            smallCardBorderless:
                            {   width: "29.5vw",
                                height: "38vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },


                            bigCard:
                            {   border: appBorders.borderThin,
                                width: "45vw",
                                height: "49.5vh",
                                                
                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none"
                            },
                            bigCardBorderless:
                            {   width: "40vw",
                                height: "49.5vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },


                            biggerCard:
                            {   border: appBorders.borderThin,
                                width: "55vw",
                                height: "61vh", 
                                

                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none"
                            },
                            biggerCardBorderless:
                            {   width: "50.5vw",
                                height: "61vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },
                            

                            biggestCard:
                            {   border: appBorders.borderThin,
                                width: '85vw',
                                height: "72.5vh",
                                
                                                
                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                // boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none"
                            },
                            biggestCardBorderless:
                            {   width: "61vw",
                                height: "72.5vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },
                            

                            tallCard:
                            {   border: appBorders.borderThin,
                                width: "19vw",
                                height: "50vh",
                                
                                
                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none"
                            },
                            tallCardBorderless:
                            {   width: "19vw",
                                height: "50vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },
                            

                            tallerCard:
                            {   border: appBorders.borderThin,
                                width: "19vw",
                                height: "62vh",
                                
                                
                                background: appColors.colorWhite,
                                borderRadius: "1.5rem",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none"
                            },
                            tallerCardBorderless:
                            {   width: "19vw",
                                height: "62vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },
                            
                            
                            tallestCard:
                            {   width: "19vw",
                            marginRight:"-3vw",
                            marginTop:"-3vh",
                            
                            minHeight: "100vh",
                            height:"fit-content",
                            marginLeft:"22px",
                            borderLeftStyle:"double",
                            borderLeftColor:appColors.color4,
                            background:appColors.color1,
                           
                            
                            //border: ".1rem double " + appColors.color3,
                            userSelect: "none"
                            },
                            tallestCardBorderless:
                            {   width: "19vw",
                                height: "75vh",
                                
                                
                                background: appColors.colorWhite,
                                userSelect: "none",
                            },
                            

                //TABS
                            borderlessTab:
                            {   width:"100%", 
                                height:"3rem", 
                                backgroundColor: appColors.color1, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },
                            colorTab:
                            {   border: appBorders.borderThin,
                                width:"100%", 
                                height: "3rem", 
                                background: colorPalette.color1, 
                                borderRadius:"1.5rem 23px 0px 0px",
                                padding: "1rem",
                            },
                            colorTab1:
                            {   border: appBorders.borderThin,
                                width:"100%", 
                                height: "3rem", 
                                background: appColors.color1, 
                                borderRadius:"1.5rem 23px 0px 0px",
                                padding: "1rem",
                            },
                            colorTab2:
                            {   border: appBorders.borderThin,
                                width:"100%", 
                                height: "3rem", 
                                background: appColors.color2, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },
                            colorTab3:
                            {   border: appBorders.borderThin,
                                width:"100%", 
                                height: "3rem", 
                                background: appColors.color3, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },
                            colorTab4:
                            {   border: appBorders.borderThin,
                                width:"100%", 
                                height: "3rem", 
                                background: appColors.color4, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },
                            colorTab5:
                            {   border: appBorders.borderThin,
                                width:"100%", 
                                height: "3rem", 
                                background: appColors.color5, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },
                            // colorTab6:
                            // {   border: appBorders.borderThin,
                            //     width:"100%", 
                            //     height: "3rem", 
                            //     background: appColors.color6, 
                            //     borderRadius:"1.5rem 1.5rem 0px 0px",
                            //     padding: "1rem"
                            // },
                            // colorTab7:
                            // {   border: appBorders.borderThin,
                            //     width:"100%", 
                            //     height: "3rem", 
                            //     background: appColors.color7, 
                            //     borderRadius:"1.5rem 1.5rem 0px 0px",
                            //     padding: "1rem"
                            // },
                            // colorTab8:
                            // {   border: appBorders.borderThin,
                            //     color: "#ffffff",
                            //     width:"100%", 
                            //     height: "3rem", 
                            //     background: appColors.color8, 
                            //     borderRadius:"1.5rem 1.5rem 0px 0px",
                            //     padding: "1rem"
                            // },
                            // colorTab9:
                            // {   border: appBorders.borderThin,
                            //     color: "#ffffff",
                            //     width:"100%", 
                            //     height: "3rem", 
                            //     background: appColors.color9, 
                            //     borderRadius:"1.5rem 1.5rem 0px 0px",
                            //     padding: "1rem"
                            // },
                            // colorTab10:
                            // {   border: appBorders.borderThin,
                            //     color: "#ffffff",
                            //     width:"100%", 
                            //     height: "3rem", 
                            //     background: appColors.color10, 
                            //     borderRadius:"1.5rem 1.5rem 0px 0px",
                            //     padding: "1rem"
                            // },
                            // colorTab11:
                            // {   border: appBorders.borderThin,
                            //     color: "#ffffff",
                            //     width:"100%", 
                            //     height: "3rem", 
                            //     background: appColors.color11, 
                            //     borderRadius:"1.5rem 1.5rem 0px 0px",
                            //     padding: "1rem"
                            // },
                            // colorTab12:
                            // {   border: appBorders.borderThin,
                            //     color: "#ffffff",
                            //     width:"100%", 
                            //     height: "3rem", 
                            //     background: appColors.color12, 
                            //     borderRadius:"1.5rem 1.5rem 0px 0px",
                            //     padding: "1rem"
                            // },
                            colorTab13:
                            {   border: appBorders.borderThin,
                                color: "#ffffff",
                                width:"100%", 
                                height: "3rem", 
                                background: appColors.color13, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },
                            colorTabWhite:
                            {   
                                width:"100%", 
                                height: "3rem", 
                                background: appColors.colorWhite, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },
                            colorTabBlack:
                            {   border: appBorders.borderThin,
                                color: "#ffffff",
                                width:"100%", 
                                height:"3rem", 
                                background: appColors.colorBlack, 
                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                padding: "1rem"
                            },

                        

                //POPUPS
                            popupLarge:
                            {
                                width: "fit-content",
                                height:"fit-content",
                                maxHeight:"80vh", maxWidth:"80vw",
                               alignSelf:"center",
                                border: appBorders.borderThick,
                                background: appColors.color1,
                                borderRadius: "23px",
                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                userSelect: "none"
                            },

                            popupCreate:
                                    {     width: "70%",
                                    height: "75%",
                                    border: "3px solid #ffffff55",
                                    background: appColors.colorBlack,
                                    borderRadius: "23px",
                                    boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                    userSelect: "none",
                                    alignSelf: "center",
                                    justifySelf: "center"
                                },
                            popupMedium:
            {
                width: "fit-content",
                height: "68vh",
                border: appBorders.borderThick,
                background: appColors.color1,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                opacity:"100%", 
                background: appColors.colorBlack+"75",
                padding:"10px", 
                borderRadius:"2vmin", 
                // borderStyle:"solid", 
                // borderColor:appColors.color3+"22", 
                display:"flex", flexDirection:"column",
                border: "2px solid "+appColors.color9+"22",
            },
            popupSmallSolid:
            {
                opacity:"100%", 
                background: appColors.colorBlack+"f9", 
                padding:"10px", 
                borderRadius:"2vmin", 
                // borderStyle:"solid", 
                // borderColor:appColors.color3+"22", 
                display:"flex", flexDirection:"column",
                border: "2px solid "+appColors.color9+"22",
            },

                            popupSmallest:
                                {
                                    opacity:"100%", 
                                    background: appColors.colorBlack+"99", 
                                    padding:"10px", 
                                    borderRadius:"2vmin", 
                                    // borderStyle:"solid", 
                                    // borderColor:appColors.color3+"22", 
                                    display:"flex", flexDirection:"column",
                                    border: "2px solid "+appColors.color9+"22",
                                },

                //MARGINS
                            margins: {
                                margin1w: "1vw",
                                margin1h: "1vh",
                            },
                //BUTTONS
                            buttons: {
                                buttonClose:
                                {   position:"absolute", right:"1vw",
                                    display:"flex",
                                    fontFamily: appFonts.appFont,
                                    width: "fit-content",
                                    color: appColors.color5,
                                    padding: "2px 6px",
                                    cursor: "pointer",
                                    fontSize: "1.4rem",
                                    borderRadius: "50%",
                                    verticalAlign: "center",
                                    textAlign: "center",
                                    alignItems: "center",
                                    height: "fit-content",
                                    background: appColors.color1+"44",
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
                                    boxShadow:"0px 10px 6px -6px"+appColors.colorBlack,
                                    cursor: "pointer",
                                    borderRadius:"12px",
                                    background: appColors.color7+"77",
                                    border: "1px solid "+appColors.colorWhite+"44",
                                    color: appColors.color3,
                                    padding: "12px 45px",
                                    width: "fit-content", height: "fit-content",
                                    display: "flex",
                                    transition: "all 0.3s",
                                    justifyContent: "center",
                                    alignItems: "center",
                                },

                            }
                        }

                        return styles;
                    }
                            resize2() {
                                

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
                                            fontSmallest: "calc(0.45rem + 0.35vw)",
                                            fontSmall: "calc(0.75rem + 0.35vw)",

                                            fontBody: "calc(1rem + 0.35vw)",
                                            
                                            fontSubheader1: "calc(1.25rem + 0.35vw)",
                                            fontSubheader2: "calc(1.5rem + 0.35vw)",
                                            fontHeader1: "calc(2rem + 0.35vw)",
                                            fontHeader2: "calc(2.25rem + .35vw)",
                                            fontHeader3: "calc(2.5rem + .35vw)",
                                            fontHeader4: "calc(2.75rem + .35vw)",
                                            fontHeader5: "calc(3rem + .35vw)",
                                        }

                                        let colorPalette =
                                        {
                                            color1:"#FF0000",//red
                                            color2:"#FFA500",//orange
                                            color3:"#FFFF00",//yellow
                                            color4:"#3CB371",//green
                                            color5:"#1E90FF",//blue
                                            color6:"#4B0082",//purple
                                        }

                                        
                                        let background = {
                                            backgroundColor: colorPalette.color1,//dark
                                            backgroundBlend: "overlay",
                                        }

                                        let appColors =
                                        {
                                            color1: colorPalette.color1,//red
                                            color2:"#FF7F50",//red orange
                                            color3: colorPalette.color2,//orange
                                            color4:"#FFD700",//orange yellow
                                            color5: colorPalette.color3,//yellow
                                            color6:"#ADFF2F",//yellow green
                                            color7: colorPalette.color4,//green
                                            color8:"#008B8B",//green blue
                                            color9: colorPalette.color5,//blue
                                            color10:"#0000CD",//blue purple
                                            color11: colorPalette.color6,//purple
                                            color12:"#8B008B",//purple red
                                            color13:"#8B4513",//brown
                                            colorWhite:"#ffffff",
                                            colorBlack:"#0d0a0b",


                                        }


                                        let styles = {
                                            fonts:appFonts, colors:appColors, backgrounds:background,
                                            //TODO: Create or check all styles

                                            backgroundContent:{
                                                display: "flex", marginTop:"1vmin", flexDirection: 'column', borderRadius:"2vmin",
                                      justifyContent:"space-evenly", position:"relative",
                                      transition:"all 2s ease-in-out",
                                      width: '45%', height: 'fit-content',  zIndex:"20",
                                      backgroundRepeat: "no-repeat",  backgroundPosition: "50% 50%",  backgroundSize:"cover",
                                            },
                                            
                                            smallestCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "55%"
                                            },

                                            smallerCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "75%"
                                            },

                                            smallCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "83%"
                                            },

                                            bigCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "87%"
                                            },

                                            biggerCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "89%"
                                            },

                                            biggestCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                            
                                                top: "50%",
                                                height: "85%"
                                            },

                                            tallCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "87%"
                                            },

                                            tallerCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "89%"
                                            },

                                            tallestCardContentWithTab:
                                            {   padding: ".5rem 1rem",
                                                top: "50%",
                                                height: "91%"
                                            },

                                            cardContent:
                                            {   padding: "5px",
                                                height: "100%",
                                            },
                                        
                                            smallestCard:
                                            {  
                                                
                                                
                                                width: "70vw",
                                                height: "15vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none",
                                            },
                                            smallestCardBorderless:
                                            {   width: "20vw",
                                                height: "15vh",
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },


                                            smallerCard:
                                            {   border: appBorders.borderThin,
                                                width: "32vw",
                                                height: "26.5vh",
                                                
                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none",
                                            },
                                            smallerCardBorderless:
                                            {   width: "32vw",
                                                height: "26.5vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },


                                            smallCard:
                                            {   border: appBorders.borderThin,
                                                width: "44vw",
                                                height: "38vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none",
                                            },
                                            smallCardBorderless:
                                            {   width: "44vw",
                                                height: "38vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },


                                            bigCard:
                                            {   border: appBorders.borderThin,
                                                width: "56vw",
                                                height: "49.5vh",
                                                

                                                
                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none"
                                            },
                                            bigCardBorderless:
                                            {   width: "56vw",
                                                height: "49.5vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },


                                            biggerCard:
                                            {   border: appBorders.borderThin,
                                                width: "68vw",
                                                height: "61vh", 
                                                

                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none"
                                            },
                                            biggerCardBorderless:
                                            {   width: "68vw",
                                                height: "61vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },
                                            

                                            biggestCard:
                                            {   border: appBorders.borderThin,
                                                width: '95vw',
                                                height: "80.5vh",
                                                
                                                                
                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                // boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none"
                                            },
                                            biggestCardBorderless:
                                            {   width: "80vw",
                                                height: "72.5vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },
                                            

                                            tallCard:
                                            {   border: appBorders.borderThin,
                                                width: "32vw",
                                                height: "50vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none"
                                            },
                                            tallCardBorderless:
                                            {   width: "32vw",
                                                height: "50vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },
                                            

                                            tallerCard:
                                            {   border: appBorders.borderThin,
                                                width: "32vw",
                                                height: "62vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                borderRadius: "1.5rem",
                                                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                                userSelect: "none"
                                            },
                                            tallerCardBorderless:
                                            {   width: "32vw",
                                                height: "62vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },
                                            
                                            
                                            tallestCard:
                                            {   width: "19vw",
                                            marginRight:"-3vw",
                                            marginTop:"-3vh",
                                            
                                            minHeight: "100vh",
                                            height:"fit-content",
                                            marginLeft:"22px",
                                            borderLeftStyle:"double",
                                            borderLeftColor:appColors.color4,
                                            background:appColors.color1,
                                           
                                            
                                            //border: ".1rem double " + appColors.color3,
                                            userSelect: "none"
                                            },
                                            tallestCardBorderless:
                                            {   width: "32vw",
                                                height: "75vh",
                                                
                                                
                                                background: appColors.colorWhite,
                                                userSelect: "none",
                                            },
                                            


                                            borderlessTab:
                                            {   width:"100%", 
                                                height:"3rem", 
                                                background: appColors.color1, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: colorPalette.color1, 
                                                borderRadius:"1.5rem 23px 0px 0px",
                                                padding: "1rem",
                                            },
                                            colorTab1:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color1, 
                                                borderRadius:"1.5rem 23px 0px 0px",
                                                padding: "1rem",
                                            },
                                            colorTab2:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color2, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab3:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color3, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab4:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color4, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab5:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color5, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab6:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color6, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab7:
                                            {   border: appBorders.borderThin,
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color7, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab8:
                                            {   border: appBorders.borderThin,
                                                color: "#ffffff",
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color8, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab9:
                                            {   border: appBorders.borderThin,
                                                color: "#ffffff",
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color9, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab10:
                                            {   border: appBorders.borderThin,
                                                color: "#ffffff",
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color10, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab11:
                                            {   border: appBorders.borderThin,
                                                color: "#ffffff",
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color11, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab12:
                                            {   border: appBorders.borderThin,
                                                color: "#ffffff",
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color12, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTab13:
                                            {   border: appBorders.borderThin,
                                                color: "#ffffff",
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.color13, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTabWhite:
                                            {   
                                                width:"100%", 
                                                height: "3rem", 
                                                background: appColors.colorWhite, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },
                                            colorTabBlack:
                                            {   border: appBorders.borderThin,
                                                color: "#ffffff",
                                                width:"100%", 
                                                height:"3rem", 
                                                background: appColors.colorBlack, 
                                                borderRadius:"1.5rem 1.5rem 0px 0px",
                                                padding: "1rem"
                                            },

                                            popupCreate:
                                            {     width: "70%",
                                            height: "75%",
                                            border: "3px solid #ffffff55",
                                            background: appColors.colorBlack,
                                            borderRadius: "23px",
                                            boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                            userSelect: "none",
                                            alignSelf: "center",
                                            justifySelf: "center"
                                        },
                                        popupLarge:
                                        {
                                            width: "fit-content",
                                            height:"fit-content",
                                            maxHeight:"80vh", maxWidth:"80vw",
                                           alignSelf:"center",
                                            border: appBorders.borderThick,
                                            background: appColors.color1,
                                            borderRadius: "23px",
                                            boxShadow: "2px 3px 6px" + appColors.colorBlack,
                                            userSelect: "none"
                                        },
                                            popupMedium:
            {
                width: "fit-content",
                height: "68vh",
                border: appBorders.borderThick,
                background: appColors.color1,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                opacity:"100%", 
                background: appColors.colorBlack+"75",
                padding:"10px", 
                borderRadius:"2vmin", 
                // borderStyle:"solid", 
                // borderColor:appColors.color3+"22", 
                display:"flex", flexDirection:"column",
                border: "2px solid "+appColors.color9+"22",
            },

            popupSmallSolid:
            {
                opacity:"100%", 
                background: appColors.colorBlack+"f9", 
                padding:"10px", 
                borderRadius:"2vmin", 
                // borderStyle:"solid", 
                // borderColor:appColors.color3+"22", 
                display:"flex", flexDirection:"column",
                border: "2px solid "+appColors.color9+"22",
            },

                                            popupSmallest:
                                                {
                                                    opacity:"100%", 
                                                    background: appColors.colorBlack+"99", 
                                                    padding:"10px", 
                                                    borderRadius:"2vmin", 
                                                    // borderStyle:"solid", 
                                                    // borderColor:appColors.color3+"22", 
                                                    display:"flex", flexDirection:"column",
                                                    border: "2px solid "+appColors.color9+"22",
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
                                                    boxShadow:"0px 10px 6px -6px"+appColors.colorBlack,
                                                    cursor: "pointer",
                                                    borderRadius:"12px",
                                                    background: appColors.color7+"77",
                                                    border: "1px solid "+appColors.colorWhite+"44",
                                                    color: appColors.color3,
                                                    padding: "12px 45px",
                                                    width: "fit-content", height: "fit-content",
                                                    display: "flex",
                                                    transition: "all 0.3s",
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
                    // if(window.innerWidth<600){
                    //     objkey=this.resize2();
                    // }
                    //    else if(window.innerWidth<1000){
                    //        objkey = this.resize1();
                    //    }
                     return objkey;
                    }

}
export default new AdventureLogStyles();


