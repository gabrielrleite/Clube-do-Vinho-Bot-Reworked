const fs = require('fs');
const path = require('path');
const { client } = require("../modules/primary/client");

async function events_load() {
    for(let i = 0; i < 3; i++) {
        const events_files = ["interactionCreate", "messageCreate", "threadCreate"];
        require("../events/" + events_files[i] + ".js");
        console.log("\x1b[32m[LOG]\x1b[0m Evento carregado: \x1b[33m" + events_files[i] + "\x1b[0m")
    }
    return;
}

events_load();