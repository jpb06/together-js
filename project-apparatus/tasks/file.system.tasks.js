const fs = require('fs-extra');

const consoleUtil = require('./../util/console.util');

const main = {};

main.useDevConfig = async function () {

    consoleUtil.printHeader('Using dev config ...');

    await fs.copyFile('./src/logic/api/private/private.config.dev.js', './src/logic/api/private/current.config.js');
};

main.useProdConfig = async function () {

    consoleUtil.printHeader('Using prod config ...');

    await fs.copyFile('./src/logic/api/private/private.config.prod.js', './src/logic/api/private/current.config.js');
};

main.copyReadme = async function () {

    consoleUtil.printHeader('Copying readme ...');

    await fs.copy('./README.md', './dist/README.md');
};

module.exports = main;
