import { Component } from 'react';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import randomTextService from '../../services/randomTextService';

export default class TagCreate extends Component {
  constructor(props) {
    super(props);
    this.removeTag = this.removeTag.bind(this);
    this.state = {
      currentSelection: "",
      currentTags: "",
      showTags: true
    }
  }

  removeTag(indexToRemove) {
    this.setState({ showTags: false })
    const newTagsArray = this.props.obj.getJson().tags.split(",").filter((_, index) => index !== indexToRemove);
    const newTagsString = newTagsArray.join(",");

    // Update the parent object's state
    this.props.obj.setCompState({ tags: newTagsString });
    this.setState({ showTags: true })
  }

  render() {
    let app = this.props.app;
    let state = app.state;
    let styles = state.styles;

    let tagsArray = this.props.obj.getJson().tags ? this.props.obj.getJson().tags.split(",") : [];
    let tag = randomTextService.pickTag();

    return (

      <div style={{ marginLeft: "5px", color: styles.colors.color8+88, marginBottom: "40px" }} >
        5 tags maximum
        {this.state.showTags &&
          <div style={{
            display: "flex", marginTop: "6px", color: styles.colors.color3 + "f4", fontSize: "1rem", height: "fit-content", flexDirection: "row", flexWrap: "wrap",
            justifyContent: "flex-start"
          }}>

            {tagsArray.map((tag, index) => (
              <div key={index} style={{
                display: 'flex', alignItems: 'center', marginBottom: '5px',
                background: styles.colors.color2 + "94",
                border: "1px solid " + styles.colors.color8, padding: "3px",
                paddingLeft: "11px", borderRadius: "8px", paddingRight: "8px", marginRight: "8px",
              }}>
                {tag}
                <div style={{ marginLeft: '10px', cursor: "pointer", color: "red" }} title='Remove' onClick={() => this.removeTag(index)}>
                  x
                </div>
              </div>
            ))}

          </div>}

        {this.props.obj.getJson().tags?.split(",").length < 5 && <div>
          <ParentFormComponent name="selector" id="tagSelector" obj={this.props.obj}
            minLength={3}
            maxLength={25}
            placeholder={"i.e. " + tag}
            labelStyle={{ marginBottom: "8px", marginTop: "6px" }}
            inputStyle={{
              width: "18.1rem", padding: "4px 9px", color: styles.colors.colorBlack, height: "1.7rem", rows: "1", marginTop: "6px",
              borderRadius: "4px", background: styles.colors.colorWhite + "9c", borderWidth: "0px", marginLeft: "30px",
            }}
            func={(obj, val,) => {

              val = val.target.value;
              this.setState({ currentSelection: val })
              obj[0].setCompState({ selector: val })
            }} />

          <div style={{ ...styles.buttons.buttonAdd, color: "white", marginTop: "11px", padding: "3px 11px", marginLeft: "30px" }} onClick={async () => {
            
            if (this.props.obj.getJson().tags?.split(",").length < 5 && this.state.currentSelection.trim() !== "") {
              let existingTags = this.props.obj.getJson().tags ? this.props.obj.getJson().tags.split(",") : [];
              if (!existingTags.includes(this.state.currentSelection.trim())) {
                existingTags.push(this.state.currentSelection.trim());
                const newTagsString = existingTags.join(",");
                let tags = newTagsString;
                await this.props.obj.setCompState({ tags: newTagsString, selector: "" });

                this.setState({ currentTags: tags, currentSelection: "" });
              }

            }
          }}>Add Tag</div></div>}
      </div>


    )
  }
}

