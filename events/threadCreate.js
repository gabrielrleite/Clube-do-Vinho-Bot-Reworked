const fs = require('fs');
const path = require('path');
const { client, Events, EmbedBuilder } = require("../modules/primary/client");

async function threadLoad() {
    client.on(Events.ThreadCreate, async thread => {
        try {
            thread.join()
        } catch (e) {
            console.log(`\x1b[31m[ERRO]\x1b[0m ${e.message}`);
        }
    })
}

threadLoad();
