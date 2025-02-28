import AIService from "../services/AIService/AIService";
import BaseClass from "../componentListNPM/baseClass";


class AIAssistantBaseClass extends BaseClass {

    json = {
        ...this.json,
        model: "gpt-4o-mini",
        type: "chatAssistant",
        messages: [
            // { "role": "user", "content": "Hello, how are you?" },
            { "role": "assistant", "content": "I'm great game master! How can I assist you today?" },

        ],
        topK: 5,
        owner: "",
        name: "Ai Content Gen",
        index: "avaindex",
        AIType: "openAI",
        temperature: 0.9,
        firstTime: false,
        //could add top_p, stop, seed, stream, user, response_format, logprobs,presence_penalty, frequency_penalty, Gemini: top_K(for gemini), candidateCount, echo, safetrySettings, SystemInstruction


    }
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
            content: "Always reply in the following[ 1: All responses should be in markdown format that will impress markdown users. 2: set of 'Name, Description, and Link', creates one 'Lore' or item. However, don't link too often and make sure you are linking to the correct Lore before sending a url src. Do not attach links in markdown unless you are clarifying an exact Lore among many or if the user directly asks for links. 3: Do not introduce your response in a friendly way, just reply succinctly. 4: Do not end your response with a conclusion or conclusive remarks. No summaries, nothing of the sort. 5: No passive voice or 'could,would' reasonings. Remain direct and to the point.]",
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

                }
                return obj;
            })
        }
        else {
            let index = 0;
            messages = await preferences.map((p, i) => {
                index = i
                let obj = {
                    role: "user",
                    content: p.getJson().content,
                    position: i + 1,
                    type: "aiMessage",
                    assistantId: this.json._id,
                    visible: false,
                }
                return obj
            })
            messages.push({
                role: "assistant",
                content: "Thinking... give me a minute.",
                position: index + 2,
                type: "aiMessage",
                visible: true,
                assistantId: this.json._id,
            })
        }
        messages = [systemMessage, systemFormat, ...messages]


        await this.operationsFactory.jsonPrepareRun({ addaiMessage: messages });
        debugger
        while (componentList.getList("aiMessage", this.json._id, "assistantId").length === 0) {
            //wait just one sec
            await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100ms before checking again

        }
        await componentList.sortSelectedList("aiMessage", "position")


    }
    getMessages(componentList) {
        let m = componentList.getList("aiMessage", this.json._id, "assistantId");
        let messages = m.map((obj, i) => {
            return {
                role: obj.getJson().role,
                content: obj.getJson().content
            }
        })
        return messages
    }

    /**
     * chat with the assistant.
     * TODO: the AI Response will eventually cut out messages. It would be good to save the messages it cut out still in a different array.
     * @param {*} text 
     */
    async chat(text, componentList) {

        if (!this.json.firstTime) {
            await this.createInitialMessages(componentList);
        }
        this.json.firstTime = true;

        // Get Existing messages
        let messages = await this.getMessages(componentList);

        //Add user sent message to componentList immediately?
        let userMessage = { role: "user", content: text, assistantId: this.json._id, type: "aiMessage", position: messages.length };
        await this.operationsFactory.jsonPrepareRun({ addaiMessage: userMessage })

        messages.push(userMessage);

        // Original was : messages.push({ role: "user", content: text });
        let queryParams = {
            messages: messages,
            indexes: [this.json.index],
            topK: this.json.topK,
            model: this.json.model,
            AIType: this.json.AIType,
            metadata: {
                owner: this.json.owner
            },
            temperature: this.json.temperature,
            user: this.json.owner
        }
        let AIResponse = await AIService.chat(queryParams);
        let message = AIResponse.messages[AIResponse.messages.length - 1];

        //Store the AI response in component list
        let aiMessage = { role: "assistant", content: message.content, assistantId: this.json._id, type: "aiMessage", position: messages.length + 1 };
        await this.operationsFactory.prepare({ update: this })
        await this.operationsFactory.jsonPrepareRun({ addaiMessage: aiMessage });

        //originally code was this:
        // 
        // await this.operationsFactory.jsonPrepareRun({ addaiMessage: { role: "assistant", content: message.content, assistantId: this.json._id, type: "aiMessage", position: messages.length } });


    }
}
export default AIAssistantBaseClass