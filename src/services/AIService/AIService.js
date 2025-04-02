class AIService {
    componentList;

    createUpsertObject(obj, textKeyArr) {
        let arr = textKeyArr.map((key, i) => {
            return obj.getJson()[key]
        })

        //clean desc
        let desc = arr[1]?.replace(/<\/?[^>]+(>|$)/g, "");
        let handout = arr[4]?.replace(/<\/?[^>]+(>|$)/g, "")

        //Use Handout if there is no Desc, otherwise do an empty replacement
        if (desc === "" || !desc) {
            desc = arr[4] ? handout : "No description"
        };

        let combined_text =
            `Name: ${arr[0]} |
         Description: ${desc} |`;

        if (handout && desc != handout) {
            combined_text =
                combined_text + ` Player Handout Description: ${handout} |`
        }

        //if its a sublore, add a link
        if (arr[3]) {
            combined_text =
                combined_text +
                ` 
            Lore Link: https://gms.arcanevaultassembly.com/campaign/${arr[2]}-${arr[3]}`;
        } else {
            combined_text =
                combined_text +
                ` 
            Lore Link: https://gms.arcanevaultassembly.com/campaign/${arr[2]}`;
        }

        ///Log unique lores with handouts
        if (handout) {
            console.log("Upserted: [ " + combined_text + " ]");
        }

        let upsertObj = {
            text: combined_text,
            metadata: {
                ...obj.getJson(),
                updateId: obj.getJson()._id
            }

        }
        return upsertObj
    }

    async upsertData(list, upsertParams, pineconeParams, chunkParams) {
        let body = {
            upsertData: {
                upsertList: list,
                type: upsertParams?.type || "prepData",
                splitType: upsertParams?.splitType || "openAISplit", ...upsertParams
            },
            pineconeParams: pineconeParams || { indexName: "avaindex" },
            chunkParams: chunkParams
        }


        return fetch('https://upsert-x5obmgu23q-uc.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }


    async chat(body) {

        let responseMessage = await fetch('https://chat-x5obmgu23q-uc.a.run.app', //'https://chat-x5obmgu23q-uc.a.run.app',
         {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log(responseMessage);
        return responseMessage

    }


}

export default new AIService();