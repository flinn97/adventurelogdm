import { Component } from "react";
import ReactMarkdown from 'react-markdown';

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


  }


  render() {
    let app = this.props.app;
    let obj = this.props.obj;

    if (!obj || typeof obj.getJson !== "function") {
        console.warn("AIConvo received undefined or invalid obj:", obj);
        return null; // Prevents rendering if obj is undefined
    }
    
    let state = app.state;
    let classStyle = "message-ai-hover";
    let styles = state.styles;

    let vis = obj?.getJson().visible;
    let html = (vis !== false) ? obj.getJson().content : "";

    let role = obj.getJson().role;
    let roleColor = (role === "user") ? styles.colors.color : styles.colors.colorWhite;
    let alignment = (role === "user") ? "left" : "right";


    return (
      <div className={classStyle} style={{
        color: roleColor,
        maxWidth: "60%",
        justifySelf: alignment,
        marginRight: (role === "user") ? "" : "2vw",
        marginLeft: (role !== "user") ? "" : ".1vw",
        textAlign: "justify",
        marginTop: "2.2vh",
        borderRadius: "11px",
        background: (role === "user") ? "" : styles.colors.color1+"66",
        padding: vis !== false ? "2vh 5.7vh" : "",
        paddingTop:"1.45vh",
        ...this.props.style
      }}>
        <div>
          {vis !== false &&

            <div style={{
              color: (role === "user") ? styles.colors.color3 : styles.colors.color9,
              fontSize: ".8vw", justifySelf: (role === "user") ? "left" : "right",
              marginBottom: "8px", userSelect: "none",
              opacity: "61%",
              ...this.props.responseStyle
            }}>{role != "system" ? role.toUpperCase() : "ASSISTANT"}
            </div>}

          <ReactMarkdown>
            {html}
          </ReactMarkdown>
          
        </div>
        {role === "user" &&
          <hr style={{ marginTop: "", marginBottom: "-22px", opacity: "22%", }}></hr>}

      </div>
    )
  }
}
