const gulp = require('gulp');

const fileSystemTasks = require('./project-apparatus/tasks/file.system.tasks.js');
const zippingTasks = require('./project-apparatus/tasks/zipping.tasks.js');
const deployTasks = require('./project-apparatus/tasks/deploy.tasks.js');

const pckg = require('./package.json');

gulp.task('useDevConfig', async () => {
    await fileSystemTasks.useDevConfig();
});

gulp.task('useProdConfig', async () => {
    await fileSystemTasks.useProdConfig();
});

gulp.task('deploy', async () => {
    await zippingTasks.zipDirectory('./build', `./release/togetherfront_${pckg.version}.zip`);

    await deployTasks.sendFileToDeployServer();

    return deployTasks.deploy();
});