import ejs from 'ejs';
import fs from 'fs';
import prettier from 'prettier';
// import { fileURLToPath } from 'url';
import path from 'path';
// const ejs = require('ejs');
// const fs = require('fs');
// const prettier = require("prettier");

export function createPackageTemplate(config) {

    const template = fs.readFileSync(path.resolve('../template/package.ejs').replace(/\\/g, '/'), 'utf-8');

    const code = ejs.render(template, {
        router: config.middleware.indexOf('koaRouter') !== -1,
        static: config.middleware.indexOf('koaStatic') !== -1,
        packageName: config.packageName
    })
    // return code;
    return prettier.format(code, {
        parser: "json"
    })
};
// module.exports = {
//   createPackageTemplate
// }