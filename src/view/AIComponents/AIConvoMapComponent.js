import { Component } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // To support Github Flavored Markdown
import toolService from "../../services/toolService";
import loreIndexService from "../../services/loreIndexService";
import idService from "../../componentListNPM/idService";

/**
 * @class AIConvo
 * @extends Component
 *
 * This React component represents a chat message in an AI conversation.
 * It conditionally displays message content based on visibility and formats it
 * based on the sender (user, assistant, or system).
 *
 *
 * @param {Object} props - The properties passed to AIConvo.
 * @param {Object} props.app - The main application state and dispatch system.
 * @param {Object} props.obj - The message object containing JSON data.
 * @param {string} [props.class] - An optional CSS class to apply to the container.
 * @param {Object} [props.style] - Additional inline styles for the message container.
 * @param {Object} [props.responseStyle] - Additional inline styles for the role text.
 */
export default class AIConvo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredSection: null,
      showDone: false,
    };
    this.createLore = this.createLore.bind(this);
  }

  async createLore(name, desc, id) {
    let state = this.props.app.state;
    let dispatch = state.dispatch;
    let componentList = state.componentList;

    this.setState({ showDone: true });

    if (state.user.getJson().role !== "GM") {
      dispatch({ popupSwitch: "goPremium" });
      return;
    }
    const newName = this.props.app.state.currentLore
      ? this.props.app.state.currentLore.getJson().name
      : this.props.app.state.currentCampaign.getJson().title;
    // if(loreListTotalLength > 8){
    // this.setState({searchTerm:newLoreName});}
    let idS = idService.createId();

    let cleanedName = name.replace(/^#{1,4}\s*/, "").trim();

    let campId = toolService.getIdFromURL(true, 0);

    let otherChildren = componentList.getList("lore", id, "parentId");

    await state.opps.cleanJsonPrepare({
      addlore: {
        parentId: { [id]: newName },
        _id: idS,
        index: 0,
        type: "lore",
        name: cleanedName,
        campaignId: campId,
        desc: desc,
        madeByAI: true,
      },
    });
    let l = state.opps.getUpdater("add")[0];
    await state.opps.run();
    await loreIndexService.insertAtBeginning(l, otherChildren);

    setTimeout(() => {
      this.setState({ showDone: false });
    }, 1300);
  }

  // Parses the markdown content and splits it into Heading3 sections
  parseMarkdown(content) {
    const regex = /(###\s+[^\n]+)([\s\S]*?)(?=(###\s+[^\n]+)|$)/g;
    const sections = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      sections.push({
        heading: match[1],
        body: match[2],
      });
    }

    return sections;
  }

  render() {
    const { obj, app, style, responseStyle } = this.props;

    if (!obj || typeof obj.getJson !== "function") {
      console.warn("AIConvo received undefined or invalid obj:", obj);
      return null; // Prevents rendering if obj is undefined
    }

    let state = app.state;
    let classStyle = "message-ai-hover";
    let styles = state.styles;

    let vis = obj?.getJson().visible;
    let html = vis !== false ? obj.getJson().content : "";

    let role = obj.getJson().role;
    let roleColor =
      role === "user" ? styles.colors.color : styles.colors.colorWhite;
    let alignment = role === "user" ? "left" : "right";

    const content = obj.getJson()?.content;
    const sections = this.parseMarkdown(content);

    return (
      <>
        {vis !== false && (
          <div
            className={classStyle}
            style={{
              color: roleColor,
              maxWidth: "60%",
              justifySelf: alignment,
              marginRight: role === "user" ? "" : "2vw",
              marginLeft: role !== "user" ? "" : ".1vw",
              marginTop: "2.2vh",
              borderRadius: "11px",
              background: role === "user" ? "" : styles.colors.color1 + "66",
              padding: "1.6vh 1.6vh",
              paddingTop: "1.45vh",
              ...this.props.style,
            }}
          >
            <div>
              {vis !== false && (
                <div
                  style={{
                    color:
                      role === "user"
                        ? styles.colors.color3
                        : styles.colors.color9,
                    fontSize: ".8vw",
                    justifySelf: role === "user" ? "left" : "right",
                    marginBottom: "8px",
                    userSelect: "none",
                    opacity: "61%",
                    ...this.props.responseStyle,
                  }}
                >
                  {role != "system" ? role.toUpperCase() : "ASSISTANT"}
                </div>
              )}

              {role === "user" ||
              content === "Thinking... give me a minute." ? (
                <div>{content}</div>
              ) : (
                <div>
                  {sections.map((section, index) => (
                    <div
                      key={index}
                      className="message-ai-hover"
                      style={{
                        marginTop: "2px",
                        padding: ".8vh",
                        borderRadius: "11px",
                        background:
                          this.state.hoveredSection === index &&
                          state.isSideBarVisible
                            ? "rgba(175, 215, 228, 0.1)"
                            : "transparent",
                        transition: "background 0.3s",
                        position: "relative",
                        minWidth: "100%",
                        ...style,
                      }}
                      onMouseEnter={() =>
                        this.setState({ hoveredSection: index })
                      }
                      onMouseLeave={() =>
                        this.setState({ hoveredSection: null })
                      }
                    >
                      <div
                        style={{
                          color: styles.colors.color3,
                          marginBottom: "2px",
                        }}
                      >
                        {/* Render the Heading3 and Content using Markdown */}
                        <ReactMarkdown
                          children={section.heading}
                          remarkPlugins={[remarkGfm]}
                        />
                      </div>

                      <ReactMarkdown
                        children={section.body}
                        remarkPlugins={[remarkGfm]}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignContent: "flex-end",
                          height: state.isSideBarVisible?"2.8vw":".2vw",
                          width: "fit-content",
                          padding: "12px",
                          paddingLeft: "",
                          width: "100%",
                        }}
                      >
                        {/* Conditional Button on Hover */}
                        {this.state.hoveredSection === index &&
                          state.isSideBarVisible && (
                            <div>
                              {state.currentLore && (
                                <button
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    position: "relative",
                                    marginRight: "12px",
                                  }}
                                  onClick={() => {
                                    this.createLore(
                                      section.heading,
                                      section.body,
                                      toolService.getIdFromURL(true, 1)
                                    );
                                  }}
                                >
                                  <div
                                    className="hover-btn"
                                    style={{
                                      ...styles.buttons.buttonAdd,
                                      background: styles.colors.color1,
                                      border:
                                        "1px double " + styles.colors.color4,
                                      fontSize: "1vw",
                                      padding: ".5rem",
                                      width: "100%",
                                      zIndex: 200,userSelect:"none",
                                      pointerEvents:this.state.showDone?"none":""
                                    }}
                                  >
                                    + New Connected
                                  </div>
                                </button>
                              )}

                              <button
                                style={{
                                  position: "relative",
                                  background: "transparent",
                                  border: "none",
                                }}
                                onClick={() => {
                                  this.createLore(
                                    section.heading,
                                    section.body,
                                    toolService.getIdFromURL(true, 0)
                                  );
                                }}
                              >
                                <div
                                  className="hover-btn"
                                  style={{
                                    ...styles.buttons.buttonAdd,
                                    background: styles.colors.color1,
                                    border:
                                      "1px double " + styles.colors.color4,
                                    fontSize: "1vw",
                                    padding: ".5rem",
                                    zIndex: 200,
                                    userSelect:"none",
                                    pointerEvents:this.state.showDone?"none":""
                                  }}
                                >
                                  + New to Campaign
                                </div>
                              </button>

                              {/* Done! overlay */}
                              
                                <div
                                  style={{
                                    opacity: this.state.showDone?"1":"0",
                                    width:"100%",
                                    position: "absolute",
                                    right: 0,
                                    bottom: 3,
                                    background: styles.colors.color9,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: styles.colors.colorWhite,
                                    fontSize: "1vw",
                                    borderRadius: "8px",
                                    userSelect:"none",
                                    pointerEvents:"all",
                                    cursor:"not-allowed",
                                    zIndex: this.state.showDone?201:0,
                                    height:this.state.showDone?"5vh":'1px',
                                    transition:"opacity 1.3s ease-out, height 1.5s ease"
                                  }}
                                >
                                  Added!
                                </div>
                        
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {role === "user" && (
              <hr
                style={{ marginTop: "", marginBottom: "-22px", opacity: "22%" }}
              ></hr>
            )}
          </div>
        )}
      </>
    );
  }
}
