class CreateViewerService {
    html = "";
    componentList;
    opps;
    setComponentList(c) {
        this.componentList = c;
    }
    setOpps(o) {
        this.opps = o;
    }
    async createViewer(c) {
        await this.recurseLoresAndAddHtml(c);
        await this.createViewerObj(c);

    }


    async recurseLoresAndAddHtml(lore) {
        let title = lore.getJson().title || lore.getJson().name;
        let description = lore.getJson().description || lore.getJson().desc;
        let map = this.componentList.getComponent("map", lore.getJson()._id, "loreId");
        let mapImg = map?.getJson().picURL;
        if (lore.getJson().type === "campaign") {
            let topLore = this.componentList.getList("lore", lore.getJson()._id, "campaignId").filter(l => l.getJson().topLevel);
            map = this.componentList.getComponent("map", topLore[0].getJson()._id, "loreId");
            mapImg = map?.getJson().picURL;
        }


        let pics = [];

        if (lore.getJson().type !== "campaign") {
            pics = this.componentList.getList("image", lore.getJson()._id, "loreId");
            pics = pics.map(pic => pic.getJson().picURL);
        }
        else {
            pics = this.componentList.getList("image", lore.getJson()._id, "campaignId");
            pics = pics.map(pic => pic.getJson().picURL);
        }

        // Start building the HTML for the current lore
        this.html += `<div class="lore-section">`;
        if (title === lore.getJson().title) {
            this.html += `<div class="title-section"><h2>${title}</h2></div>`;
        } else {
            this.html += `<hr class="subheader-row"></hr>`;
            this.html += `<h2>${title}</h2>`;
        }
        this.html += `<p>${description}</p>`;

        // Add map image if available
        if (mapImg) {
            this.html += `<div class="map-section"><div class="map-title">Map:</div><img src="${mapImg}" alt="${title} map" class="map-image"/></div>`; // Add title with class "map-title"
            this.html += '<div class="enc-section"><div class="encounter-title">Encounters:</div><div class="encounter">Access the Encounter Manager in the Game Management Suite.</div><a class="link" href="https://gms.arcanevaultassembly.com" target="_blank">Go to Login</a></div>';

        }


        // Add pictures if available
        if (pics.length > 0) {
            this.html += `<div class="image-gallery">`;
            await pics.forEach(pic => {
                this.html += `<img src="${pic}" alt="${title} image" class="lore-image"/>`;
            });
            this.html += `</div>`;
        }

        // Fetch and process child lores
        let childList = this.componentList.getList("lore", lore.getJson()._id, "parentId");
        if (childList.length > 0) {
            this.html += `<div class="sub-lore-section">`;
            for (let childLore of childList) {
                // Check if the child lore name matches the main title
                if (childLore.getJson().name !== lore.getJson().title) {
                    await this.recurseLoresAndAddHtml(childLore); // Recursive call for child lores
                }
            }
            this.html += `</div>`;
        }

        this.html += `</div>`;
    }

    removeCampaignLinks() {
        // Regex to match anchor tags with href containing "/campaign"
        const campaignLinkRegex = /<a\b[^>]*href=["']?([^"'>]*\/campaign[^"'>]*)["']?[^>]*>(.*?)<\/a>/gi;
        // Remove the matched anchor tags
        this.html = this.html.replace(campaignLinkRegex, '$2'); // Retains the text within the link
    }

    async createViewerObj(c) {
        // Call the function to remove links before finalizing the HTML
        this.removeCampaignLinks();

        let v = this.componentList.getComponent("viewer", c.getJson()._id, "campaignId");
        if (v) {
            v.setCompState({ html: this.html });
            await this.opps.cleanPrepareRun({ update: v });
        }
        else {
            await this.opps.cleanJsonPrepareRun({ addviewer: { html: this.html, campaignId: c.getJson()._id } })
        }


    }

}
export default CreateViewerService;