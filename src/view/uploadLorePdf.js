// PdfUploader.js
import React, { Component } from 'react';
import auth from '../services/auth';
import loreIndexService from '../services/loreIndexService';
import toolService from '../services/toolService';

class PdfUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      progress: 0,
      error: '',
      url: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  async handleChange(e) {
    if (e.target.files[0]) {
      await this.setState({ file: e.target.files[0] });
    }
    this.handleUpload();
  }

  async handleUpload() {
    debugger
    let app = this.props.app;
    let state = app.state;
    let opps = state.opps;
    let currentCampaign = state.currentCampaign;
    let currentLore = state.currentLore;
    let componentList = state.componentList
    const { file } = this.state;
    if (file) {
      var fileOfBlob = new File([file], file.name, { type: file.type });
      let path = "pdf/" + fileOfBlob.name;
      await auth.uploadPicsWithoutCompression(fileOfBlob, path);
      let pdf = await auth.downloadPics(path);

      await opps.cleanJsonPrepare({
        addlore: {
          type: "lore",
          campaignId: currentCampaign.getJson()._id,
          name: file.name,
          index: 0,
          parentId: { [currentLore ? currentLore.getJson()._id : currentCampaign.getJson()._id]: file.name }
        }
      });
      let l = await opps.getUpdater("add")[0];
      await l.setCompState({ pdfURL: pdf });
      await opps.run();
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      let id = toolService.getIdFromURL(true, state.currentLore !== undefined ? 1 : 0);
      let otherChildren = componentList.getList("lore", id, "parentId");

      await loreIndexService.insertAtBeginning(l, otherChildren)


    }
  }

  render() {
    const { progress, error, url } = this.state;
    let app = this.props.app;
    let state = app.state;
    let dispatch = app.dispatch;
    let styles = state.styles;

    const styled = this.props.buttonStyle;
    const unStyled = {
      ...styles.buttons.buttonAdd,
      display: "inline-block", height: "fit-content",
      maxWidth: "fit-content", cursor: "pointer",
      marginRight: "1rem", position: "relative",
      fontSize: styles.fonts.fontSmall
    };

    let style = this.props.buttonStyle ? styled : unStyled;

    return (
      <div>
        <div style={{
          color: styles.colors.colorWhite + "99", maxHeight: "30px", paddingTop:"3px", minWidth: "38px", 
          borderRadius: "11px", width: "82px", backgroundColor: "", 
        }}>


          <label for="file-upload" style={{color:styles.colors.color3, fontWeight:"200", fontSize: "21px",}}>
            + PDF
            <input type="file" accept="application/pdf" onChange={this.handleChange} style={{
              ...styles.buttons.buttonAdd,
              top: 0, backgroundColor: "",
              left: 0,
              cursor: "pointer",
              opacity: 0,
            }} />

            {/* <button onClick={this.handleUpload}>Upload</button> */}

            <br />
            {progress > 0 && <progress value={progress} max="100" />}
            {error && <p>{error}</p>}
            {url && <p>File available at: <a href={url} target="_blank" rel="noopener noreferrer">here</a></p>}

          </label>
        </div>
      </div>
    );
  }
}

export default PdfUploader;