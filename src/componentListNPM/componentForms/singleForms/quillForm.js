import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './snowDark.css';
import toolService from '../../../services/toolService';
import idService from '../../idService';
import loreIndexService from '../../../services/loreIndexService';


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
    this.newLoreLink = this.newLoreLink.bind(this);
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

    if (!/^(?:f|ht)tps?\:\/\//.test(url) && !/^mailto\:/i.test(url)) {
  
      return `http://${url}`;
  
    }
  
    return url;
  
  }


  async setLoreLink(loreName) {
    let id = toolService.getIdFromURL(true, 0);
    let lore = await this.props.app.state.componentList.getComponent("lore", loreName, "name");
    let newid = await lore.getJson()._id;
 if (this.props.connectLore){
    const loreLink = `/campaign/` + id + '-' + newid;
    return `<a href="${loreLink}" >${loreName}</a>`;
  }else{
    console.log(id)
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


  async handleChange(value) {
    let names = this.props.app.state.loreNames;
    const linkPattern = /\[\[(.*?)\]\]/g;
    let matches = [...value.matchAll(linkPattern)];
    let modifiedValue = value;

    for (const match of matches) {
        const text = match[1];
        let replacementText;
        if (names && names.includes(text)) {
            replacementText = await this.setLoreLink(text);
        } else if (toolService.isLikelyUrl(text)) {
            const ensuredUrl = this.ensureProtocol(text);
            if (ensuredUrl) {
                replacementText = `<a href="${ensuredUrl}" target="_blank">${text}</a>`;
            } else {
                replacementText = await this.newLoreLink(text);
            }
        } else {
            replacementText = await this.newLoreLink(text);;
        }
        modifiedValue = modifiedValue.replace(match[0], replacementText);
    }

    if (modifiedValue !== value) {
        this.setState({ value: modifiedValue }, () => {
            const editor = this.quillRef.current.getEditor();
            editor.clipboard.dangerouslyPasteHTML(modifiedValue);
        });
    } else {
        this.setState({ value });
    }

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