const fs = require("fs");
const path = require("path");
console.log("\x1b[32m[LOG]\x1b[0m ======================================");
console.log("\x1b[32m[LOG]\x1b[0m Buscando por modulos para carregar...");
console.log("\x1b[32m[LOG]\x1b[0m ======================================");

async function search() {
    const primary = "./modules/primary";
    const secundary = "./modules/secundary"

    function isJSFile(filename) {
        const ext = path.extname(filename);
        return ext === ".js";
    }

    fs.readdir(primary, (err, files) => {
        if(err) {
            console.error("Erro ao ler a pasta: ", err);
            return;
        }
        let modulesJS = files
            .filter(isJSFile)

        if(modulesJS.length === 0) {
            console.log("Não há módulos primários para carregar.");
            return;
        }
        for(let i = 0; i < modulesJS.length; i++) {
            let caminho = primary + "/" + modulesJS[i]
            require(caminho)
            console.log("\x1b[32m[LOG]\x1b[0m Modulo carregado: \x1b[33m" + modulesJS[i].slice(0, -3) + "\x1b[0m");
        }
        return;

    })
    
    fs.readdir(secundary, (err, files) => {
        if(err) {
            console.error("Erro ao ler a pasta: ", err);
            return;
        }
        let modulesJS = files
            .filter(isJSFile)
        if(modulesJS.length === 0) {
            console.log("Não há módulos secundarios para carregar.");
            return;
        }

        for(let i = 0; i < modulesJS.length; i++) {
            let caminho = secundary + "/" + modulesJS[i]
            require(caminho)
            console.log("\x1b[32m[LOG]\x1b[0m Modulo carregado: \x1b[33m" + modulesJS[i].slice(0, -3) + "\x1b[0m");
        }
        return;

    })
}

search();