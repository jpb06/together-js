const gulp = require('gulp');
const fs = require('fs-extra');

const zipUtil = require('./project-apparatus/util/zip.util.js');
const deployCommands = require('./project-apparatus/deploy.commands.js');

const pckg = require('./package.json');

gulp.task('useDevConfig', async () => {
    await fs.copyFile('./src/logic/api/private/private.config.dev.js', './src/logic/api/private/current.config.js');
});

gulp.task('useProdConfig', async () => {
    await fs.copyFile('./src/logic/api/private/private.config.prod.js', './src/logic/api/private/current.config.js');
});

gulp.task('deploy', async () => {
    await zipUtil.zipDirectory('./build', `./release/togetherfront_${pckg.version}.zip`);

    await deployCommands.sendFileToDeployServer();

    return deployCommands.deploy();
});