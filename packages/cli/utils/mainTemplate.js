import ejs from 'ejs';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';
// const fs = require('fs');
// const path = require('path');

export default (config) => {
    const template = fs.readFileSync(path.resolve('./template/main.ejs').replace(/\\/g, '/'), 'utf-8');
    const code = ejs.render(template, {
        config: config,
    })
    return prettier.format(code, {
        parser: "babel"
    })
};