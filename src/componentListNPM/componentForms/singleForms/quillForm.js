import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './snowDark.css';
import toolService from '../../../services/toolService';
import idService from '../../idService';
import loreIndexService from '../../../services/loreIndexService';
import auth from '../../../services/auth';
import spellcheckSrc from '../../../pics/spellcheck.svg';
import Quill from 'quill';

// const icons = Quill.import('ui/icons');

// icons['spellcheck'] = `<div style="margin-left:22px; display: flex; flex-direction:row; justify-content:flex-end; "> <img className="ql-spellcheck" src="${spellcheckSrc}" title="Turn on Spellcheck (Refresh the page to turn it off)" style="width: 21px; height: 21px; border-radius:4px; background-color: #AA4A4422;"/> </div>`;


export default class QuillForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loreList: [],
      loreNames: [],
      spellCheckEnabled: "false",
    }
    this.quillRef = React.createRef();
    this.setLoreLink = this.setLoreLink.bind(this);
    this.ensureProtocol = this.ensureProtocol.bind(this);
    this.newLoreLink = this.newLoreLink.bind(this);
    this.updateCampaignLinks = this.updateCampaignLinks.bind(this);
    this.toggleSpellCheck = this.toggleSpellCheck.bind(this);
    this.updateSpellCheckButtonState = this.updateSpellCheckButtonState.bind(this);
  }

  async updateCampaignLinks(text) {
    let app = this.props.app;
    let state = app.state;
    let componentList = state.componentList;
    let campaignId = await toolService.getIdFromURL(true, 0);
    // Define the regular expression pattern to find links containing "/campaign/"
    var pattern = /<a\s+(?:[^>]*?\s+)?href="\/campaign\/([^"]*)"(?:[^>]*?\s+)?(?:target="_self")?/g;

    // Use String.prototype.replace() to find and replace links
    var updatedText = await text.replace(pattern, function (match, p1) {

      // Extract the number from the URL
      var number;
      let id = p1.split("-")[1];
      console.log(p1);
      console.log(id);
      console.log(componentList.getList("lore", campaignId, "campaignId"));
      let obj = componentList.getComponent("lore", id, "ogRef");
      console.log(obj);
      number = obj.getJson()._id;

      // Perform additional operations with the extracted number if needed

      // Return the updated link
      return '<a href="/campaign/' + campaignId + '-' + number + '"';
    });

    return updatedText;
  }


  async componentDidMount() {
    let obj = this.props?.obj[0];

    if (this.props.value) {

      let val = this.props.value;
      if (obj?.getJson().ogRef !== "" && obj?.getJson().ogRef !== undefined && obj?.getJson().type === "lore") {
        if (!obj?.getJson().linksUpdated) {
          val = await this.updateCampaignLinks(val);
          obj.setCompState({ linksUpdated: true });

        }

      }
      console.log(val);


      this.setState({ value: val });
    }

    let app = this.props?.app;
    let state = await app?.state;
    let dispatch = app.dispatch;
    let compList = await state.componentList;

    const editor = this.quillRef.current && this.quillRef.current.getEditor();
    if (editor) {
      // Set initial spellcheck state
      editor.root.setAttribute('spellcheck', this.state.spellCheckEnabled);
    } else {
      console.error("Quill editor reference not initialized.");
    }
    if (editor && editor.root) {
      editor.root.setAttribute('spellcheck', this.state.spellCheckEnabled ? "true" : "false");
    }

    if (!app.loreNames) {
      let lores = await compList.getList("lore", toolService.getIdFromURL(true, 0), "campaignId");
      this.setState({ loreList: lores }, () => {
        // Extract names from loreList and update state with new array of names
        const loreNames = this.state.loreList.map(lore => lore.getJson().name);
        dispatch({ loreNames: loreNames }, () => {
          console.log(state.loreNames); // Optionally log the new loreNames array
        });

        // Existing paste event listener logic
        const editor = this.quillRef.current.getEditor();
        editor.root.addEventListener('paste', (e) => {

          const clipboardData = e.clipboardData || window.clipboardData;
          const items = clipboardData.items;

          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') === 0) {
              // e.preventDefault();
              // return;
            }
          }
        });
      });
    } else {

      const editor = this.quillRef.current.getEditor();
      editor.root.addEventListener('paste', (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const items = clipboardData.items;

        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') === 0) {
            e.preventDefault();
            return;
          }
        }
      });
    };


    
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.value) {
      if (this.props.value !== prevProps.value) {
        this.setState({ value: this.props.value })

      }
    }

    if (prevState.spellCheckEnabled !== this.state.spellCheckEnabled) {
      const editor = this.quillRef.current.getEditor();
      editor.root.setAttribute('spellcheck', this.state.spellCheckEnabled ? "true" : "false");
    }
  }


  ensureProtocol(url) {

    if (!/^(?:f|ht)tps?\:\/\//.test(url) && !/^mailto\:/i.test(url)) {

      return `http://${url}`;

    }

    return url;

  }


  async setLoreLink(loreName) {
    let id = toolService.getIdFromURL(true, 0);
    let lore = await this.props.app.state.componentList.getComponent("lore", loreName, "name");
    let newid = await lore.getJson()._id;
    if (this.props.connectLore) {
      const loreLink = `/campaign/` + id + '-' + newid;
      return `<a href="${loreLink}" target="_self">${loreName}</a>`;
    } else {
      console.log(id);
      return loreName;
    }
  }



  async newLoreLink(loreName) {

    let state = this.props.app?.state;
    let campId = toolService.getIdFromURL(true, 0);
    let componentList = this.props.app.state.componentList;
    let idS = idService.createId();
    let id = toolService.getIdFromURL(true, state.currentLore !== undefined ? 1 : 0);
    const newName = this.props.app.state.currentLore ? this.props.app.state.currentLore.getJson().name : "";

    let otherChildren = componentList.getList("lore", id, "parentId");

    await state.opps.cleanJsonPrepare({
      addlore: {
        parentId: { [id]: newName + " " }, _id: idS, index: 0,
        type: "lore", name: loreName, campaignId: campId
      }
    });

    let l = state.opps.getUpdater("add")[0];
    await state.opps.run();
    await loreIndexService.insertAtBeginning(l, otherChildren);

    // Wait for any needed state updates or asynchronous operations before continuing
    await new Promise(resolve => setTimeout(resolve, 10));

    // Now that newLoreLink has completed, you can generate the link
    return this.setLoreLink(loreName);
  }
  // Helper function to convert base64 to Blob
  base64ToBlob = (base64) => {
    const byteString = atob(base64.split(',')[1]); // Decode base64
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  async handleChange(value) {
    if (this.props.checkUser) {
      if (this.props.app.state.user.getJson().role !== "GM") {
        return
      }
    }
    debugger
    const imgTagRegex = /<img[^>]+src="([^">]+)"/g;
    let matches1;

    // 2. Process all matches of base64 images
    while ((matches1 = imgTagRegex.exec(value)) !== null) {
      const base64Url = matches1[1];

      if (base64Url.startsWith("data:image/")) {
        const blob = await this.base64ToBlob(base64Url);
        // Save base64 URL in a variable
        const imageFileName = `images/${Date.now()}.png`; // Generate a unique file name

        // 3. Upload the base64 URL to Firebase Storage
        await auth.uploadPicsWithoutCompression(blob, imageFileName);
        let firebaseUrl = await auth.downloadPics(imageFileName);
        // Replace the base64 URL with Firebase Storage URL
        value = value.replace(base64Url, firebaseUrl);


      }
    }

    const editor = this.quillRef.current.getEditor();
  let names = this.props.app.state.loreNames;
  const linkPattern = /\[\[(.*?)\]\]/g;
  let match;
  const text = editor.getText();
  
  while ((match = linkPattern.exec(text)) !== null) {
    const matchedText = match[0];
    const loreName = match[1];
    const startIndex = match.index;
    const endIndex = startIndex + matchedText.length;
    let replacementText;
    let formats = {};

    if (names && names.includes(loreName)) {
      const loreLink = await this.setLoreLink(loreName);
      // Insert the link using Quill's insertText with a link format
      editor.deleteText(startIndex, matchedText.length);
      editor.insertText(startIndex, loreName, { link: loreLink });
    } else {
      // Handle new lore link creation
      const loreLink = await this.newLoreLink(loreName);
      editor.deleteText(startIndex, matchedText.length);
      editor.insertText(startIndex, loreName, { link: loreLink });
    }
  }

  // Update state value
  this.setState({ value });

  if (this.props.handleChange) {
    this.props.handleChange(value);
  }
  };

  toggleSpellCheck() {
  if (this.quillRef && this.quillRef.current) {
    const editor = this.quillRef.current.getEditor();
    const spellCheckState = !this.state.spellCheckEnabled;

    // Toggle spellcheck attribute using boolean
    editor.root.setAttribute('spellcheck', spellCheckState);

    // Update state and button state
    this.setState({ spellCheckEnabled: spellCheckState }, this.updateSpellCheckButtonState);
  } else {
    console.error("Quill Editor reference not available.");
  }
}

  updateSpellCheckButtonState() {
    const spellCheckButton = document.querySelector('.ql-spellcheck');
    if (spellCheckButton) {
      if (this.state.spellCheckEnabled) {
        spellCheckButton.classList.add('ql-active');
      } else {
        spellCheckButton.classList.remove('ql-active');
      }
    }
  }


  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [
          {
            color: [
              "#fafafb", "#CECED3", "#7E8999", "#050505", //greys
              "#D7D7F0", "#caeae8", "#a0b4d4", //mute blues
              "#FFF2A6", "#FFE966", "#ecd443", //yellows
              "#879d38", "#CDFFC3", "#a8ffa9", "#a8ffa975", //greens
              "#F9A595", "#fd5c62", "#fd5c6288", "#ff7452", "#ffbd7e", "#9e7064", "#f7cdc3", //red brown
              "#dbb4f7", "#90649e", "#dbb4f788", "#dbb4f755",
              "#ae28e9", "#7dd7e7", "#1fb0e6"
            ],
          },
          {
            background: [false, "#05050555", "#00274D55", "#C1A71B55", "#70160975", "#4B008222", "#002E0722", "#ffdead22", "#05050522", "#00274D22", "#C1A71B22", "#70160944", "#4B008244", "#002E0722"],
          },
        ],
        ['code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['image'],
        ['clean'],
        // ['spellcheck'], // Add spellcheck icon to the toolbar
      ],
      handlers: {
        'spellcheck': this.toggleSpellCheck, // Spellcheck toggle handler
      },
    },
  };

  formats = [
    // ... your existing formats
    'bold', 'italic', 'underline', 'blockquote',
    'color', 'background',
    'code-block',
    'list', 'bullet', 'align',
    'indent', 'link',
    'size',
    'image',
    'clean',
    'spellcheck', // Include spellcheck in formats
  ];

  render() {
    let obj = this.props?.obj;
    let app = this.props?.app;
    let dispatch = app.dispatch
    let state = app?.state;
    let styles = state?.styles;

    return (


      <div onClick={() => {
        if (this.props.checkUser) {
          if (state.user.getJson().role !== "GM") {
            dispatch({ popupSwitch: "goPremium" });
            return
          }
        }

      }}
      // title='Use [[ ]] around a Lore title to connect it'
      >

        <ReactQuill
          ref={this.quillRef}
          modules={this.modules}
          formats={{ ...this.formats }}
          style={this.props.wrapperStyle ? { ...this.props.wrapperStyle } : { minHeight: "100%", padding: "8px", minWidth: "99%", width: "100%", }}
          theme="snow"
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}