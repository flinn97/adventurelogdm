import auth from "./auth";
export default class DiscordService{
    componentList;
    nodes=[];
    
    constructor(componentList){
        this.sendPostToDiscord=this.sendPostToDiscord.bind(this);
        this.parseNode=this.parseNode.bind(this);
        this.validateEmbed=this.validateEmbed.bind(this);
        this.componentList=componentList;
        auth.dispatchObserver.subscribe(this.getCampaign.bind(this));
    

    }
    validateEmbed(embed) {
        const maxDescriptionLength = 2048;
        const maxTitleLength = 256;
    
        if (embed.description.length > maxDescriptionLength) {
            embed.description = embed.description.slice(0, maxDescriptionLength) + "...";
        }
        if (embed.title.length > maxTitleLength) {
            embed.title = embed.title.slice(0, maxTitleLength) + "...";
        }
        return embed;
    }
    async getCampaign(p){
        
        p = p.json? p: p?.add?.[0]
        if(p?.getJson().type==="post"){
            debugger
            let campId = p.getJson().campaignId;
            let campaign = await this.componentList.getComponent("campaign", campId);
            if(!campaign){
                await auth.firebaseGetter(campId, this.componentList, "campaignId");
                campaign = await this.componentList.getComponent("campaign", campId);
            }
            let discordLink = campaign.getJson().discordLink;
            let post = p.getJson().postType==="encounter"? await this.getEncounterInitMessage(p) : p.getJson().message||p.getJson().desc||{picURL:p.getJson().picURL}
            this.sendPostToDiscord(discordLink, post);
        }
        

    }
    async getEncounterInitMessage(p){
        let id = p.getJson().itemId;
        let encounter= this.componentList.getComponent("encounter", id, "_id");
        let html = await encounter.getParticipantInitHtml(this.componentList);
        return html
    }

    async sendPostToDiscord(link, post){
        debugger
        post = await this.htmlToDiscordEmbed(post);
        let json = await JSON.stringify(post);

        // Send the message to the Discord webhook
await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: json
  })
  .then(response => {
    if (response.ok) {
      console.log("Message sent successfully!");
    } else {
      console.error("Error sending message:", response.status, response.statusText);
    }
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });
  this.nodes=[]
    }

    async htmlToDiscordEmbed(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            let embed = { title: "", description: "", fields: [], image: null, color: 5814783 };
            
            doc.body.childNodes.forEach(node => {
                this.parseNode(node, embed);
            });
                 // Check if post has a picURL attribute and set it as the embed image
  if (html.picURL) {
    embed.image = { url: html.picURL };
  }
    
            embed.description = embed.description.trim();
            embed = await this.validateEmbed(embed);
            return { embeds: [embed] };
        } catch (error) {
            console.error("Error parsing HTML:", error);
            return { embeds: [{ title: "Error", description: "There was an error parsing the content." }] };
        }
    }

    parseNode(node, embed) {
        const handlers = {
            "h1": (node) => {
                embed.title = embed.title || node.textContent;
            },
            "h2": (node) => {
                embed.fields.push({ name: node.textContent, value: "\u200B" });
            },
            "p": (node) => {
                embed.description += node.textContent + "\n\n";
            },
            "b": (node) => {
                embed.description += `**${node.textContent}**`;
            },
            "strong": (node) => {
                embed.description += `**${node.textContent}**`;
            },
            "i": (node) => {
                embed.description += `*${node.textContent}*`;
            },
            "em": (node) => {
                embed.description += `*${node.textContent}*`;
            },
            "a": (node) => {
                const href = node.getAttribute("href");
                embed.description += `[${node.textContent}](${href})`;
            },
            "img": (node) => {
                if (!embed.image) {
                    embed.image = { url: node.getAttribute("src") };
                }
            },
            "ul": (node) => {
                node.childNodes.forEach(li => {
                    if (li.nodeName.toLowerCase() === "li") {
                        embed.description += `• ${li.textContent}\n`;
                    }
                });
                embed.description += "\n";
            },
            "ol": (node) => {
                let index = 1;
                node.childNodes.forEach(li => {
                    if (li.nodeName.toLowerCase() === "li") {
                        embed.description += `${index}. ${li.textContent}\n`;
                        index++;
                    }
                });
                embed.description += "\n";
            },
            "default": (node) => {
                if(node.textContent !== "[object Object]") {
                    embed.description += node.textContent;
                }
            }
        };
         // Skip #text nodes if they are children of certain parent nodes like <p> that already include the text
    if (node.nodeType === Node.TEXT_NODE && node.parentNode.nodeName.toLowerCase() === "p") {
        return; // Skip this #text node
    }
        if(!this.nodes.includes(node)){
            const handler = handlers[node.nodeName.toLowerCase()] || handlers["default"];
            handler(node);
            this.nodes.push(node);
        }
        
    
    
        // Recurse for each child node
        node.childNodes.forEach(childNode => this.parseNode(childNode, embed));
    
    

}
    
}