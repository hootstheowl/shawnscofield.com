const cron = require('node-cron');
const shell = require('shelljs');
const { which, echo, exec } = shell;

if (!which('git')) {
  echo('Sorry, this script requires git');
  process.exit(1);
}

cron.schedule('*/2 * * * *', () => {
  echo('pulling most recent changes...');
  exec('git pull origin master', (code, stdout) => {
    if (stdout.search('Already up-to-date') < 0) {
      echo('Changes detected, building dist...');
      exec('npm run build:production');
    }
  });
});
