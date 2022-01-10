/* eslint-disable no-console, import/no-extraneous-dependencies */
/* eslint-disable */
import shell from 'shelljs';
import readPackageJson from 'read-package-json';
import { handleShellOutput } from './utils';
import { AppEnv } from '../src/main/env';

async function generateRelease(version) {
  console.log(`Generating Sentry release: ${version}.`);
  const cmd = `sentry-cli releases new "${version}"`;
  handleShellOutput(shell.exec(cmd));
}

async function uploadSources(version) {
  console.log(`Uploading source maps to Sentry.`);
  const cmd = `sentry-cli releases files "${version}" upload ./src`;
  handleShellOutput(shell.exec(cmd));
}

async function finalizeRelease(version) {
  console.log(`Finalizing Sentry release ${version}.`);
  const cmd = `sentry-cli releases finalize "${version}"`;
  handleShellOutput(shell.exec(cmd));
}

async function getPkgVersion() {
  return new Promise((resolve, reject) => {
    readPackageJson('./package.json', console.error, false, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data.version);
    });
  });
}

async function run() {
  const pkgVersion = await getPkgVersion();

  await generateRelease(pkgVersion);
  await uploadSources(pkgVersion);
  await finalizeRelease(pkgVersion);
}

run()
  .then(() => {
    console.log('Finished.');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
