import ejs from 'ejs';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';
// const fs = require('fs');
// const path = require('path');

export default (config, packageName) => {

    const template = fs.readFileSync(path.resolve('./template/package.ejs').replace(/\\/g, '/'), 'utf-8');

    const code = ejs.render(template, {
        config: config,
        packageName: packageName
    })
    return prettier.format(code, {
        parser: "json"
    })
};