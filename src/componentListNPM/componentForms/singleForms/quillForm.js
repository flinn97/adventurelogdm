import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './snowDark.css';
import toolService from '../../../services/toolService';
import idService from '../../idService';


export default class QuillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loreList: [],
      loreNames: [],
    }
    this.quillRef = React.createRef();
    this.setLoreLink = this.setLoreLink.bind(this);
    this.ensureProtocol = this.ensureProtocol.bind(this);
    // this.newLoreLink = this.newLoreLink.bind(this);
  }



  async componentDidMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }

    let obj = this.props?.obj;
    let app = this.props?.app;
    let state = await app?.state;
    let dispatch = app.dispatch;
    let compList = await state.componentList;

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
              e.preventDefault();
              return;
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

  componentDidUpdate(props, state) {
    if (this.props.value) {
      if (this.props.value !== props.value) {
        this.setState({ value: this.props.value })

      }
    }
  }

  ensureProtocol(url) {
    // Check if the URL does not contain a period
    if (!url.includes('.')) {
      // If there's no period, log a message or handle as needed and end the process
      console.log("URL does not contain a period and will not be processed.");
      return null; // Return null or an appropriate value indicating no URL should be processed
    }
  
    // Check for the presence of http://, https://, or mailto: at the beginning of the URL
    if (!/^(?:f|ht)tps?\:\/\//.test(url) && !/^mailto\:/i.test(url)) {
      return `http://${url}`; // Prepend http:// if none of those are present
    }
    
    return url; // Return the original or modified URL
  }
  

  setLoreLink(loreName) {
    let id = toolService.getIdFromURL(true, 0);
    let lore = this.props.app.state.componentList.getComponent("lore", loreName, "name");
    let newid = lore.getJson()._id;
    const loreLink = `/campaign/` + id + '-' + newid;
    return `<a href="${loreLink}" target="_blank">${loreName}</a>`;
  }

  // async newLoreLink(loreName) {
  //   debugger
    
  //   let loreId = await idService.createId();

  //   let obj = this.props?.obj;
  //   let app = this.props?.app;
  //   let state = app?.state;

  //   let campId = toolService.getIdFromURL(true, 0);
  //   let newId = toolService.getIdFromURL(true, 1);

  //   let name = state.currentLore ? state.currentLore.getJson().name : "Unnamed";

  //   let json = {
  //     name: loreName,
  //     type: "lore",
  //     _id: loreId,
  //     campaignId: campId,
  //     index: 0,
  //     parentId: { [newId]: name }
  //   };

  //   await state.opps.cleanJsonPrepareRun({ "addlore": json });

  //   const loreLink = `/campaign/${campId}-${loreId}`;
  //   return `<a href="${loreLink}" target="_blank">${loreName}</a>`;
  // }

  handleChange(value) {
    let names = this.props.app.state.loreNames;
    const linkPattern = /\[\[(.*?)\]\]/g;
    let modifiedValue = value;

    modifiedValue = modifiedValue.replace(linkPattern, (match, text) => {
      if (names && names.includes(text)) {
        // The text matches a lore name, so use setLoreLink
        return this.setLoreLink(text);
      } else {
        // Attempt to ensure the protocol, in case text is a URL
        const ensuredUrl = this.ensureProtocol(text);
        if (ensuredUrl) {
          // ensureProtocol returned a URL, so create a link
          return `<a href="${ensuredUrl}" target="_blank">${text}</a>`;
        } else {
          // ensureProtocol returned null, indicating this isn't a proper URL to process
          
          return text; // Just return the text without making it a link
        }
      }
    });

    // Update the state and the editor's content as before
    if (modifiedValue !== value) {
      this.setState({ value: modifiedValue }, () => {
        const editor = this.quillRef.current.getEditor();
        // Use clipboard API to update content safely, consider alternatives for better control and safety
        editor.clipboard.dangerouslyPasteHTML(modifiedValue);
      });
    } else {
      this.setState({ value });
    }

    // Call the original handleChange prop, if provided
    if (this.props.handleChange) {
      this.props.handleChange(modifiedValue);
    }
  };


  render() {
    let obj = this.props?.obj;
    let app = this.props?.app;
    let state = app?.state;
    let styles = state?.styles;


    return (


      <div title='Use [[ ]] around a Lore title to connect it' >

        <ReactQuill
          ref={this.quillRef}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline',
                // 'strike', 
                'blockquote'
              ], [{
                'color': ["#F4F5F8", "#E6FFFD", "#99AFD1", "#ecd23a", "#fd5259", "#D7ABF7", "#9EFFA0",
                  "#F4F5F888", "#E6FFFD77", "#99AFD188", "#ecd23a88", "#fd525988", "#D7ABF788", "#9EFFA088",
                  "#000000", "#E6FFFD44", "#99AFD155", "#ecd23a55", "#fd525955", "#D7ABF755", "#9EFFA055"]
              }, { 'background': [false, "black", "#00274D", "#C1A71B", "#5F0C0C", "#4B0082", "#002E07"] },],
              [, 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],                        // text direction
              // [{ 'header': [false, 1, 2, 3] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],


              // [],['link'], // Link insertion
              [], ['clean']
              // remove formatting button
            ]
          }}

          style={this.props.wrapperStyle ?
            { ...this.props.wrapperStyle } : { minHeight: "100%", padding: "8px", minWidth: "99%", width: "100%", }
          } theme="snow" value={this.state.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}