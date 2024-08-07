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
    this.updateCampaignLinks= this.updateCampaignLinks.bind(this);
  }

updateCampaignLinks(text) {
  let app = this.props.app;
  let state = app.state;
  let componentList = state.componentList;
  let campaignId = toolService.getIdFromURL(true, 0);
    // Define the regular expression pattern to find links containing "/campaign/"
    var pattern = /<a\s+(?:[^>]*?\s+)?href="\/campaign\/([^"]*)"(?:[^>]*?\s+)?(?:target="_self")?/g;

    // Use String.prototype.replace() to find and replace links
    var updatedText = text.replace(pattern, function(match, p1) {
      
        // Extract the number from the URL
        var number;
        let id = p1.split("-")[1];
        let obj = componentList.getComponent("lore", id, "ogRef");
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
      if(obj?.getJson().ogRef!=="" &&obj?.getJson().ogRef!==undefined&&obj?.getJson().type==="lore"){
        val = this.updateCampaignLinks(val);
      }


      this.setState({ value: val });
    }

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
    if (this.props.connectLore) {
      const loreLink = `/campaign/` + id + '-' + newid;
      return `<a href="${loreLink}" >${loreName}</a>`;
    } else {
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
          replacementText = `<a href="${ensuredUrl}">${text}</a>`;
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


      <div 
      // title='Use [[ ]] around a Lore title to connect it'
       >

        <ReactQuill
          ref={this.quillRef}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline',
                // 'strike', 
                'blockquote'
              ], [{
                'color': ["#F4F5F8", "#F4F5F888", "#000000", //greyscale
                   "#99AFD188", "#c3e8e577", "#c3e8e5", "#99AFD1", //bluish
                  "#ecd23a","#ecd23a98", "#ecd23a66", //gold
                  "#819636", "#9EFFA0", "#9EFFA088", "#9EFFA055",//green
                  "#fd5259", "#fd525988", "#fd525955", "#E9481F", "#EE7355", "#996C60", "#F6C6BA", //red orange
                   "#D7ABF7",  "#8B6099", "#D7ABF788", "#D7ABF755",   //purple
                  "#AB1FE9", "#49BCCF", "#0081B1",  
                ]
              }, { 'background': [false, "black", "#00274DF2", "#C1A71BF2", "#5F0C0CF2", "#4B0082F2", "#002E07F2"] },],
              [, 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],                        // text direction
              // [{ 'header': [false, 1, 2, 3] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],


              // [],['link'], // Link insertion
              [], ['clean'],
              // remove formatting button
            
            ],
            
          }}

          style={this.props.wrapperStyle ?
            { ...this.props.wrapperStyle } : { minHeight: "100%", padding: "8px", minWidth: "99%", width: "100%", }
          } theme="snow" value={this.state.value}
          onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}