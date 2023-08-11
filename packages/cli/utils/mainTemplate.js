import ejs from 'ejs';
import fs from 'fs';
import prettier from 'prettier';
import path from 'path';
// const ejs = require('ejs');
// const fs = require('fs');
// const prettier = require("prettier");

export function createMainTemplate() {
    const template = fs.readFileSync(path.resolve('../template/main.ejs').replace(/\\/g, '/'), 'utf-8');
    const code = ejs.render(template, {
        config: config,
    })
    return prettier.format(code, {
        parser: "babel"
    })
};
// module.exports = {
//   createMainTemplate
// }