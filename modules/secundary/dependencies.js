
async function load() {
    for(let i = 0; i < 2; i++) {
        const handlers_files = ["events", "slscommands"];
        require("../../handlers/" + handlers_files[i] + ".js");
        console.log("\x1b[32m[LOG]\x1b[0m Handler carregado: \x1b[33m" + handlers_files[i] + "\x1b[0m")
    }
    return;
}

load()