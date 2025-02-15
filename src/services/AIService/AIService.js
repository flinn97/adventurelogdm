class AIService {
    componentList;

    createUpsertObject(obj, textKeyArr) {
        let arr = textKeyArr.map((key, i) => {
            return obj.getJson()[key]
        })

        let combined_text = `Name: ${arr[0]}. Description: ${arr[1]}.`
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
                upsertList:list, 
                type: upsertParams?.type || "prepData",
                splitType: upsertParams?.splitType || "openAISplit", ...upsertParams
            },
            pineconeParams: pineconeParams || { indexName: "avatest" },
            chunkParams: chunkParams
        }

        return fetch('http://localhost:3002/api/upsert', {
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


    async chat(body){
        
        let responseMessage = await fetch('http://localhost:3002/api/chat', {
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
            console.log(responseMessage);
            return responseMessage

    }


}

export default new AIService();