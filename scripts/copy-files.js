/* eslint-disable no-console */
import fse from 'fs-extra';
import path from 'path';

const files = ['README.md', 'CHANGELOG.md', 'LICENSE'];
const space = 2;

function resolveBuildPath(file) {
  return path.resolve(
    __dirname,
    '../build/',
    path.basename(file),
  );
}

function copyFile(file) {
  const buildPath = resolveBuildPath(file);
  return new Promise(resolve => {
    fse.copy(file, buildPath, err => {
      if (err) throw err;
      resolve();
    });
  }).then(() =>
    console.log(`Copied ${file} to ${buildPath}`),
  );
}

function createPackageFile() {
  return new Promise(resolve => {
    fse.readFile(
      path.resolve(__dirname, '../package.json'),
      'utf8',
      (err, data) => {
        if (err) {
          throw err;
        }

        resolve(data);
      },
    );
  })
    .then(data => JSON.parse(data))
    .then(packageData => {
      const {
        name,
        author,
        version,
        description,
        keywords,
        repository,
        license,
        main,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      } = packageData;

      const minimalPackage = {
        name,
        author,
        version,
        description,
        keywords,
        repository,
        license,
        main,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      };

      return new Promise(resolve => {
        const buildPath = path.resolve(
          __dirname,
          '../build/package.json',
        );
        const data = JSON.stringify(
          minimalPackage,
          null,
          space,
        );
        fse.writeFile(buildPath, data, err => {
          if (err) throw err;
          console.log(
            `Created package.json in ${buildPath}`,
          );
          resolve();
        });
      });
    });
}

Promise.all(files.map(file => copyFile(file))).then(() =>
  createPackageFile(),
);
