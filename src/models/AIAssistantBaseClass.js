import AIService from "../services/AIService/AIService";
import BaseClass from "../componentListNPM/baseClass";

class AIAssistantBaseClass extends BaseClass {
  json = {
    ...this.json,
    model: "gpt-4o-mini",
    type: "chatAssistant",
    messages: [
      // { "role": "user", "content": "Hello, how are you?" },
      {
        role: "assistant",
        content: "I'm great game master! How can I assist you today?",
      },
    ],
    topK: 5,
    owner: "",
    name: "Ai Content Gen",
    index: "avaindex",
    AIType: "openAI",
    temperature: 0.9,
    firstTime: false,
    //could add top_p, stop, seed, stream, user, response_format, logprobs,presence_penalty, frequency_penalty, Gemini: top_K(for gemini), candidateCount, echo, safetrySettings, SystemInstruction
  };

  systemFormat = 
  "Reply in this format: " +
  "All responses use html format for markdown enthusiasts. Do not number markdown titles (e.g., ###). Use ### for item names/titles to trigger lore generation (e.g., for 10 poisons, each item would just be ### for each poison name on a new line, skipping its listed number). " +
  "ie: 'Markdown Heading3:Lore Name or Title' (for lore titles only) followed by a line break then description text NO MORE HEADINGS until the next item on the list. !important...The tool will detect the title from your response Markdown header3 and then parse all data until the next markdown header!!! "+
  "To recap: Never use markdown Heading2 . Never use markdown Heading1. If you want to list a new item, just start with Heading3 for the title. Only use Markdown Heading3 for a lore title. Then, do not use any further markdown headings unless there is a new lore item on your list. Because we are using regex to search out header3 and bodies from your response= /(###\s+[^\n]+)([\s\S]*?)(?=(###\s+[^\n]+)|$)/g ..."+
  " Provide links only when explicitly requested for links to provided existing lore. You are only allowed to use links provided to you, not generate new ones." +
  " Respond succinctly without friendly introductions. " +
  " Avoid conclusions, summaries, or conclusive remarks at the end. " +
  " Use direct, active voice. Avoid 'could', 'would', or passive phrasing.";

  async createInitialMessages(componentList) {
    
    let ruleset = componentList.getComponent("aiRuleset");
    let systemMessage = {
      role: "system",
      content: ruleset.getJson().rule,
      position: 0,
      type: "aiMessage",
      visible: false,
      assistantId: this.json._id,
    };
    let systemFormat = {
      role: "system",
      content: this.systemFormat,
      position: 0,
      type: "aiMessage",
      visible: false,
      assistantId: this.json._id,
    };
    let preferences = componentList.getList("preference");
    let messages = [];
    if (preferences.length === 0) {
      messages = await this.json.messages.map((m, i) => {
        let obj = {
          role: m.role,
          content: m.content,
          position: i + 1,
          type: "aiMessage",
          assistantId: this.json._id,
        };
        return obj;
      });
    } else {
      let index = 0;
      messages = await preferences.map((p, i) => {
        index = i;
        let obj = {
          role: "user",
          content: p.getJson().content,
          position: i + 1,
          type: "aiMessage",
          assistantId: this.json._id,
          visible: false,
        };
        return obj;
      });
      await messages.push({
        role: "assistant",
        content: "Thinking... give me a minute.",
        position: index + 2,
        type: "aiMessage",
        visible: true,
        assistantId: this.json._id,
      });
    }
    messages = [systemMessage, systemFormat, ...messages];

    await this.operationsFactory.jsonPrepareRun({ addaiMessage: messages });
    debugger;
    while (
      componentList.getList("aiMessage", this.json._id, "assistantId")
        .length === 0
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100ms before checking again
    }
    await componentList.sortSelectedList("aiMessage", "position");
  }
  getMessages(componentList) {
    let m = componentList.getList("aiMessage", this.json._id, "assistantId");
    let messages = m.map((obj, i) => {
      return {
        role: obj.getJson().role,
        content: obj.getJson().content,
      };
    });
    return messages;
  }

  /**
   * chat with the assistant.
   * TODO: the AI Response will eventually cut out messages. It would be good to save the messages it cut out still in a different array.
   * @param {*} text
   */
  async chat(text, componentList, metadataFiltering) {
    if (!this.json.firstTime) {
      await this.createInitialMessages(componentList);
    }
    this.json.firstTime = true;

    // Get Existing messages
    let messages = await this.getMessages(componentList);

    //Add user sent message to componentList immediately?
    let userMessage = {
      role: "user",
      content: text,
      assistantId: this.json._id,
      type: "aiMessage",
      position: messages.length,
    };
    await this.operationsFactory.jsonPrepareRun({ addaiMessage: userMessage });

    messages.push(userMessage);

    // Original was : messages.push({ role: "user", content: text });
    let queryParams = {
      messages: messages,
      indexes: [this.json.index],
      topK: this.json.topK,
      model: this.json.model,
      AIType: this.json.AIType,
      metadata: {
        ...metadataFiltering,
        owner: this.json.owner,
      },
      temperature: this.json.temperature,
      user: this.json.owner,
    };
    
    let AIResponse = await AIService.chat(queryParams);
    let message = AIResponse.messages[AIResponse.messages.length - 1];

    //Store the AI response in component list
    let aiMessage = {
      role: "assistant",
      content: message.content,
      assistantId: this.json._id,
      type: "aiMessage",
      position: messages.length + 1,
    };
    await this.operationsFactory.prepare({ update: this });

    if (!this.json.generatedTitle) {
      let cleanText = this.stripMarkdown(message.content); // Remove markdown
      this.json.generatedTitle = this.generateSummary(cleanText);
      this.json.name = this.json.generatedTitle; // Update the assistant's name
    }
    debugger
    await this.operationsFactory.jsonPrepareRun({ addaiMessage: aiMessage });

  }

  /**
   * TODO: move into its own service
   * Removes markdown formatting from text.
   */
  stripMarkdown(text) {
    return text
      .replace(/#+\s?/g, "") // Remove headings
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italics
      .replace(/__(.*?)__/g, "$1") // Remove underlines
      .replace(/_(.*?)_/g, "$1") // Remove underscores
      .replace(/~~(.*?)~~/g, "$1") // Remove strikethrough
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove markdown links but keep text
      .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
      .replace(/>\s?/g, "") // Remove blockquotes
      .replace(/`{1,3}([^`]+)`{1,3}/g, "$1") // Remove inline and block code
      .replace(/^-+\s?/gm, "") // Remove horizontal rules
      .replace(/[0-9]/g, "") // Remove numbers
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"“”‘’]/g, "") // Remove punctuation
      .replace(/\n{2,}/g, "\n") // Remove excessive newlines
      .replace(/\s+/g, " ") // Normalize multiple spaces to single space
      .trim(); // Remove leading/trailing whitespace
  }

  /**
   * Generates a short 2-8 word summary from the cleaned AI response.
   */
  generateSummary(content) {
    let words = content.split(/\s+/);
    return words.slice(0, Math.min(words.length, 8)).join(" ") + "..."; // Return first 2-8 words
  }
}
export default AIAssistantBaseClass;
