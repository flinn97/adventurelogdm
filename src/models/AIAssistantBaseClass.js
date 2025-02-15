import AIService from "../services/AIService/AIService";
import BaseClass from "../componentListNPM/baseClass";


class AIAssistantBaseClass extends BaseClass {

    json = {
        ...this.json,
        model: "gpt-4o-mini",
        type: "chatAssistant",
        messages: [
            { "role": "user", "content": "Hello, how are you?" },
            { "role": "assistant", "content": "I'm great game master! How can I assist you today?" },

        ],
        topK: 5,
        owner: "",
        name: "Ai Content Gen",
        index: "avatest",
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
            assistantId: this.json._id,
        };
        let preferences = componentList.getList("preference");
        let messages=[];
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
            let index=0;
            messages = await preferences.map((p, i) => {
                index=i
                let obj = {
                    role: "user",
                    content: p.getJson().content,
                    position: i + 1,
                    type: "aiMessage",
                    assistantId: this.json._id,

                }
                return obj
            })
            messages.push({
                role: "user",
                content: "How can I assist you today?",
                position: index + 2,
                type: "aiMessage",
                assistantId: this.json._id,
            })
        }
        messages= [systemMessage, ...messages]


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
        let messages = await this.getMessages(componentList);

        messages.push({ role: "user", content: text });
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
        debugger
        await this.operationsFactory.prepare({ update: this })
        await this.operationsFactory.jsonPrepareRun({ addaiMessage: { role: "assistant", content: message.content, assistantId: this.json._id, type: "aiMessage", position: messages.length } });


    }
}
export default AIAssistantBaseClass