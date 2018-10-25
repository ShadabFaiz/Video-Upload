import { exec, spawn } from 'child_process';
import * as del from 'del';
import { series, task } from 'gulp';

// Define a task. It serve no purpose.
task('message', () => {
  return console.log('This is gulp task messge1');
});

// Run all the Mocha test inside test folder.
const runTests = done => {
  console.log('Running Tests...');
  exec('npm run test', (err, output, stderr) => {
    if (!err) done();
    else done(output);
  });
};

// Run the build directory and all its content.
const removeBuild = done => {
  console.log('Remove build directory...');
  let result = del.sync('build');
  done();
};

// Build the project.
const buildApp = done => {
  console.log('Building the app...');
  const hook = spawn('tsc', [], { stdio: 'inherit' });
  hook.on('close', (code, signal) => {
    if (code !== 0) console.log('Failed to build.');
    done();
    hook.kill('SIGKILL');
  });
};

// Copy build files into another file.
// task('Copying build files', () => {
//   src('./build/**/*.*').pipe(dest('./test_Build'));
// });

// Gulp Task Lists.
task('test', runTests);
task('clean', removeBuild);
task('build', buildApp);
task(
  'default',
  series('test', 'clean', 'build', done => {
    console.log('Great..!! Your build contains 0 error');
    done();
  })
);
