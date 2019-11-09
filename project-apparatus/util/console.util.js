const chalk = require('chalk');

const main = {};

main.printHeader = function (message) {
    console.log('+ ' + chalk.yellowBright.bold(message));
};

main.printSuccess = function (message) {
    console.log('+ ' + chalk.green.bold(message));
};

main.printError = function (message) {
    console.log('+ ' + chalk.red.bold(message));
};

module.exports = main;