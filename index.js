const fs = require("fs");
const config = require('./config.json');
global.token = config.token;
require("./loader.js");
