

class ExpandingTree {


  getMapTheme() {

    let style = {
      containerStyle: {
        default: {
          display: 'flex',
          flexDirection: "column",
          backgroundColor: "#ffdead01",
          width: "100%", // Use 100% width to fill parent container
          
          height: "fit-content",
          minWidth:"480px",
          transition:"all",
          alignItems: "flex-start", // Align items to the start (left)
          flexWrap: "wrap",
          // Remove redundant flexDirection
          alignContent: "flex-start", // Align content to start
          justifyItems: "flex-start",
        },
        row: { display: 'flex', flexDirection: "row", },
        wrapRow: { display: 'flex', flexDirection: "row", flexWrap: "wrap" },
        wrapColumn: { display: 'flex', flexDirection: "column", flexWrap: "wrap" },
        small: { display: 'flex', flexDirection: "column", flexWrap: "wrap" },
      },

      iContainerStyle: {
        default: { display: 'flex', flexDirection: "column", alignItems: "center", },
        row: { display: 'flex', flexDirection: "row" },
        wrapRow: { display: 'flex', flexDirection: "row", flexWrap: "wrap" },
        wrapColumn: { display: 'flex', flexDirection: "column", flexWrap: "wrap" },
      },

      sectionStyle: {
        default: {
          display: 'flex', flexDirection: "column",  alignItems: "flex-start", height: "fit-content", marginBottom: "2px",
          border: "solid 1px #C1A71B55", 
          alignContent: "center", justifyItems: "center",
          borderRadius: "4px", width: "100%", borderRightStyle: "",
          borderLeftStyle: "solid 1px #C1A71B55", borderRightStyle: "solid 1px #C1A71B55",
          mixBlendMode: "",

        },
        row: { display: 'flex', flexDirection: "row" },
        column: { display: 'flex', flexDirection: "column" },
        wrapRow: { display: 'flex', flexDirection: "row", flexWrap: "wrap" },
        wrapColumn: { display: 'flex', flexDirection: "column", flexWrap: "wrap" },

      },
      iSectionStyle: {
        default: {
          display: 'flex', flexDirection: "column", alignContent: "center", justifyItems: "center",
        },
        row: { display: 'flex', flexDirection: "row" },
        column: { display: 'flex', flexDirection: "column", },
        wrapRow: { display: 'flex', flexDirection: "row", flexWrap: "wrap" },
        wrapColumn: { display: 'flex', flexDirection: "column", flexWrap: "wrap" },

      },
      //this should be the rest
      cellStyle: {
        default: {
          display: 'flex', flexDirection: "row", alignItems: "center",
          alignContent: "center", justifyItems: "center",
        },
      },



      delstyle: {
        default: { color: "red", display: "flex", justifyContent: "center", alignItems: "center", },
      },

      linkStyle: {
        default: { display: "flex", justifyContent: "center", alignItems: "center", },
      },

      editstyle: {
        default: { display: "flex", justifyContent: "center", alignItems: "center", },
      },

      individualCell: {
        default: { display: "flex", width: "100%", alignContent: "center", },
        bold: { fontWeight: "700" },
      },
      //THIS IS the Title I think
      innerCellStyle: {
        default: {
          display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", marginBottom: "2px",
          width: "fit-content", alignContent: "center", fontSize: ".5rem"
        },
        boldFont: { fontWeight: "500" },
      },
      iCellStyle: {
        default: { display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", },
      },

      imgStyle: {
        default: { width: '60px', height: "60px", borderRadius: "50%", }
      },

    }
    return style
  }


}
export default new ExpandingTree();


